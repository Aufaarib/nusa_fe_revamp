import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKurikulum, updateStatusKurikulum } from "../../../api/Kurikulum";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";
import { AlertUbahStatus } from "../../../components/ModalPopUp";

export default function ListKurikulum() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const path = "/admin/tambah-kurikulum";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKurikulum(setData, setSts);
  }, []);

  const handleStatus = (code, description, status) => {
    AlertUbahStatus(description, code, status, onUpdateStatus);
  };

  const onUpdateStatus = (code) => {
    updateStatusKurikulum(setSts, code, setData);
  };

  // const onDelete = (id) => {
  //   deleteKurikulum(setSts, id, setData);
  //   // closeModalHapus();
  //   // setisOpenStatus(true);
  // };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Code</div>,
      selector: (data) => data.code,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Status</div>,
      selector: (data) => data.status,
      cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
      width: "auto",
    },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            onClick={() =>
              navigateUbahKurikulum(
                data.id,
                data.code,
                data.name,
                data.description,
                data.semester_id
              )
            }
            className="btn-action-merah ml-3 w-auto px-2"
          >
            <i className="fa fa-edit mt-1 mr-1"></i> Ubah
          </button>
          {data?.status === 1 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-pause mt-1 mr-1"></i> Non-Aktifkan
            </button>
          )}
          {data?.status === 0 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() => handleStatus(data.code, data.name, data.status)}
            >
              <i className="fa fa-play mt-1 mr-1"></i> Aktifkan
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "250px",
    },
  ];

  const navigateTambahKurikulum = () => {
    navigate(path);
  };

  const navigateUbahKurikulum = (id, code, name, description, semester_id) => {
    navigate("/admin/ubah-kurikulum", {
      state: {
        id: id,
        code: code,
        name: name,
        description: description,
        semester_id: semester_id,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Kelompok Mapel"
        // navePrev={path}
        at="Daftar Kurikulum"
        title="Daftar Kurikulum"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKurikulum}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
