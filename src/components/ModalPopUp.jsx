import Modal from "react-modal";
import Swal from "sweetalert2";
import TextInput, { TextInputModal } from "./TextInput";
import { DropdownDebitKredit, DropdownGroup } from "./Dropdown";
import { FilterDate } from "./DataTables";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useStateContext } from "../contexts/ContextProvider";
import { CgSpinner } from "react-icons/cg";

export const CustomStylesStatus = {
  content: {
    // width: "385px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    borderRadius: "8px",
    transform: "translate(-50%, -50%)",
    border: "none",
    cursor: "auto",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,.5)",
    cursor: "pointer",
  },
};

// FILTER TANGGAL
export const ModalFilter = ({
  isOpenFilter,
  closeModalFilter,
  onChangeStart,
  onChangeEnd,
  selectedEnd,
  selectedStart,
  onClickFilterDate,
  setDebitKredit,
  post,
  status,
}) => {
  return (
    <Modal
      isOpen={isOpenFilter}
      onRequestClose={closeModalFilter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">Filter</p>
      <FilterDate
        selectedStart={selectedStart}
        onChangeStart={onChangeStart}
        selectedEnd={selectedEnd}
        onChangeEnd={onChangeEnd}
      />
      <div className="btn-form">
        <button
          type="button"
          style={{ width: "auto" }}
          className="btn-hijau flex justify-center mb-5"
          onClick={onClickFilterDate}
        >
          Terapkan
        </button>
        <button
          type="button"
          className="w-20 btn-merah flex justify-center mb-5"
          onClick={closeModalFilter}
        >
          Batal
        </button>
      </div>
    </Modal>
  );
};

// MODAL TAMBAH COST CENTER
export const ModalCostCenter = ({
  isOpenCostCenter,
  closeModalCostCenter,
  setCode,
  setGroup,
  setSubGroup,
  setItem,
  defaultValueDK,
  setDebitKredit,
  post,
  defaultValueGroup,
}) => {
  return (
    <Modal
      isOpen={isOpenCostCenter}
      onRequestClose={closeModalCostCenter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <p className="text-white-700 text-3xl mb-16 mt-5 font-bold">
        Form Tambah Cost Center
      </p>
      <article>
        <TextInput
          label="Code"
          type="number"
          id="group"
          name="code"
          onChange={setCode}
          required={true}
        />
        <DropdownGroup
          label="Group"
          required={true}
          isClearable={true}
          defaultValue={defaultValueGroup}
          isSearchable={false}
          onChange={setGroup}
        />
        <TextInput
          label="Sub Group"
          type="text"
          id="group"
          onChange={setSubGroup}
          required={true}
        />
        <TextInput
          label="Item"
          type="text"
          id="group"
          onChange={setItem}
          required={true}
        />
        <DropdownDebitKredit
          label="Debit/Kredit"
          required={true}
          isClearable={true}
          defaultValue={defaultValueDK}
          isSearchable={false}
          onChange={setDebitKredit}
        />

        <div className="btn-form">
          <button
            type="button"
            className="w-20 btn-hijau flex justify-center mb-5"
            onClick={post}
          >
            Simpan
          </button>
          <button
            type="button"
            className="w-20 btn-merah flex justify-center mb-5"
            onClick={closeModalCostCenter}
          >
            Batal
          </button>
        </div>
      </article>
    </Modal>
  );
};

export const ModalTambahCalonMurid = ({
  isOpenCostCenter,
  closeModalCostCenter,
  post,
  onChange,
}) => {
  return (
    <Modal
      isOpen={isOpenCostCenter}
      onRequestClose={closeModalCostCenter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <div className="div-wrapper">
        <div className="text-wrapper-3">Form Penambahan Calon Siswa</div>
      </div>
      <div
        style={{
          padding: "28px 35px 50px 30px",
          width: "350px",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        <TextInputModal
          label="Nama Depan Calon Siswa"
          type="text"
          onChange={onChange}
          required={true}
          placeholder="Masukkan Nama Depan"
        />
      </div>
      <div className="buttonModalWrapper">
        <button type="button" className="btn-modal-merah" onClick={post}>
          Simpan
        </button>
        <button
          type="button"
          className="btn-modal-putih"
          onClick={closeModalCostCenter}
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

export const ModalDetail = ({
  isOpenCostCenter,
  closeModalCostCenter,
  card,
  data,
}) => {
  return (
    <Modal
      isOpen={isOpenCostCenter}
      onRequestClose={closeModalCostCenter}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <div className="div-wrapper">
        <div className="text-wrapper-3">Detail {card}</div>
      </div>
      <div
        style={{
          padding: "10px 30px 20px 30px",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          {card !== "Anak" ? (
            <>
              <section>
                <TextInputModal
                  label="Nama Lengkap"
                  type="text"
                  disable={true}
                  value={data.fullName}
                />
                <TextInputModal
                  label="Agama"
                  type="text"
                  disable={true}
                  value={data.religion}
                />
                <TextInputModal
                  label="Nomor Kartu Keluarga"
                  type="text"
                  disable={true}
                  value={data.familyIdentityNumber}
                />
                <TextInputModal
                  label="Nomor KTP"
                  type="text"
                  disable={true}
                  value={data.identityNumber}
                />
              </section>
              <section>
                <TextInputModal
                  label="Hubungan"
                  type="text"
                  disable={true}
                  value={data.isBiological == 1 ? "Kandung" : "Tiri"}
                />
                <TextInputModal
                  label="Tinggal Bersama"
                  type="text"
                  disable={true}
                  value={data.isBiological == 1 ? "Ya" : "Tidak"}
                />
                <TextInputModal
                  label="No Ponsel 1"
                  type="text"
                  disable={true}
                  value={data.phoneNumber_1}
                />
                <TextInputModal
                  label="No Ponsel 2"
                  type="text"
                  disable={true}
                  value={data.phoneNumber_2}
                />
              </section>
              <section>
                <TextInputModal
                  label="Provinsi"
                  type="text"
                  disable={true}
                  value={data.province}
                />
                <TextInputModal label="Kota" type="text" value={data.city} />
                <TextInputModal
                  label="Kecamatan"
                  type="text"
                  disable={true}
                  value={data.subDistrict}
                />
                <TextInputModal
                  label="Kelurahan"
                  type="text"
                  disable={true}
                  value={data.village}
                />
              </section>
              <section>
                <TextInputModal
                  label="Kode Pos"
                  type="text"
                  disable={true}
                  value={data.postalCode}
                />
                <TextInputModal
                  label="Tempat Lahir"
                  type="text"
                  disable={true}
                  value={data.birthPlace}
                />
                <TextInputModal
                  label="Tanggal Lahir"
                  type="text"
                  disable={true}
                  value={moment(data.birthDate).format("DD-MM-YYYY")}
                />
                <TextInputModal
                  label="Pendidikan Terakhir"
                  type="text"
                  disable={true}
                  value={data.lastEducation}
                />
              </section>
              <section>
                <TextInputModal
                  label="Perusahaan Tempat Bekerja"
                  type="text"
                  disable={true}
                  value={data.placeOfWork}
                />
                <TextInputModal
                  label="Posisi/Jabatan"
                  type="text"
                  disable={true}
                  value={data.occupation}
                />
                <TextInputModal
                  label="Penghasilan Tiap Bulan"
                  type="text"
                  disable={true}
                  value={data.incomeGrade}
                />
              </section>
            </>
          ) : (
            <>
              <section>
                <TextInputModal
                  label="Nama Depan"
                  type="text"
                  disable={true}
                  value={data.firstName}
                />
                <TextInputModal
                  label="Nama Tengah"
                  type="text"
                  disable={true}
                  value={data.middleName}
                />
                <TextInputModal
                  label="Nama Akhir"
                  type="text"
                  disable={true}
                  value={data.lastName}
                />
                <TextInputModal
                  label="Tanggal Lahir"
                  type="text"
                  disable={true}
                  value={moment(data.birthDate).format("DD-MM-YYYY")}
                />
              </section>
              <section>
                <TextInputModal
                  label="Jenis Kelamin"
                  type="text"
                  disable={true}
                  value={data.gender == "male" ? "Laki-Laki" : "Perempuan"}
                />
                <TextInputModal
                  label="Hubungan"
                  type="text"
                  disable={true}
                  value={data.childStatus == 1 ? "Kandung" : "Tiri"}
                />
                <TextInputModal
                  label="Golongan Darah"
                  type="text"
                  disable={true}
                  value={data.bloodType}
                />
                <TextInputModal
                  label="Penyakit Berat Yang Pernah Diderita"
                  type="text"
                  disable={true}
                  value={data.healthRecord}
                />
              </section>
              <section>
                <TextInputModal
                  label="Anak Ke"
                  type="text"
                  disable={true}
                  value={data.childNumber}
                />
                <TextInputModal label="Hobi" type="text" value={data.hobby} />
                <TextInputModal
                  label="Sifat Dominan"
                  type="text"
                  disable={true}
                  value={data.characteristic}
                />
                <TextInputModal
                  label="Berat Badan"
                  type="text"
                  disable={true}
                  value={data.weight}
                />
              </section>
              <section>
                <TextInputModal
                  label="Tinggi Badan"
                  type="text"
                  disable={true}
                  value={data.height}
                />
                <TextInputModal
                  label="Asal Sekolah"
                  type="text"
                  disable={true}
                  value={data.schoolOriginName}
                />
                <TextInputModal
                  label="Jarak Ke Rumah"
                  type="text"
                  disable={true}
                  value={data.distanceFromHome}
                />
                <TextInputModal
                  label="Transportasi Ke Sekolah"
                  type="text"
                  disable={true}
                  value={data.transportation}
                />
              </section>
              <section>
                <TextInputModal
                  label="Kelas Pada Saat Mendaftar"
                  type="text"
                  disable={true}
                  value={data.schoolOriginClass}
                />
                <TextInputModal
                  label="Nomor KK"
                  type="text"
                  disable={true}
                  value={data.familyIdentityNumber}
                />
                <TextInputModal
                  label="Nomor Akta Lahir"
                  type="text"
                  disable={true}
                  value={data.identityNumber}
                />
              </section>
            </>
          )}
        </div>
        <TextInputModal
          label={card !== "Anak" ? "Alamat" : "Tempat Lahir"}
          type="text"
          disable={true}
          value={card !== "Anak" ? data.address : data.birthPlace}
        />
      </div>
      <div className="buttonModalWrapper">
        <button
          type="button"
          className="btn-modal-merah"
          onClick={closeModalCostCenter}
        >
          Tutup
        </button>
      </div>
    </Modal>
  );
};

// SA STYLING
const styledSweetAlert = Swal.mixin({
  customClass: {
    confirmButton: "btn-merah capitalize",
    cancelButton: "btn-putih",
  },
  padding: "30px",
  buttonsStyling: false,
});

//Dynamic Text
export const AlertMessage = (title, text, buttonText, icon) => {
  styledSweetAlert.fire({
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: buttonText,
    icon: icon,
  });
};

export const AlertConfirmation = (
  onConfirm,
  title,
  text,
  confirmButtonText,
  icon
) => {
  styledSweetAlert
    .fire({
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: "Batal",
      icon: icon,
    })
    .then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
};

export const AlertStatusSuccess = (navigate, title, buttonText, icon, text) => {
  styledSweetAlert
    .fire({
      icon: icon,
      title: title,
      text: text,
      showConfirmButton: true,
      confirmButtonText: buttonText,
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigate();
      }
    });
};

export const AlertStatusFailed = (title, buttonText, icon, text) => {
  styledSweetAlert.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: true,
    confirmButtonText: buttonText,
  });
};

// SA STATUS TAMBAH
export const AlertStatusTambahSuccess = (path) => {
  styledSweetAlert
    .fire({
      title: "Tambah Data Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Kembali ke halaman list",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirect to another page
        window.location.href = path;
      }
    });
};

export const AlertStatusTambahFailed = () => {
  styledSweetAlert.fire({
    title: "Tambah Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

// SA STATUS HAPUS
export const AlertStatusHapusSuccess = () => {
  styledSweetAlert.fire({
    title: "Hapus Data Berhasil",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusHapusFailed = () => {
  styledSweetAlert.fire({
    title: "Hapus Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusUpdateDataSuccess = (path) => {
  styledSweetAlert
    .fire({
      title: "Ubah Data Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Redirect to another page
        window.location.href = path;
      }
    });
};

export const AlertStatusVerified = (navigateLogin) => {
  styledSweetAlert
    .fire({
      title: "Akun Berhasil Terverifikasi, Silahkan Kembali Login",
      showConfirmButton: true,
      confirmButtonText: "Login",
    })
    .then((result) => {
      if (result.isConfirmed) {
        navigateLogin();
      }
    });
};

export const AlertStatusReVerified = () => {
  styledSweetAlert.fire({
    title:
      "Kode Verifikasi Telah Kami Kirim Ulang. Silahkan Cek Email Anda Kembali",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusReVerifiedFailed = () => {
  styledSweetAlert.fire({
    title: "Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusVerifiedFailed = () => {
  styledSweetAlert.fire({
    title: "Kode Verifikasi Kosong atau Tidak Sesuai",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertPaymentProof = (url) => {
  const domain = process.env.REACT_APP_BASE_STATIC_FILE;
  if (domain.length == 0) {
    styledSweetAlert.fire({
      title: "Loading...",
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    });
  } else {
    styledSweetAlert.fire({
      title: "Bukti Pembayaran",
      imageUrl: domain + url, // Replace with the path to your image
      imageWidth: "100%", // Adjust the width of the image as needed
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    });
  }
};

export const AlertFiles = (url) => {
  const domain = process.env.REACT_APP_BASE_STATIC_FILE;
  if (domain.length == 0) {
    styledSweetAlert.fire({
      title: "Loading...",
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    });
  } else {
    styledSweetAlert.fire({
      width: "700px",
      imageUrl: domain + url, // Replace with the path to your image
      imageWidth: "100%", // Adjust the width of the image as needed
      showConfirmButton: true,
      confirmButtonText: "Tutup",
    });
  }
};

export const AlertStatusValidatePayment = (onValidate, id) => {
  styledSweetAlert
    .fire({
      icon: "question",
      title: "Konfirmasi",
      text: "Edit Status?",
      showConfirmButton: true,
      confirmButtonText: "Edit",
      showCancelButton: true,
      cancelButtonText: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onValidate(id);
      }
    });
};

export const AlertStatusUpdateSuccess = () => {
  styledSweetAlert.fire({
    title: "Ubah Data Berhasil",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertStatusUpdateFailed = () => {
  styledSweetAlert.fire({
    title: "Ubah Data Gagal",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertLoginFailed = () => {
  styledSweetAlert.fire({
    icon: "warning",
    title: "Email atau Password Tidak Sesuai",
    showConfirmButton: true,
    confirmButtonText: "Coba Lagi",
  });
};

export const AlertNetwork = () => {
  styledSweetAlert.fire({
    icon: "error",
    title: "Koneksi Bermasalah",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

export const AlertRegisterFailed = () => {
  styledSweetAlert.fire({
    icon: "warning",
    text: "Email atau No.Telp Sudah Terdaftar",
    showConfirmButton: true,
    confirmButtonText: "Coba Lagi",
  });
};

// SA EMPTY INPUT
export const AlertEmpty = () => {
  styledSweetAlert.fire({
    title: "Data Tidak Lengkap",
    showConfirmButton: true,
    confirmButtonText: "Tutup",
  });
};

// SA MODAL DELETE
export const AlertDelete = (desc, id, onDelete) => {
  styledSweetAlert
    .fire({
      title: "Hapus",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Hapus",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
};

export const AlertUploadInvoiceSuccess = () => {
  styledSweetAlert
    .fire({
      title: "Upload Bukti Pembayaran Berhasil",
      showConfirmButton: true,
      confirmButtonText: "Kembali Ke Halaman Tahapan PMB",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/pmb/tahapan-pmb";
      }
    });
};

export const AlertUploadInvoiceFailed = () => {
  styledSweetAlert.fire({
    title: "Upload Bukti Pembayaran Gagal, Mohon Coba Kembali",
    showConfirmButton: true,
    confirmButtonText: "Coba Lagi",
  });
};

export const AlertValidateRegistration = (code, onValidate) => {
  styledSweetAlert
    .fire({
      title: "Bukti Pembayaran",
      showConfirmButton: true,
      confirmButtonText: "Validasi",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onValidate(code);
      }
    });
};

export const AlertUbahStatus = (desc, code, status, onUpdateStatus) => {
  if (status == 1) {
    styledSweetAlert
      .fire({
        icon: "question",
        title: "Non-Aktifkan",
        text: desc + " ?",
        showConfirmButton: true,
        confirmButtonText: "Non-Aktifkan",
        showCancelButton: true,
        cancelButtonText: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onUpdateStatus(code);
        }
      });
  } else {
    styledSweetAlert
      .fire({
        icon: "question",
        title: "Aktifkan",
        text: desc + " ?",
        showConfirmButton: true,
        confirmButtonText: "Aktifkan",
        showCancelButton: "Batal",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onUpdateStatus(code);
        }
      });
  }
};

export const AlertUpdateStatusAktif = (desc, status, id, onUpdateStatus) => {
  styledSweetAlert
    .fire({
      title: "Non-Aktifkan",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Non-Aktifkan",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onUpdateStatus(id, status);
      }
    });
};

export const AlertUpdateStatusNonAktif = (desc, status, id, onUpdateStatus) => {
  styledSweetAlert
    .fire({
      title: "Aktifkan",
      text: desc + " ?",
      showConfirmButton: true,
      confirmButtonText: "Aktifkan",
      showCancelButton: "Batal",
    })
    .then((result) => {
      if (result.isConfirmed) {
        onUpdateStatus(id, status);
      }
    });
};

// MODAL STATUS TAMBAH
export const ModalStatusTambah = ({
  closeModalStatus,
  isOpenStatus,
  status,
  navigate,
}) => {
  return (
    <Modal
      isOpen={isOpenStatus}
      onRequestClose={closeModalStatus}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      {status?.type === "success" && (
        <div style={{ textAlign: "center" }}>
          <h2>Berhasil</h2>
          <button
            style={{ padding: "5px" }}
            className="btn-action-pink w-auto mt-5"
            onClick={navigate}
          >
            Kembali Ke Halaman List
          </button>
        </div>
      )}
      {status?.type === "error" && (
        <div>
          <h2>Gagal</h2>
          <button
            className="btn-action-pink w-20 mt-5"
            onClick={closeModalStatus}
          >
            Tutup
          </button>
        </div>
      )}
    </Modal>
  );
};

// MODAL STATUS LIST
export const ModalStatusList = ({ onRequestClose, isOpen, status }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      {status?.type === "success" && (
        <div style={{ textAlign: "center" }}>
          <h2>Berhasil</h2>
          <button
            style={{ padding: "5px" }}
            className="btn-action-pink w-auto mt-5"
            onClick={onRequestClose}
          >
            Tutup
          </button>
        </div>
      )}
      {status?.type === "error" && (
        <div>
          <h2>Gagal</h2>
          <button
            className="btn-action-pink w-20 mt-5"
            onClick={onRequestClose}
          >
            Tutup
          </button>
        </div>
      )}
    </Modal>
  );
};

// MODAL INPUT KOSONG
export const ModalEmpty = ({
  isOpenEmpty,
  closeModalEmpty,
  onRequestCloseEmpty,
}) => {
  return (
    <Modal
      isOpen={isOpenEmpty}
      onRequestClose={onRequestCloseEmpty}
      style={CustomStylesStatus}
      contentLabel="Modal Status"
      ariaHideApp={false}
    >
      <div>
        <h2>Data Tidak Lengkap</h2>
        <button className="btn-action-pink w-20 mt-5" onClick={closeModalEmpty}>
          Tutup
        </button>
      </div>
    </Modal>
  );
};
