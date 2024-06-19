import { AlertMessage } from "../components/ModalPopUp";

export function ErrorHandling(error) {
  const message = error.response;
  if (error.code === "ERR_NETWORK") {
    AlertMessage("Gagal", "Koneksi Bermasalah", "Coba Lagi", "error");
  } else if (message?.status === 401) {
    AlertMessage(
      "Gagal",
      "Sesi Berakhir, Silahkan Login Kembali",
      "Login",
      "error",
      true
    );
  } else {
    AlertMessage("Info", "Data Tidak Ditemukan", "Tutup", "info");
  }
}
