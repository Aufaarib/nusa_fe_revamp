import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBank } from "../../../api/Bank";
import { Header } from "../../../components";
import { AlertEmpty } from "../../../components/ModalPopUp";
import TextInput from "../../../components/TextInput";

export default function TambahListBank() {
  const [nama_bank, setNamaBank] = useState("");
  const [nomor_rekening, setNomorRekening] = useState("");
  const [nama_pemilik, setNamaPemilik] = useState("");
  const [status, setStatus] = useState(undefined);
  const created_by = localStorage.getItem("NAMA");
  const navigate = useNavigate();

  const path = "/admin/list-bank";

  const postData = (e) => {
    e.preventDefault();

    if (
      nama_bank.trim().length === 0 ||
      nomor_rekening.trim().length === 0 ||
      nama_pemilik.trim().length === 0
    ) {
      AlertEmpty();
    } else {
      postBank(
        setStatus,
        path,
        nama_bank,
        nomor_rekening,
        nama_pemilik,
        created_by
      );
    }
  };

  const navigateListBank = () => {
    navigate(path);
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Header
          home="Admin Keuangan"
          prev="Bank"
          navePrev={path}
          at="Tambah List Bank"
          title="Tambah List Bank"
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
          Form Tambah List Bank
        </p>
        <article>
          <TextInput
            label="Nama Bank"
            type="text"
            id="code"
            onChange={(e) => setNamaBank(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nomor Rekening"
            type="number"
            id="code"
            onChange={(e) => setNomorRekening(e.target.value)}
            required={true}
          />
          <TextInput
            label="Nama Pemilik"
            type="text"
            id="group"
            onChange={(e) => setNamaPemilik(e.target.value)}
            required={true}
          />

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
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
