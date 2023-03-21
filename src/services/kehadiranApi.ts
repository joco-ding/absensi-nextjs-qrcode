import { API_BASE_URL, getToken } from "./configService";

export const ambilKode = async () => {
  const response = await fetch(`${API_BASE_URL}/kehadiran/kode`, {
    headers: {
      'Authorization': getToken(),
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Pengambilan kode gagal: ${response.status} ${response.statusText}`);
  }
}


export const absenKehadiran = async (kode: string, jenis: string) => {
  const response = await fetch(`${API_BASE_URL}/kehadiran`, {
    method: 'POST',
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({kode, jenis})
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(`Pengambilan kode gagal: ${response.status} ${response.statusText}`);
  }
}

export const semuaKehadiran = async (halaman: number = 1) => {
  const response = await fetch(`${API_BASE_URL}/kehadiran?halaman=${halaman}`, {
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