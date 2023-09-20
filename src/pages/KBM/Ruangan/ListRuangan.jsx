import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoom } from "../../../api/Ruangan";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";

const ListRuangan = () => {
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

  useEffect(() => {
    getRoom(setData, setSts);
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
      name: <div>Nama Ruangan</div>,
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
    // {
    //   name: <div>Status</div>,
    //   selector: (data) => data.status,
    //   cell: (data) => (
    //     <div
    //       className={
    //         data.status === 1
    //           ? "capitalize text-hijau"
    //           : "capitalize text-merah"
    //       }
    //     >
    //       {data.status == 1 ? "Aktif" : "Tidak Aktif"}
    //     </div>
    //   ),
    //   width: "auto",
    // },
    {
      name: <div>Aksi</div>,
      cell: (data) => (
        <>
          <button
            style={{ width: "auto", padding: "2px 10px" }}
            className="btn-biru"
            onClick={() =>
              navigateUpdateClassRoom(data.code, data.name, data.description)
            }
          >
            <i className="fa fa-edit" /> Edit
          </button>
        </>
      ),
      ignoreRowClick: true,
      button: true,
      width: "220px",
    },
  ];

  const navigateUpdateClassRoom = (code, name, description) => {
    navigate("/admin/ubah-ruangan", {
      state: {
        code: code,
        name: name,
        description: description,
      },
    });
  };

  const navigateTambahRuangKelas = () => {
    navigate("/admin/tambah-ruangan");
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Daftar Ruangan"
        title="Daftar Ruangan"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahRuangKelas}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Ruangan Kelas"
        />
      </div>
    </>
  );
};
export default ListRuangan;
