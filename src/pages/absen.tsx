import React, { useState } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import { QrCodeScanner, Stop } from '@mui/icons-material';
import QrScanner from 'qr-scanner';
import Layout from '@/components/Layout';
import { absenKehadiran } from '@/services/kehadiranApi';
import { ubahTanggal } from '@/services/utils';

let stopScan = false;

const AbsensiScanner: React.FC = () => {
  const [btnScan, setBtnScan] = useState(true);
  const [hasilAbsen, setAbsen] = useState('');

  const absen = async (kodeScan: string) => {
    try {
      const data = JSON.parse(kodeScan)
      const respon = await absenKehadiran(data.kode, data.jenis)
      if (typeof respon !== 'undefined' && typeof respon.data !== 'undefined' && typeof respon.data[data.jenis] !== 'undefined') {
        const tanggal = ubahTanggal(`${respon.data[data.jenis]}`)
        setAbsen(`Absen ${data.jenis} tercatat pada ${tanggal}`)
      }
      console.log(respon)
    } catch (error) {
      console.error(error)
    }
  }

  const scanNow = async (isScan: boolean) => {
    setBtnScan(isScan);
    if (isScan) stopScan = true;
    if (btnScan === false) return;
    stopScan = false;
    await new Promise((r) => setTimeout(r, 100));
    const videoElement = document.getElementById(
      'scanView',
    ) as HTMLVideoElement;
    const scanner = new QrScanner(
      videoElement,
      (result: { data: string }) => {
        absen(result.data);
        setBtnScan(true);
        stopScan = true;
      },
      {
        onDecodeError: (error: any) => {
          console.error(error);
        },
        maxScansPerSecond: 1,
        highlightScanRegion: true,
        highlightCodeOutline: true,
        returnDetailedScanResult: true,
      },
    );
    await scanner.start();
    while (stopScan === false) await new Promise((r) => setTimeout(r, 100));
    scanner.stop();
    scanner.destroy();
  }

  return (
    <Layout>
      <Box p="20px"
        display="flex"
        width="100%"
        justifyContent="center">
        {btnScan === false && (
          <video
            id="scanView"
            style={{
              width: '100%',
              maxWidth: '400px',
              height: '100%',
              maxHeight: '400px',
              borderStyle: 'dotted',
            }}
          ></video>
        )}
        {btnScan && (
          <Typography variant="h6">
            Hasil Absen:
            <br />
            {hasilAbsen}
          </Typography>
        )}
        <Fab
          color={btnScan ? 'primary' : 'secondary'}
          onClick={() => scanNow(!btnScan)}
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
        >
          {btnScan && <QrCodeScanner />}
          {btnScan === false && <Stop />}
        </Fab>
      </Box>
    </Layout>
  );
};

export default AbsensiScanner;
