import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpp, getUnpaidSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { DataTables, DataTablesListSpp } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";

export default function ListSpp() {
  const [data, setData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [filterPaid, setFilterPaid] = useState(true);
  const [filterUnPaid, setFilterUnPaid] = useState(false);
  const navigate = useNavigate();

  let filteredItems = data;
  if (data !== null) {
    if (filterPaid === true) {
      filteredItems = data.filter((data) =>
        data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filterUnPaid === true) {
      filteredItems = unpaidData.filter((data) =>
        data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
      );
    } else {
      filteredItems = data.filter((data) =>
        data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    getSpp(setData, setSts);
    getUnpaidSpp(setUnpaidData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama Murid</div>,
      cell: (data) => (
        <div>{`${data.student.firstName} ${data.student.middleName} ${data.student.lastName}`}</div>
      ),
      width: "190px",
    },
    {
      name: <div>Spp Bulan</div>,
      cell: (data) => (
        <div>
          {(data.month == 1 && "Januari") ||
            (data.month == 2 && "Februari") ||
            (data.month == 3 && "Maret") ||
            (data.month == 4 && "April") ||
            (data.month == 5 && "Mei") ||
            (data.month == 6 && "Juni") ||
            (data.month == 7 && "Juli") ||
            (data.month == 8 && "Agustus") ||
            (data.month == 9 && "September") ||
            (data.month == 10 && "Oktober") ||
            (data.month == 11 && "November") ||
            (data.month == 12 && "Desember")}
        </div>
      ),
      width: "90px",
    },
    {
      name: <div>Semester</div>,
      cell: (data) => <div>{`Semester ${data.academicPeriode.increment}`}</div>,
      width: "130px",
    },
    {
      name: <div>Jumlah</div>,
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
      width: "100px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() =>
              navigateUbahSpp(
                data.id,
                data.amount,
                data.month,
                data.description,
                data.invoice,
                data.academicPeriode.id,
                data.academicPeriode.increment,
                data.student.code,
                data.student.firstName
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

  const navigateTambahSpp = () => {
    navigate("/admin/tambah-spp");
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
    navigate("/admin/ubah-spp", {
      state: {
        id: id,
        amount: amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
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
        at="Spp"
        title="Data Pembayaran SPP"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesListSpp
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahSpp}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          filterPaid={filterPaid}
          setFilterPaid={setFilterPaid}
          filterUnPaid={filterUnPaid}
          setFilterUnPaid={setFilterUnPaid}
          button="Tambah Spp"
        />
      </div>
    </>
  );
}
