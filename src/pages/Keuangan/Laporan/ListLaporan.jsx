import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLaporan } from "../../../api/Laporan";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";
import moment from "moment/moment";

export default function ListLaporan() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.type.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    getLaporan(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Tanggal</div>,
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
      width: "240px",
    },
    {
      name: <div>Tipe</div>,
      cell: (data) => <div>{data.type === "K" ? "Kredit" : "Debit"}</div>,
      width: "240px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Total</div>,
      cell: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.amount)}
        </div>
      ),
      width: "auto",
    },
  ];

  const navigateTambahPengeluaran = () => {
    navigate("/admin/tambah-Laporan Keuangan");
  };

  const navigateUbahSpp = (
    id,
    amount,
    month,
    description,
    invoice,
    periodeId,
    increment,
    code,
    studentName
  ) => {
    navigate("/admin/tambah-spp", {
      state: {
        id: id,
        amount: amount,
        month: month,
        description: description,
        invoice: invoice,
        periodeId: periodeId,
        increment: increment,
        code: code,
        studentName: studentName,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Laporan Keuangan"
        title="Data Laporan Keuangan"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahPengeluaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
