import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmission } from "../../api/SetupPmb";
import { Header } from "../../components";
import { DataTablesPMB } from "../../components/DataTables";

const SetupPMB = () => {
  const [data, setData] = useState([]);
  const [isOpenStatus, setisOpenStatus] = useState(false);
  const [isOpenDelete, setisOpenDelete] = useState(false);
  const [sts, setSts] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [desc_nama, setDesc_nama] = useState("");
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/list-bank";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.code.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getAdmission(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kode</div>,
      selector: (data) => data.code,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
    },
    {
      name: <div>Tahun Ajaran</div>,
      selector: (data) => data.academicYear.name,
      cell: (data) => <div>{data.academicYear.name}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => (
        <div
          className={
            data.status === 1
              ? "capitalize text-hijau"
              : "capitalize text-merah"
          }
        >
          {data.status == 1 ? "Aktif" : "Tidak Aktif"}
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
          onClick={() => navigateAdmissionDetails(data.code, data.status)}
        >
          <i className="fa fa-eye" /> Detail
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "300px",
    },
  ];

  const navigateAdmissionDetails = (code, status) => {
    navigate("/admin/admission-detail", {
      state: {
        code: code,
        status: status,
      },
    });
  };

  const navigateTambahPendaftaran = () => {
    navigate("/admin/tambah-pendaftaran");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Setup PMB"
        title="Setup PMB"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahPendaftaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Pendaftaran"
        />
      </div>
    </>
  );
};
export default SetupPMB;
