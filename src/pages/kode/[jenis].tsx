import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import QRCode from 'qrcode.react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ambilKode } from '@/services/kehadiranApi';
import { WS_BASE_URL } from '@/services/configService';

function QRCodePage() {
  const [dataKode, setKode] = useState('')
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const router = useRouter();
  const { jenis } = router.query;

  const data = useSelector((state: any) => state.data.data)

  const kodeAbsen = async () => {
    try {
      const respon = await ambilKode()
      if (typeof respon !== 'undefined' && typeof respon.data !== 'undefined' && typeof respon.data.kode === 'string') {
        setKode(JSON.stringify({ kode: respon.data.kode, jenis }))
      }
      console.log(respon.data.kode)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (typeof data.peran !== 'string') {
      console.log(JSON.stringify({ data }))
      router.push('/')
      return
    }
    if (data.peran !== 'admin') {
      console.log(JSON.stringify({ data }))
      router.push('/')
      return
    }
    kodeAbsen()

    const ws = new WebSocket(WS_BASE_URL);
    setSocket(ws);

    ws.addEventListener('message', (event) => {
      console.log('WebSocket message received:', event.data);
      kodeAbsen();
    });

    // Cleanup saat komponen dilepas
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [data])

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      padding={8}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">Absen {jenis === 'datang' ? 'Datang' : 'Pulang'}</Typography>
        {dataKode === '' ? <CircularProgress /> : <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <QRCode value={dataKode} />
        </div>}
        
        <Typography variant='h6' align='center'>{dataKode}</Typography>
      </Container>
    </Box>
  );
}

export default QRCodePage;
