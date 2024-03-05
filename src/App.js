import { Route, Routes } from "react-router-dom";
import "../src/styles/App.css";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import RequireAuthAdmin from "./components/RequireAuthAdmin";
import KonfirmasiPembayaran from "./pages/AdminPMB/KonfirmasiPembayaran";
import SetupPMB from "./pages/AdminPMB/SetupPMB";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BerkasPendaftaran from "./pages/PMB/BerkasPendaftaran";
import FormMurid from "./pages/PMB/FormMurid";
import FormOrangTua from "./pages/PMB/FormOrangTua";
import FormPernyataanOrangTua from "./pages/PMB/FormPernyataanOrangTua";
import TahapanPMB from "./pages/PMB/TahapanPMB";

import UbahKelas from "./pages/KBM/Kelas/UbahKelas";
import UbahKelompokMapel from "./pages/KBM/KelompokMapel/UbahKelompokMapel";
import UbahKurikulum from "./pages/KBM/Kurikulum/UbahKurikulum";
import UbahMataPelajaran from "./pages/KBM/Mapel/UbahMataPelajaran";

import DashboardKeuangan from "./pages/Keuangan/DashboardKeuangan/DashboardKeuangan";

import DataRegistrasi from "./pages/AdminPMB/DataRegistrasi";
import ListKelas from "./pages/KBM/Kelas/ListKelas";
import ListKelompokMapel from "./pages/KBM/KelompokMapel/ListKelompokMapel";
import ListKurikulum from "./pages/KBM/Kurikulum/ListKurikulum";
import ListMataPelajaran from "./pages/KBM/Mapel/ListMataPelajaran";

import TambahKelas from "./pages/KBM/Kelas/TambahKelas";
import TambahKelompokMapel from "./pages/KBM/KelompokMapel/TambahKelompokMapel";
import TambahKurikulum from "./pages/KBM/Kurikulum/TambahKurikulum";
import TambahMataPelajaran from "./pages/KBM/Mapel/TambahMataPelajaran";

