import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdmission } from "../../../api/SetupPmb";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import { getMurid } from "../../../api/Murid";
import { getClassRoom } from "../../../api/RuanganKelas";

const ListRuanganKelas = () => {
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
      data.room?.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getClassRoom(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Ruangan</div>,
      selector: (data) => data.room?.name,
      cell: (data) => <div>{data.room?.name}</div>,
      width: "auto",
    },
    {
      name: <div>Kapasitas</div>,
      selector: (data) => data.capacity,
      cell: (data) => <div>{data.capacity}</div>,
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
          className="btn-action-merah"
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

  const navigateTambahRuangKelas = () => {
    navigate("/admin/tambah-ruang-kelas");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Ruangan Kelas"
        title="Ruangan Kelas"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahRuangKelas}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Pendaftaran"
        />
      </div>
    </>
  );
};
export default ListRuanganKelas;
