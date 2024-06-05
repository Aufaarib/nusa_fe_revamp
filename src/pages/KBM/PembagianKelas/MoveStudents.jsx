import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getClassRoom,
  getKelompokMapelRoom,
  getStudentListRoom,
  moveStudentToClassRoom,
} from "../../../api/RuanganKelas";
import { Header } from "../../../components";
import { DataTablesPMB } from "../../../components/DataTables";
import moment from "moment/moment";
import { BsChevronBarLeft } from "react-icons/bs";
import { useStateContext } from "../../../contexts/ContextProvider";
import { AlertConfirmation } from "../../../components/ModalPopUp";
import { moveApplicantToStudent } from "../../../api/Registrasi";
import { DropdownSiswa } from "../../../components/Dropdown";

const MoveStudents = () => {
  const [dataClassRoom, setDataClassRoom] = useState([]);
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState("");
  const [selectedClassRoom, setselectedClassRoom] = useState(0);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, setIsLoading } = useStateContext();
  const path = "/admin/detail-ruang-kelas";

  let filteredStudents = data.students;
  let filteredSubjects = data;

  if (data !== null) {
    {
      fetched === "1"
        ? (filteredStudents = data.students?.filter((data) =>
            data.firstName?.toLowerCase().includes(filterText.toLowerCase())
          ))
        : (filteredSubjects = data?.filter((data) =>
            data.subject?.name.toLowerCase().includes(filterText.toLowerCase())
          ));
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getClassRoom(setDataClassRoom, setSts, setIsLoading);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setFetched("1");
    getStudentListRoom(setData, setSts, location.state.id, setIsLoading);
  }, []);

  const navigateDetailClassRoom = (id, namaRuangan) => {
    navigate(path, {
      state: {
        id: location.state.id,
        namaRuangan: location.state.namaRuangan,
      },
    });
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const isAllRowsSelected = selectedRows.length === filteredStudents?.length;

  const handleSelectAll = () => {
    if (selectedRows.length === filteredStudents.length) {
      setSelectedRows([]);
    } else {
      const allRowIds = filteredStudents.map((row) => row.code);
      setSelectedRows(allRowIds);
    }
  };

  const handleRowSelect = (code) => {
    if (selectedRows.includes(code)) {
      setSelectedRows(selectedRows.filter((id) => id !== code));
    } else {
      setSelectedRows([...selectedRows, code]);
    }
  };

  const handlePindah = () => {
    AlertConfirmation(
      handleSubmit,
      "Pindahkan Murid?",
      `Jumlah Total ${selectedRows.length} Murid Terpilih`,
      "Pindahkan Murid",
      "question"
    );
  };

  const handleSubmit = () => {
    moveStudentToClassRoom(
      navigateDetailClassRoom,
      selectedRows,
      selectedClassRoom
    );
  };

  const columnsStudents = [
    {
      name: (
        <input
          type="checkbox"
          checked={isAllRowsSelected}
          onChange={handleSelectAll}
        />
      ),
      selector: (data) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(data.code)}
          onChange={() => handleRowSelect(data.code)}
        />
      ),
      width: "60px",
    },
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Kode</div>,
      cell: (data) => <div>{data.code}</div>,
      width: "auto",
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
      cell: (data) => (
        <div>{data.gender === "male" ? "Laki-Laki" : "Perempuan"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Tempat Lahir</div>,
      cell: (data) => <div>{data.birthPlace}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Lahir</div>,
      cell: (data) => moment(data.birthDate).format("DD/MM/YYYY"),
      width: "auto",
    },
    {
      name: <div>Golongan Darah</div>,
      cell: (data) => data.bloodType,
      width: "auto",
    },
  ];

  const classRoomOptions = dataClassRoom
    .filter((items) => items.room.name !== location.state.namaRuangan)
    .map((c) => ({
      label: `${c.room.name} - ${c.classes.name}`,
      value: c.id,
    }));

  return (
    <>
      <Header
        home="Admin KBM"
        prev="Detail Ruangan Kelas"
        navPrev={path}
        at="Pindah Murid"
        title={`Pindah Murid ${location.state.namaRuangan}`}
      />

      <div style={{ marginTop: "50px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px",
            borderRadius: "6px",
          }}
        >
          <DropdownSiswa
            label="Kelas Tujuan"
            required={true}
            defaultValue={selectedClassRoom}
            options={classRoomOptions}
            onChange={(e) => setselectedClassRoom(e.value)}
          />
        </div>
        <DataTablesPMB
          columns={columnsStudents}
          data={filteredStudents}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          selectedRows={selectedRows}
          setSelected={handlePindah}
          selectedClassRoom={selectedClassRoom}
        />
      </div>
      <div className="flex justify-start w-full">
        <button
          onClick={navigateDetailClassRoom}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </button>
      </div>
    </>
  );
};
export default MoveStudents;
