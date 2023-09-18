import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTahunAjaran } from "../../../api/TahunAjaran";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import { useStateContext } from "../../../contexts/ContextProvider";

const TahunAjaran = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.code.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    setIsLoading(true);
    getTahunAjaran(setData, setSts, setIsLoading);
  }, []);

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
      name: <div>Tahun</div>,
      selector: (data) => data.year,
      cell: (data) => <div>{data.year}</div>,
      width: "auto",
    },
    {
      name: <div>Nama Tahun Ajaran</div>,
      selector: (data) => data.name,
      cell: (data) => <div>{data.name}</div>,
      width: "auto",
    },
    {
      name: <div>Kurikulum</div>,
      selector: (data) => data.curriculum.name,
      cell: (data) => <div>{data.curriculum.name}</div>,
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
            navigateUbahTahunAjaran(
              data.code,
              data.name,
              data.year,
              data.curriculumId,
              data.curriculum.name,
              data.status
            )
          }
        >
          <i className="fa fa-edit" /> Edit
        </button>
      ),
      ignoreRowClick: true,
      button: true,
      width: "220px",
    },
  ];

  const navigateTambahTahunAjaran = () => {
    navigate("/admin/tambah-tahun-ajaran");
  };

  const navigateUbahTahunAjaran = (
    code,
    name,
    year,
    curriculumId,
    curriculumName,
    status
  ) => {
    navigate("/admin/ubah-tahun-ajaran", {
      state: {
        code: code,
        name: name,
        year: year,
        curriculumId: curriculumId,
        curriculumName: curriculumName,
        status: status,
      },
    });
  };

  return (
    <>
      <Header
        home="Admin PMB"
        // prev="Bank"
        // navePrev={path}
        at="Tahun Ajaran"
        title="Tahun Ajaran"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahTahunAjaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt="Tambah Tahun Ajaran"
        />
      </div>
    </>
  );
};
export default TahunAjaran;
