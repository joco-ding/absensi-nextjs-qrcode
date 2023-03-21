import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { useSelector } from 'react-redux';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const allMenuItems = [
  { text: 'Profil', href: '/profil', perans: ['admin', 'pegawai'] },
  { text: 'Absen', href: '/absen', perans: ['pegawai'] },
  { text: 'Kode Datang', href: '/kode/datang', perans: ['admin'] },
  { text: 'Kode Pulang', href: '/kode/pulang', perans: ['admin'] },
  { text: 'Daftar Kehadiran', href: '/daftar-kehadiran', perans: ['admin'] },
  { text: 'Daftar Pegawai', href: '/daftar-pegawai', perans: ['admin'] },
  { text: 'Registrasi Pegawai', href: '/registrasi-pegawai', perans: ['admin'] },
  { text: 'Keluar', href: '/login?logout=true', perans: ['admin', 'pegawai'] },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const [peran, setPeran] = useState('pegawai')
  const data = useSelector((state: any) => state.data.data)
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));


  useEffect(() => {
    const cekProfil = async () => {
      if (typeof data === 'undefined' || typeof data.peran === 'undefined') {
        setPeran('pegawai')
        return
      }
      setPeran(data.peran)
    }
    cekProfil()
  }, [data])
  
  const menuItems = allMenuItems.filter((item) => item.perans.includes(peran));
  
  return (
    <Drawer
      variant={isDesktop ? 'permanent' : 'temporary'}
      open={isDesktop || open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        '& .MuiDrawer-paper': {
          background: theme.palette.info.main,
          color: theme.palette.info.contrastText,
          top: '64px', // Height of AppBar
          left: 0,
          width: '240px'
        },
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <Link href={item.href} key={`k-${index}`} passHref>
            <ListItemButton>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
