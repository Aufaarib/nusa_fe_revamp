import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSpp, getUnpaidSpp } from "../../../api/Spp";
import { Header } from "../../../components";
import { DataTables, DataTablesListSpp } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";
import { getMurid } from "../../../api/Murid";
import moment from "moment/moment";
import { getTahunAjaran } from "../../../api/TahunAjaran";

export default function ListSpp() {
  const [data, setData] = useState([]);
  const [TAdata, setTAData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [selectedTA, setSelectedTA] = useState(
    `AC${moment(new Date()).format("YYYY")}`
  );
  const [filterPaid, setFilterPaid] = useState(true);
  const [filterUnPaid, setFilterUnPaid] = useState(false);
  const { isLoading, setIsLoading } = useStateContext();
  const navigate = useNavigate();

  let filteredItems = data;
  // if (data !== null) {
  //   if (filterPaid === true) {
  //     filteredItems = data.filter((data) =>
  //       data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   } else if (filterUnPaid === true) {
  //     filteredItems = unpaidData.filter((data) =>
  //       data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   } else {
  //     filteredItems = data.filter((data) =>
  //       data.student.firstName.toLowerCase().includes(filterText.toLowerCase())
  //     );
  //   }
  // }

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    localStorage.setItem(
      "TA-ID",
      TAdata.filter((items) => items.code === selectedTA)[0]?.id
    );
    localStorage.setItem(
      "TA-NAME",
      TAdata.filter((items) => items.code === selectedTA)[0]?.name
    );
    localStorage.setItem("TA-CODE", selectedTA);
  });

  useEffect(() => {
    setIsLoading(true);
    getMurid(setData, setSts, setIsLoading);
    getTahunAjaran(setTAData, setSts, setIsLoading);
    // getSpp(setData, setSts, setIsLoading);
    // getUnpaidSpp(setUnpaidData, setSts, setIsLoading);
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
      width: "200px",
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
      name: <div>Kelas</div>,
      cell: (data) => <div>{data.classroom[0].classes.name}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <button
          style={{ width: "auto", padding: "2px 10px" }}
          className="btn-biru"
          title="Edit"
          onClick={() =>
            navigateDetailSpp(
              data.id,
              data.firstName,
              data.code,
              data.academicYear?.code,
              data.academicYear?.id,
              data.academicYear?.name,
              data.classroom[0].classes.name
            )
          }
        >
          <i className="fa fa-eye" /> Detail
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "120px",
    },
  ];

  const navigateTambahSpp = () => {
    navigate("/admin/tambah-spp");
  };

  const navigateDetailSpp = (
    id,
    studentName,
    studentCode,
    academicYearCode,
    academicYearId,
    academicYearName,
    kelas
  ) => {
    navigate("/admin/report-spp", {
      state: {
        id: id,
        studentName: studentName,
        studentCode: studentCode,
        academicYearCode: academicYearCode,
        academicYearId: academicYearId,
        academicYearName: academicYearName,
        kelas: kelas,
      },
    });
  };

  const TAoptions = TAdata.map((c) => ({
    label: `${c.name}`,
    value: c.code,
  }));

  const onChangeTAOption = (e) => {
    getMurid(
      setData,
      setSts,
      setIsLoading,
      TAdata.filter((items) => items.code === e.target.value)[0]?.id
    );
    localStorage.setItem(
      "TA-ID",
      TAdata.filter((items) => items.code === e.target.value)[0]?.id
    );
    localStorage.setItem(
      "TA-NAME",
      TAdata.filter((items) => items.code === e.target.value)[0]?.name
    );
    localStorage.setItem("TA-CODE", e.target.value);
    setSelectedTA(e.target.value);
  };

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navPrev={path}
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
          selectedTA={selectedTA}
          TAoptions={TAoptions}
          onChangeTAOption={onChangeTAOption}
        />
      </div>
    </>
  );
}
