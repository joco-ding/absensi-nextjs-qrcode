import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, Container, Typography, ToggleButtonGroup, ToggleButton, Snackbar, InputLabel } from '@mui/material';
import { Alert } from '@mui/lab';
import Layout from '@/components/Layout';
import { registrasiPegawai } from '@/services/pegawaiApi';

function RegistrasiPegawai() {
  const [nama, setNama] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [peran, setPeran] = useState<string>('pegawai');
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const respon = await registrasiPegawai(nama, email, password, peran);
      console.log('Registrasi berhasil:', respon);

      setAlertType('success');
      setAlertMessage('Registrasi berhasil');
      setAlertOpen(true);

      setNama('');
      setEmail('');
      setPassword('');
      setPeran('pegawai');
    } catch (error) {
      console.error('Terjadi kesalahan:', error);

      setAlertType('error');
      setAlertMessage('Terjadi kesalahan saat registrasi');
      setAlertOpen(true);
    }
  };

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setter(event.target.value);
  };

  const handlePeranChange = (
    event: React.MouseEvent<HTMLElement>,
    peranBaru: string
  ) => {
    if (peranBaru !== null) {
      setPeran(peranBaru);
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <Layout>
      <Container maxWidth="xs">
        <Typography variant="h4" align="center">Registrasi Pegawai</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nama"
            value={nama}
            onChange={handleChange(setNama)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={handleChange(setEmail)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            value={password}
            onChange={handleChange(setPassword)}
            fullWidth
            margin="normal"
            required
          />

          <InputLabel htmlFor="peran" margin="dense">
            Peran
          </InputLabel>
          <ToggleButtonGroup
            value={peran}
            exclusive
            onChange={handlePeranChange}
            aria-labelledby="peran"
            fullWidth
            sx={{ mt: 2 }}
          >
            <ToggleButton value="pegawai">Pegawai</ToggleButton>
            <ToggleButton value="admin">Admin</ToggleButton>
          </ToggleButtonGroup>
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>
        <Snackbar
          open={alertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleAlertClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}

export default RegistrasiPegawai;