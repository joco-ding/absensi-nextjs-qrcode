
export const ubahTanggal = (tanggalAsal: string): string => {
  if (tanggalAsal === '') return ''

  const tanggal = new Date(tanggalAsal);

  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Jakarta", // Sesuaikan dengan zona waktu yang Anda inginkan
  });
  try {
    return formatter.format(tanggal);
  } catch (error) {
    console.error(error)
  }
  return ''
}
