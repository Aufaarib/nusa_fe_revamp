import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMapel } from "../../../api/MataPelajaran";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";

export default function ListMataPelajaran() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/tambah-mata-pelajaran";

  let filteredItems = data;
  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getMapel(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Name</div>,
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
      name: <div>Tipe</div>,
      selector: (data) => data.type,
      cell: (data) => (
        <div>
          {(data.type === "academic" && "Akademik") ||
            (data.type === "non-academic" && "Non-Akademik") ||
            (data.type === "personality" && "Akhlaq")}
        </div>
      ),
      width: "auto",
    },
    // {
    //   name: <div>Deskripsi</div>,
    //   selector: (data) => data.description,
    //   cell: (data) => <div>{data.description}</div>,
    //   width: "auto",
    // },
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => <div>{data.status}</div>,
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <div>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            onClick={() =>
              navigateUbahMapel(
                data.code,
                data.name,
                data.type,
                data.description
              )
            }
          >
            <i className="fa fa-edit mt-1 mr-1"></i> Edit
          </button>
          {/* {data?.status === "Aktif" && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleActiveStatus(data.id, data.course_name)}
            >
              <i className="fa fa-play mt-1 mr-1"></i> {data.status}
            </button>
          )}
          {data?.status === "Tidak Aktif" && (
            <button
              className="btn-mrh ml-3 w-auto px-2"
              onClick={() => handleNonActiveStatus(data.id, data.course_name)}
            >
              <i className="fa fa-pause mt-1 mr-1"></i> {data.status}
            </button>
          )} */}
          {/* <button
            style={{ fontSize: "14px" }}
            onClick={() => openModalHapus(data.id, data.course_name)}
            className="btn-mrh ml-3"
          >
            <i className="fa fa-trash mt-1 mr-1"></i> Hapus
          </button> */}
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "200px",
    },
  ];

  const navigateTambahMataPelajaran = () => {
    navigate(path);
  };

  const navigateUbahMapel = (code, course_name, type, description) => {
    navigate("/admin/ubah-mata-pelajaran", {
      state: {
        code: code,
        course_name: course_name,
        type: type,
        description: description,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Mata Pelajaran"
        title="Daftar Mata Pelajaran"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahMataPelajaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
