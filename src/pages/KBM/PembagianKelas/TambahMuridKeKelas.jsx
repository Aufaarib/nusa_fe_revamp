import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postMapel } from "../../../api/MataPelajaran";
import { getMurid } from "../../../api/Murid";
import { Header } from "../../../components";
import { DropdownSiswa } from "../../../components/Dropdown";
import { AlertConfirmation, AlertEmpty } from "../../../components/ModalPopUp";
import {
  DataTablesMoveStudentToClassRoom,
  DataTablesWithoutButton,
} from "../../../components/DataTables";
import moment from "moment/moment";
import { BsChevronBarLeft } from "react-icons/bs";
import { moveStudentToClassRoom } from "../../../api/RuanganKelas";

export default function TambahMuridKeKelas() {
  const [academicYearData, setAcademicYearData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [academicYearId, setacAdemicYearId] = useState("");
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [statusVal, setStatus] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = "/admin/list-ruang-kelas";

  let filteredItems = studentData;

  if (studentData !== null) {
    filteredItems = studentData.filter((data) =>
      data.firstName.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const navigateDetailRuangKelas = () => {
    navigate(path, {
      state: {
        id: location.state.id,
        namaRuangan: location.state.namaRuangan,
      },
    });
  };

  const fetchStudent = () => {
    getMurid(setStudentData, setSts);
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const postData = (e) => {
    e.preventDefault();

    if (
      name.length === 0 ||
      description.length === 0 ||
      type.length === 0
      // statusVal.length === 0 ||
      // group_course_id.length === 0
    ) {
      AlertEmpty();
    } else {
      postMapel(setSts, path, name, description, type);
      // setisOpenStatus(true);
    }
  };

  const [selectedRows, setSelectedRows] = useState([]);
  //   const isAllRowsSelected = selectedRows.length === data.length;

  const handleSelectAll = () => {
    const allRowIds = filteredItems.map((row) => row.code);
    setSelectedRows(allRowIds);
    // handleSubmit();
  };

  const handleRowSelect = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handlePindahSemua = () => {
    AlertConfirmation(
      handleSelectAll,
      "Tambahkan Semua Murid?",
      "Tambahkan",
      "question"
    );
  };
  const handlePindahTerpilih = () => {
    AlertConfirmation(
      handleSubmit,
      "Tambahkan Murid Terpilih?",
      "Tambahkan",
      "question"
    );
  };

  const handleSubmit = () => {
    moveStudentToClassRoom(setSts, path, selectedRows, location.state.id);
  };

  const columns = [
    {
      selector: (data) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(data.code)}
          onChange={() => handleRowSelect(data.code)}
        />
      ),
      width: "50px",
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
      selector: (data) => data.gender,
      cell: (data) => (
        <div>{data.gender === "male" ? "Laki-Laki" : "Perempuan"}</div>
      ),
      width: "auto",
    },
    {
      name: <div>Tempat Lahir</div>,
      selector: (data) => data.birthPlace,
      cell: (data) => <div>{data.birthPlace}</div>,
      width: "auto",
    },
    {
      name: <div>Tanggal Lahir</div>,
      selector: (data) => data.birthDate,
      cell: (data) => moment(data.birthDate).format("DD/MM/YYYY"),
      width: "auto",
    },
    {
      name: <div>Golongan Darah</div>,
      selector: (data) => data.bloodType,
      cell: (data) => data.bloodType,
      width: "auto",
    },
  ];

  return (
    <>
      <Header
        home="Admin KBM"
        // prev="Bank"
        // navePrev={path}
        at="Tambah Murid Ke Ruangan Kelas"
        title={location.state.namaRuangan}
      />
      <div style={{ marginTop: "50px" }}>
        <DataTablesMoveStudentToClassRoom
          columns={columns}
          data={filteredItems}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          setSelected={() => handlePindahTerpilih()}
          setAllSelected={() => handlePindahSemua()}
          selectedRows={selectedRows}
        />
      </div>
      <div className="flex justify-start w-full">
        <button
          onClick={() => navigateDetailRuangKelas()}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </button>
      </div>
    </>
  );
}
