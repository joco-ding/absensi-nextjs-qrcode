// ProfilePage.tsx
import React, { useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface UserProfile {
  nama: string;
  email: string;
  role: string;
}

const ProfilePage: React.FC = () => {
  const data = useSelector((state: any) => state.data.data)
  const router = useRouter()
  const user: UserProfile = data;

  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.nama === 'undefined') {
        router.push('/')
      }
    }
    cekProfil()
  }, [data])

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            Profil
          </Typography>
          <Typography variant="body1">
            <strong>Nama:</strong> {user.nama}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
        </Paper>
      </Container>
    </Layout>
  );
};

export default ProfilePage;
