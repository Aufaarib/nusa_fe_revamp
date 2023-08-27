import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKelas } from "../../../api/Kelas";
import { Header } from "../../../components";
import { DataTables } from "../../../components/DataTables";

export default function ListKelas() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getKelas(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kelas</div>,
      selector: (data) => data.grade,
      cell: (data) => <div>{data.grade}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Kelas</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Deskripsi</div>,
      selector: (data) => data.description,
      cell: (data) => <div>{data.description}</div>,
      width: "320px",
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
              navigateUbahKelas(
                data.id,
                data.grade,
                data.name,
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
      width: "200px",
    },
  ];

  const navigate = useNavigate();

  const navigateTambahKelas = () => {
    navigate("/admin/tambah-kelas");
  };

  const navigateUbahKelas = (id, grade, name, description) => {
    navigate("/admin/ubah-kelas", {
      state: {
        id: id,
        grade: grade,
        name: name,
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
        at="Daftar Kelas"
        title="Daftar Kelas"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTables
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahKelas}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
        />
      </div>
    </>
  );
}
