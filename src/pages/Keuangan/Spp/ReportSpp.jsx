import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpp, getUnpaidSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { DataTables, DataTablesListSpp } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";
import { getMurid } from "../../../api/Murid";
import moment from "moment/moment";

export default function ReportSpp() {
  const [data, setData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [filterPaid, setFilterPaid] = useState(true);
  const [filterUnPaid, setFilterUnPaid] = useState(false);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  let filteredItems = data;
  //   if (data !== null) {
  //     if (filterPaid === true) {
  //       filteredItems = data.filter((data) =>
  //         data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //       );
  //     } else if (filterUnPaid === true) {
  //       filteredItems = unpaidData.filter((data) =>
  //         data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //       );
  //     } else {
  //       filteredItems = data.filter((data) =>
  //         data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //       );
  //     }
  //   }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    setIsLoading(true);
    getMurid(setData, setSts, setIsLoading);
    getUnpaidSpp(setUnpaidData, setSts, setIsLoading);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kode</div>,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Lengkap</div>,
      cell: (data) => (
        <div>{`${data.firstName} ${data.middleName} ${data.lastName}`}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Jenis Kelamin</div>,
      selector: (data) => data.gender,
      cell: (data) => (
        <div>{data.gender === "male" ? "Laki-Laki" : "Perempuan"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Tempat Lahir</div>,
      selector: (data) => data.birthPlace,
      cell: (data) => <div>{data.birthPlace}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Lahir</div>,
      selector: (data) => data.birthDate,
      cell: (data) => moment(data.birthDate).format("DD/MM/YYYY"),
      width: "auto",
    },
    {
      name: <div>Golongan Darah</div>,
      selector: (data) => data.bloodType,
      cell: (data) => data.bloodType,
      width: "90px",
    },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
    //   width: "90px",
    // },
    // {
    //   name: <div>Aksi</div>,
    //   cell: (data) => (
    //     <button
    //       style={{ width: "auto", padding: "2px 10px" }}
    //       className="btn-biru"
    //       title="Edit"
    //       onClick={() =>
    //         navigateUbahMurid(
    //           data.code,
    //           data.firstName,
    //           data.middleName,
    //           data.lastName,
    //           data.gender,
    //           data.religion,
    //           data.birthPlace,
    //           data.birthDate,
    //           data.bloodType,
    //           data.distanceFromHome
    //         )
    //       }
    //     >
    //       <i className="fa fa-edit" /> Edit
    //     </button>
    //   ),
    //   ignoreRowClick: true,
    //   button: true,
    //   width: "120px",
    // },
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
        // navPrev={path}
        at="Report Spp"
        title="Data Report SPP"
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
          showButton={false}
        />
      </div>
    </>
  );
}
