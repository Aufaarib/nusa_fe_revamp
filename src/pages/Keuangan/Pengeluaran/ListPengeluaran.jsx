import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";
import { getPengeluaran } from "../../../api/Spendings";

export default function ListPengeluaran() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    getPengeluaran(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Barang</div>,
      cell: (data) => <div>{data.name}</div>,
      width: "240px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Total Pengeluaran</div>,
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
    {
      name: <div>Bukti Pembayaran</div>,
      cell: (data) => (
        <button
          title="Tampil Bukti Pembayaran"
          onClick={() => {
            openPaymentProof(data.invoice);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file" />
        </button>
      ),
      width: "auto",
    },
    // {
    //   name: <div>Deskripsi</div>,
    //   cell: (data) => <div>{data.description}</div>,
    //   width: "210px",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() =>
              navigateUbahPengeluaran(
                data.id,
                data.amount,
                data.name,
                data.transactionDate,
                data.type,
                data.description
              )
            }
          >
            <i className="fa fa-edit" /> Edit
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "110px",
    },
  ];

  const navigateTambahPengeluaran = () => {
    navigate("/admin/tambah-pengeluaran");
  };

  const navigateUbahPengeluaran = (
    id,
    amount,
    name,
    transactionDate,
    type,
    description
  ) => {
    navigate("/admin/ubah-pengeluaran", {
      state: {
        id: id,
        amount: amount,
        name: name,
        transactionDate: transactionDate,
        type: type,
        description: description,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Pengeluaran"
        title="Data Pengeluaran"
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