import FormDaftarOrangTuaIbu from "./components/FormDaftarOrangTuaIbu";
import FormDaftarOrangTuaWali from "./components/FormDaftarOrangTuaWali";
import FormUbahDataMurid from "./components/FormUbahDataMurid";
import FormUbahDataOrangTua from "./components/FormUbahDataOrangTua";
import ProfilepPage from "./components/ProfilePage";
import AdmissionDetails from "./pages/AdminPMB/AdmissionDetails";
import DetailDataRegistrasi from "./pages/AdminPMB/DetailDataRegistrasi";
import TahunAjaran from "./pages/KBM/TahunAjaran/TahunAjaran";
import TambahTahunAjaran from "./pages/KBM/TahunAjaran/TambahTahunAjaran";
import UbahTahunAjaran from "./pages/KBM/TahunAjaran/UbahTahunAjaran";
import TambahGelombang from "./pages/AdminPMB/TambahGelombang";
import TambahPendaftaran from "./pages/AdminPMB/TambahPendaftaran";
import UbahGelombang from "./pages/AdminPMB/UpdateGelombang";
import UpdateStatusStepPage from "./pages/AdminPMB/UpdateStatusStepPage";
import UploadHasilTes from "./pages/AdminPMB/UploadHasilTes";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import UserVerification from "./pages/Auth/UserVerification";
import ListGuru from "./pages/KBM/Guru/ListGuru";
import TambahGuru from "./pages/KBM/Guru/TambahGuru";
import UbahGuru from "./pages/KBM/Guru/UbahGuru";
import ListMurid from "./pages/KBM/Murid/ListMurid";
import UbahMurid from "./pages/KBM/Murid/UbahMurid";
import DetailRuanganKelas from "./pages/KBM/PembagianKelas/DetailRuanganKelas";
import ListRuanganKelas from "./pages/KBM/PembagianKelas/ListRuanganKelas";
import TambahMuridKeKelas from "./pages/KBM/PembagianKelas/TambahMuridKeKelas";
import TambahRuanganKelas from "./pages/KBM/PembagianKelas/TambahRuanganKelas";
import UbahRuanganKelas from "./pages/KBM/PembagianKelas/UbahRuanganKelas";
import ListRuangan from "./pages/KBM/Ruangan/ListRuangan";
import TambahRuangan from "./pages/KBM/Ruangan/TambahRuangan";
import UbahRuangan from "./pages/KBM/Ruangan/UbahRuangan";
import ListLaporan from "./pages/Keuangan/Laporan/ListLaporan";
import ListPengeluaran from "./pages/Keuangan/Pengeluaran/ListPengeluaran";
import TambahPengeluaran from "./pages/Keuangan/Pengeluaran/TambahPengeluaran";
import UbahPengeluaran from "./pages/Keuangan/Pengeluaran/UbahPengeluaran";
import ListSpp from "./pages/Keuangan/Spp/ListSpp";
import TambahSpp from "./pages/Keuangan/Spp/TambahSpp";
import UbahSpp from "./pages/Keuangan/Spp/UbahSpp";
import BerkasPembayaran from "./pages/PMB/BerkasPembayaran";
import BerkasPembayaranBiayaPendidikan from "./pages/PMB/BerkasPembayaranPendidikan";
import ListCalonSiswa from "./pages/PMB/ListCalonSiswa";
import ListResume from "./pages/SARAT/Resume/ListResume";
import ListSession from "./pages/SARAT/Sesi/ListSession";
import ListQuestion from "./pages/SARAT/Soal/ListQuestion";
import DetailQuestion from "./pages/SARAT/Soal/DetailQuestion";
import TambahResume from "./pages/SARAT/Resume/TambahResume";
import TambahSession from "./pages/SARAT/Sesi/TambahSession";
import UbahResume from "./pages/SARAT/Resume/UbahResume";
import TambahQuestion from "./pages/SARAT/Soal/TambahQuestion";
import ListInstitution from "./pages/SARAT/Institusi/ListIntitution";
import UbahQuestion from "./pages/SARAT/Soal/UbahQuestion";
import UbahDetailQuestion from "./pages/SARAT/Soal/UbahDetailQuestion";
import TambahAnswers from "./pages/SARAT/Soal/TambahAnswers";
import ListNews from "./pages/SARAT/News/ListNews";
import TambahNews from "./pages/SARAT/News/TambahNews";
import UbahNews from "./pages/SARAT/News/UbahNews";
import ListFotoFoto from "./pages/SARAT/News/ListFotoFoto";
import ListDonations from "./pages/SARAT/Infaq/ListDonations";
import TambahDonations from "./pages/SARAT/Infaq/TambahDonations";
import TambahAdmissionStatement from "./pages/AdminPMB/AdmissionStatement/TambahAdmissionStatement";
import ListAdmissionStatement from "./pages/AdminPMB/AdmissionStatement/ListAdmissionStatement";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* AUTH */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<UserVerification />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/reset-pwd" element={<ResetPassword />} />

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuthAdmin />}>
          <Route path="/admin/dashboard" element={<DashboardKeuangan />} />
          <Route path="/admin/pmb" element={<SetupPMB />} />
          <Route path="/admin/list-setup-pmb" element={<SetupPMB />} />
          <Route path="/admin/list-tahun-ajaran" element={<TahunAjaran />} />
          <Route path="/admin/list-guru" element={<ListGuru />} />
          <Route
            path="/admin/admission-detail"
            element={<AdmissionDetails />}
          />
          <Route
            path="/admin/list-data-registrasi"
            element={<DataRegistrasi />}
          />
          <Route
            path="/admin/list-detail-data-registrasi"
            element={<DetailDataRegistrasi />}
          />
          <Route
            path="/admin/konfirmasi-pembayaran"
            element={<KonfirmasiPembayaran />}
          />
          <Route path="/admin/list-soal" element={<ListQuestion />} />
          <Route path="/admin/detail-soal" element={<DetailQuestion />} />

          {/* lists */}
          <Route
            path="/admin/list-mata-pelajaran"
            element={<ListMataPelajaran />}
          />
          <Route path="/admin/list-kurikulum" element={<ListKurikulum />} />
          <Route path="/admin/list-kelas" element={<ListKelas />} />
          <Route
            path="/admin/list-kelompok-mapel"
            element={<ListKelompokMapel />}
          />
          <Route path="/admin/list-murid" element={<ListMurid />} />
          <Route
            path="/admin/list-ruang-kelas"
            element={<ListRuanganKelas />}
          />
          <Route
            path="/admin/detail-ruang-kelas"
            element={<DetailRuanganKelas />}
          />
          <Route path="/admin/list-ruangan" element={<ListRuangan />} />
          <Route path="/admin/list-spp" element={<ListSpp />} />
          <Route path="/admin/list-pengeluaran" element={<ListPengeluaran />} />
          <Route path="/admin/list-laporan" element={<ListLaporan />} />
          <Route path="/admin/list-resume" element={<ListResume />} />
          <Route path="/admin/list-report-resume" element={<ListResume />} />
          <Route path="/admin/list-sesi" element={<ListSession />} />
          <Route path="/admin/list-institusi" element={<ListInstitution />} />
          <Route path="/admin/list-berita" element={<ListNews />} />
          <Route path="/admin/list-foto-berita" element={<ListFotoFoto />} />
          <Route path="/admin/list-infaq" element={<ListDonations />} />
          <Route
            path="/admin/list-pertanyaan-pernyataan"
            element={<ListAdmissionStatement />}
          />

          {/* ubah */}
          <Route path="/admin/ubah-gelombang" element={<UbahGelombang />} />
          <Route
            path="/admin/ubah-mata-pelajaran"
            element={<UbahMataPelajaran />}
          />
          <Route path="/admin/ubah-kurikulum" element={<UbahKurikulum />} />
          <Route
            path="/admin/ubah-kelompok-mapel"
            element={<UbahKelompokMapel />}
          />
          <Route path="/admin/ubah-kelas" element={<UbahKelas />} />
          <Route path="/admin/ubah-guru" element={<UbahGuru />} />
          <Route
            path="/admin/ubah-tahun-ajaran"
            element={<UbahTahunAjaran />}
          />
          <Route
            path="/admin/ubah-status-step"
            element={<UpdateStatusStepPage />}
          />
          <Route path="/admin/ubah-murid" element={<UbahMurid />} />
          <Route
            path="/admin/ubah-ruang-kelas"
            element={<UbahRuanganKelas />}
          />
          <Route path="/admin/ubah-ruangan" element={<UbahRuangan />} />
          <Route path="/admin/ubah-spp" element={<UbahSpp />} />
          <Route path="/admin/ubah-pengeluaran" element={<UbahPengeluaran />} />
          <Route path="/admin/upload-hasil-tes" element={<UploadHasilTes />} />
          <Route path="/admin/ubah-resume" element={<UbahResume />} />
          <Route path="/admin/ubah-soal" element={<UbahQuestion />} />
          <Route
            path="/admin/ubah-detail-soal"
            element={<UbahDetailQuestion />}
          />
          <Route path="/admin/ubah-berita" element={<UbahNews />} />

          {/* tambah */}
          <Route path="/admin/tambah-guru" element={<TambahGuru />} />
          <Route
            path="/admin/tambah-gelombang-pmb"
            element={<TambahGelombang />}
          />
          <Route
            path="/admin/tambah-pendaftaran"
            element={<TambahPendaftaran />}
          />
          <Route
            path="/admin/tambah-mata-pelajaran"
            element={<TambahMataPelajaran />}
          />
          <Route path="/admin/tambah-kurikulum" element={<TambahKurikulum />} />
          <Route
            path="/admin/tambah-tahun-ajaran"
            element={<TambahTahunAjaran />}
          />
          <Route path="/admin/tambah-kelas" element={<TambahKelas />} />
          <Route
            path="/admin/tambah-kelompok-mapel"
            element={<TambahKelompokMapel />}
          />
          <Route
            path="/admin/tambah-ruang-kelas"
            element={<TambahRuanganKelas />}
          />
          <Route path="/admin/tambah-ruangan" element={<TambahRuangan />} />
          <Route
            path="/admin/tambah-murid-ke-kelas"
            element={<TambahMuridKeKelas />}
          />
          <Route path="/admin/tambah-spp" element={<TambahSpp />} />
          <Route
            path="/admin/tambah-pengeluaran"
            element={<TambahPengeluaran />}
          />
          <Route path="/admin/tambah-Resume" element={<TambahResume />} />
          <Route path="/admin/tambah-sesi" element={<TambahSession />} />
          <Route path="/admin/tambah-soal" element={<TambahQuestion />} />
          <Route path="/admin/tambah-detail-soal" element={<TambahAnswers />} />
          <Route path="/admin/tambah-berita" element={<TambahNews />} />
          <Route path="/admin/tambah-infaq" element={<TambahDonations />} />
          <Route
            path="/admin/tambah-pertanyaan-pernyataan"
            element={<TambahAdmissionStatement />}
          />
        </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<RequireAuth />}>
          <Route path="/pmb?verified=1" element={<TahapanPMB />} />
          <Route path="/pmb/tahapan-pmb?verified=1" element={<TahapanPMB />} />
          <Route path="/pmb" element={<TahapanPMB />} />
          <Route path="/pmb/list-calon-siswa" element={<ListCalonSiswa />} />
          <Route path="/pmb/tahapan-pmb" element={<TahapanPMB />} />
          <Route path="/profile" element={<ProfilepPage />} />
          <Route path="/pmb/form-data-murid" element={<FormMurid />} />
          <Route
            path="/pmb/form-ubah-data-murid"
            element={<FormUbahDataMurid />}
          />
          <Route
            path="/pmb/form-ubah-data-orang-tua"
            element={<FormUbahDataOrangTua />}
          />
          <Route
            path="/pmb/form-data-orang-tua-ayah"
            element={<FormOrangTua />}
          />
          <Route
            path="/pmb/form-data-orang-tua-ibu"
            element={<FormDaftarOrangTuaIbu />}
          />
          <Route
            path="/pmb/form-data-orang-tua-wali"
            element={<FormDaftarOrangTuaWali />}
          />
          <Route
            path="/pmb/form-pernyataan"
            element={<FormPernyataanOrangTua />}
          />
          <Route
            path="/pmb/berkas-pendaftaran"
            element={<BerkasPendaftaran />}
          />
          <Route path="/pmb/berkas-pembayaran" element={<BerkasPembayaran />} />
          <Route
            path="/pmb/berkas-pembayaran-biaya-pendidikan"
            element={<BerkasPembayaranBiayaPendidikan />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
