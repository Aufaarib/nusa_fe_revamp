import moment from "moment/moment";
import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAdmissionDetails, updateStatusAdmission } from "../../api/SetupPmb";
import { Header } from "../../components";
import { DataTablesAdmissionDetail } from "../../components/DataTables";
import { AlertMessage, AlertUbahStatus } from "../../components/ModalPopUp";
import { useStateContext } from "../../contexts/ContextProvider";

const AdmissionDetails = () => {
  const [dataPhases, setDataPhases] = useState([]);
  const [dataAdmission, setData] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const path = "/admin/list-setup-pmb";
  const code = location.state.code;
  const status = location.state.status;
  const { isLoading, setIsLoading } = useStateContext();

  let filteredItems = dataPhases;
  if (dataPhases !== null) {
    filteredItems = dataPhases.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getAdmissionDetails(setDataPhases, setData, setSts, code, setIsLoading);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    // {
    //   name: <div>Gelombang Ke</div>,
    //   selector: (data) => data.increment,
    //   cell: (data) => <div>{data.increment}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Nama Gelombang</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Mulai</div>,
      selector: (data) => data.startDate,
      cell: (data) => moment(data.startDate).format("DD-MM-YYYY"),
      width: "auto",
    },
    {
      name: <div>Tanggal Selesai</div>,
      selector: (data) => data.endDate,
      cell: (data) => moment(data.endDate).format("DD-MM-YYYY"),
      width: "auto",
    },
    {
      name: <div>Jadwal Tes</div>,
      selector: (data) => data.endDate,
      cell: (data) => moment(data.testSchedule).format("DD-MM-YYYY"),
      width: "auto",
    },
    {
      name: <div>Nominal Biaya Pendaftaran</div>,
      selector: (data) => data.amount,
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
      name: <div>Nominal Biaya Pendidikan</div>,
      cell: () => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(dataAdmission[0]?.amount)}
        </div>
      ),
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
            navigateUbahGelombang(
              data.id,
              data.increment,
              data.name,
              data.startDate,
              data.endDate,
              data.amount,
              dataAdmission[0]?.amount,
              dataAdmission[0]?.id
            )
          }
        >
          <i className="fa fa-edit" /> Edit
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "200px",
    },
  ];

  const navigateTambahGelombang = () => {
    navigate("/admin/tambah-gelombang-pmb", {
      state: {
        code: code,
        status: status,
        theresActive: location.state.theresActive,
      },
    });
  };

  const navigateSetupPmb = () => {
    navigate("/admin/list-setup-pmb");
  };

  const navigateUbahGelombang = (
    id,
    increment,
    name,
    startDate,
    endDate,
    amount,
    eduAmount,
    eduId
  ) => {
    navigate("/admin/ubah-gelombang", {
      state: {
        id: id,
        code: code,
        increment: increment,
        name: name,
        startDate: moment(startDate).format("YYYY-MM-DD"),
        endDate: moment(endDate).format("YYYY-MM-DD"),
        amount: amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        eduAmount: eduAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
        eduId: eduId,
        theresActive: location.state.theresActive,
      },
    });
  };

  const handleStatus = () => {
    if (status === 1) {
      AlertUbahStatus(code, code, status, onUpdateStatus);
    } else if (status !== 1) {
      if (location.state.theresActive) {
        AlertMessage(
          "Tidak Dapat Mengaktifkan Pendaftaran Ini",
          "Sedang Ada Pendaftaran Yang Aktif",
          "Tutup",
          "warning"
        );
      } else {
        AlertUbahStatus(code, code, status, onUpdateStatus);
      }
    }
  };

  const onUpdateStatus = (code) => {
    updateStatusAdmission(setSts, code, navigateSetupPmb);
  };

  return (
    <>
      <Header
        home="Admin PMB"
        prev="Setup PMB"
        navPrev={path}
        at="Detail Pendaftaran"
        title={code}
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesAdmissionDetail
          columns={columns}
          data={filteredItems}
          onClickCreatePhase={() => navigateTambahGelombang()}
          onClickActivate={() => handleStatus()}
          buttonActivate={
            status === 1 ? (
              <>
                <i className="fa fa-times-circle-o mr-1 mt-1" />
                Non-Aktifkan
              </>
            ) : (
              <>
                <i className="fa fa-check-circle-o mr-1 mt-1" />
                Aktifkan
              </>
            )
          }
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={path}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>
    </>
  );
};
export default AdmissionDetails;
