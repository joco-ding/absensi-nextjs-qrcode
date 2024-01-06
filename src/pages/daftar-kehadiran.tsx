import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Pagination } from '@mui/lab';
import Layout from '@/components/Layout';
import { semuaKehadiran } from '@/services/kehadiranApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ubahTanggal } from '@/services/utils';
import { WS_BASE_URL } from '@/services/configService';

interface Pegawai {
  _id: string;
  nama: string;
}
interface Kehadiran {
  _id: string;
  pegawai: Pegawai;
  datang: string;
  pulang: string;
}

const DaftarKehadiran: React.FC = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataKehadiran, setDataKehadiran] = useState<Kehadiran[]>([]);
  const data = useSelector((state: any) => state.data.data)
  const router = useRouter()

  const ambilData = async () => {
    try {
      const respon = await semuaKehadiran(page);
      console.log(respon.kehadiran)
      setDataKehadiran(respon.kehadiran); // Update data kehadiran
      setTotalPages(respon.halamanInfo.totalHalaman); // Update jumlah halaman
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.nama === 'undefined') {
        router.push('/');
        return;
      }
      ambilData();
    };
    cekProfil();
  }, [data, page]);
  
  useEffect(() => {
    // Membuat instance WebSocket dan terhubung ke server
    const ws = new WebSocket(WS_BASE_URL);

    // Pasang event listener untuk pesan yang diterima
    ws.addEventListener('message', (event) => {
      console.log('WebSocket message received:', event);
      ambilData();
    });

    // Bersihkan event listener dan tutup koneksi ketika komponen dilepas
    return () => {
      ws.removeEventListener('message', ambilData);
      ws.close();
    };
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Daftar Kehadiran
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Datang</TableCell>
                <TableCell>Pulang</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(dataKehadiran) && dataKehadiran.length > 0 ? (
                 dataKehadiran.map((kehadiran) => (
                  <TableRow key={kehadiran._id}>
                    <TableCell>{kehadiran.pegawai.nama}</TableCell>
                    <TableCell>{ubahTanggal(kehadiran.datang)}</TableCell>
                    <TableCell>{ubahTanggal(kehadiran.pulang)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">Tidak ada data kehadiran</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3 }}
        />
      </Container>
    </Layout>
  );
};

export default DaftarKehadiran;
