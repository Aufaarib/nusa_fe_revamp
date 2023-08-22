import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import { getGuru } from "../../../api/Guru";
import { AlertUbahStatus } from "../../../components/ModalPopUp";
import { updateStatusKurikulum } from "../../../api/Kurikulum";
import moment from "moment";

const HasilTes = () => {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const path = "/admin/list-bank";

  let filteredItems = data;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.fullname.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  useEffect(() => {
    getGuru(setData, setSts);
  }, []);

  const navigateUbahGuru = (
    code,
    fullname,
    gender,
    religion,
    birthPlace,
    birthDate
  ) => {
    navigate("/admin/ubah-guru", {
      state: {
        code: code,
        fullname: fullname,
        gender: gender,
        religion: religion,
        birthPlace: birthPlace,
        birthDate: birthDate,
      },
    });
  };

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Nama</div>,
      selector: (data) => data.fullname,
      cell: (data) => <div>{data.fullname}</div>,
      width: "auto",
    },
    {
      name: <div>Agama</div>,
      selector: (data) => data.religion,
      cell: (data) => <div>{data.religion}</div>,
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
        <>
          <button
            className="btn-action-merah"
            title="Edit"
            onClick={() =>
              navigateUbahGuru(
                data.code,
                data.fullname,
                data.gender,
                data.religion,
                data.birthPlace,
                data.birthDate
              )
            }
          >
            <i className="fa fa-edit" /> Ubah
          </button>
          {data?.status === 1 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() =>
                handleStatus(data.code, data.fullname, data.status)
              }
            >
              <i className="fa fa-pause mt-1 mr-1"></i> Non-Aktifkan
            </button>
          )}
          {data?.status === 0 && (
            <button
              className="btn-action-merah ml-3 w-auto px-2"
              onClick={() =>
                handleStatus(data.code, data.fullname, data.status)
              }
            >
              <i className="fa fa-play mt-1 mr-1"></i> Aktifkan
            </button>
          )}
        </>
      ),
      ignoreRowClick: true,
      button: true,
      width: "250px",
    },
  ];

  const navigateTambahGuru = () => {
    navigate("/admin/tambah-guru");
  };

  const handleStatus = (code, description, status) => {
    console.log("sdasd");
    AlertUbahStatus(description, code, status, onUpdateStatus);
    // setisOpenUpdateTidakAktif(true);
    // setStatus("Aktif");
    // setDesc(description);
    // setUpdateId(id);
  };

  const onUpdateStatus = (code) => {
    updateStatusKurikulum(setSts, code, setData);
    // closeModalUpdateAktif();
    // closeModalUpdateTidakAktif();
    // setisOpenStatus(true);
  };

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Guru"
        // navePrev={path}
        at="Daftar Guru"
        title="Daftar Guru"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesPMB
          columns={columns}
          data={filteredItems}
          onClick={navigateTambahGuru}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          buttontxt=" Tambah Guru"
        />
        {/* <ModalStatusList
          isOpen={isOpenStatus}
          onRequestClose={closeModalStatus}
          status={sts}
        /> */}

        {/* <Modal
          isOpen={isOpenDelete}
          onRequestClose={closeModalHapus}
          style={CustomStylesModalHapus}
          contentLabel="Modal Hapus"
          ariaHideApp={false}
        >
          <div style={{ textAlign: "center" }}>
            <h2 className="mb-2">Hapus Data Bank</h2>
            <h4 className="mb-3 text-merah">{desc_nama}?</h4>
            <button className="btn-action-hijau w-20" onClick={onDelete}>
              Hapus
            </button>
            <button
              className="btn-action-pink w-20 ml-2"
              onClick={closeModalHapus}
            >
              Batal
            </button>
          </div>
        </Modal> */}
      </div>
    </>
  );
};
export default HasilTes;
