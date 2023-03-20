import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Pagination } from '@mui/lab';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { semuaPegawai } from '@/services/pegawaiApi';

interface UserProfile {
  nama: string;
  email: string;
  role: string;
}

function DaftarPegawai() {
  const [dataPegawai, setDataPegawai] = useState<UserProfile[]>([])
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const data = useSelector((state: any) => state.data.data)
  const router = useRouter()
  const user: UserProfile = data;

  const ambilData = async () => {
    try {
      const respon = await semuaPegawai(page)
      setDataPegawai(respon.data)
      setTotalPages(respon.totalHalaman);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.nama === 'undefined') {
        router.push('/')
        return
      }
      ambilData()
    }
    cekProfil()
  }, [data, page]) 

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center">Daftar Pegawai</Typography>
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nama</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataPegawai.map((pegawai) => (
                <TableRow key={pegawai.email}>
                  <TableCell>{pegawai.email}</TableCell>
                  <TableCell>{pegawai.nama}</TableCell>
                  <TableCell>{pegawai.role}</TableCell>
                </TableRow>
              )
              )}
            </TableBody>
          </Table>
        </Paper>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ mt: 3 }}
        />
      </Container>
    </Layout>
  );
}

export default DaftarPegawai;
