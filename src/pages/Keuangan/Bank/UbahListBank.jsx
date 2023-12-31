import React from "react";
import TextInput from "../../../components/TextInput";
import { updateBank } from "../../../api/Bank";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Header } from "../../../components";

export default function UbahListBank() {
  const [nama_bank, setNamaBank] = useState("");
  const [nomor_rekening, setNomorRekening] = useState("");
  const [nama_pemilik, setNamaPemilik] = useState("");
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [status, setStatus] = useState(undefined);
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-bank";

  const postData = (e) => {
    e.preventDefault();
    const id = location.state.id;

    if (
      nama_bank.trim().length === 0 ||
      nomor_rekening.trim().length === 0 ||
      nama_pemilik.trim().length === 0
    ) {
      AlertEmpty();
    } else {
      updateBank(setStatus, path, nama_bank, nomor_rekening, nama_pemilik, id);
    }
  };

  //   const closeModalEmpty = () => {
  //     setisOpenEmpty(false);
  //   };

  //   const closeModalStatus = () => {
  //     setisOpenStatus(false);
  //     setStatus("");
  //   };

  const navigateListBank = () => {
    // 👇️ navigate to /contacts
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin Keuangan"
          prev="List Bank"
          navePrev={path}
          at="Ubah List Bank"
          title="Ubah List Bank"
        />
      </div>
      <div style={{ padding: "44px 154px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah List Bank
        </p>
        <article>
          <form
            className="grid mt-3 xs:grid-cols-1 
                    md:grid-cols-2 lg:grid-cols-3 gap-7"
            style={{ zIndex: -1 }}
          >
            {/* COL 1 */}
            <section>
              <TextInput
                label="Nama Bank"
                type="text"
                placeholder={location.state.nama_bank}
                onChange={(e) => setNamaBank(e.target.value)}
                required={true}
              />
              <TextInput
                label="Nomor Rekening"
                type="number"
                placeholder={location.state.nomor_rekening}
                onChange={(e) => setNomorRekening(e.target.value)}
                required={true}
              />
              <TextInput
                label="Nama Pemilik"
                type="text"
                placeholder={location.state.nama_pemilik}
                onChange={(e) => setNamaPemilik(e.target.value)}
                required={true}
              />
            </section>
          </form>

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateListBank}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={status}
            navigate={navigateListBank}
          />

          <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
          /> */}
        </article>
      </div>
    </div>
  );
}
