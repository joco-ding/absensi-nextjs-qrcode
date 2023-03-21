import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Box, Alert, Snackbar, CircularProgress } from '@mui/material';
import { loginApi, profil } from '@/services/pegawaiApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '@/services/store';
import { useRouter } from 'next/router';
import { getToken, setToken } from '@/services/configService';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '' });
  const [loading, setLoading] = useState(false);
  const data = useSelector((state: any) => state.data.data)
  const dispatch = useDispatch()

  const router = useRouter();
  const { query } = router;

  const ambilProfil = async () => {
    try {
      if (getToken() === '') {
        const token = localStorage.getItem('token')
        if (token === null) return false
        setToken(token)
      }
      const respon = await profil();
      if (typeof respon.data === 'object') {
        dispatch(setData(respon.data))
        if (typeof respon.data.peran === 'string') {
          return true
        }
      }
      console.log('Ambil profil berhasil:', respon);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
    return false
  }

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      const respon = await ambilProfil();
      if (respon) {
        router.push('/profil');
      }
    };
    if (typeof query.logout !== 'undefined') {
      localStorage.clear()
      setToken('')
      dispatch(setData({}))
      router.push('/login')
    } else {
      fetchData();
    }
  }, [query])

  const handleSubmit = async (event: { preventDefault(): void }) => {
    event.preventDefault();

    try {
      const respon = await loginApi(email, password);
      console.log('Login berhasil:', respon);
      if (typeof respon.token === 'string') {
        setToken(respon.token)
        localStorage.setItem('token', respon.token)
        if (await ambilProfil()) {
          router.push('/profil')
        }
      }
    } catch (error) {
      setLoading(false)
      setAlert({ open: true, message: `${error}` });
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh">
      <Container maxWidth="xs">
        <Typography variant="h4" align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            color='secondary'
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {loading ? <CircularProgress /> : <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>}
        </form>
        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseAlert} severity='error' variant="filled">
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default LoginPage;
