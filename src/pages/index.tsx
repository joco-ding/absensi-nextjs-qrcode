// pages/index.js atau pages/index.tsx

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login');
  }, []);

  return null;
};

export default HomePage;
