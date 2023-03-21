import { API_BASE_URL, getToken } from "./configService";

export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/pegawai/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const data = await response.json()
    let pesanError = `Login gagal: ${response.status} ${response.statusText}`
    if (typeof data !== 'undefined' && typeof data.message === 'string') {
      pesanError = data.message
    }
    throw new Error(pesanError);
  }
}

export const profil = async () => {
  const response = await fetch(`${API_BASE_URL}/pegawai/profil`, {
    headers: {
      'Authorization': getToken(),
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Profil gagal: ${response.status} ${response.statusText}`);
  }
}

export const registrasiPegawai = async (nama: string, email: string, password: string, peran: string) => {
  const response = await fetch(`${API_BASE_URL}/pegawai`, {
    method: 'POST',
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nama, email, password, peran }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Lis Pegawai gagal: ${response.status} ${response.statusText}`);
  }
}

export const semuaPegawai = async (halaman: number = 1) => {
  const response = await fetch(`${API_BASE_URL}/pegawai?halaman=${halaman}`, {
    headers: {
      'Authorization': getToken(),
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Lis Pegawai gagal: ${response.status} ${response.statusText}`);
  }
}