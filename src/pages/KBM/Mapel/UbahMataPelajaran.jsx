import React from "react";
import TextInput from "../../../components/TextInput";
import { DropdownJenisTransaksi } from "../../../components/Dropdown";
import { getKelompokMapel } from "../../../api/KelompokMataPelajaran";
import { updateMapel } from "../../../api/MataPelajaran";
import {
  AlertEmpty,
  ModalEmpty,
  ModalStatusTambah,
} from "../../../components/ModalPopUp";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../../../components";

export default function UbahMataPelajaran() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  // const [isOpenStatus, setisOpenStatus] = useState(false);
  // const [isOpenEmpty, setisOpenEmpty] = useState(false);
  const [sts, setSts] = useState(undefined);
  const location = useLocation();

  const navigate = useNavigate();

  const path = "/admin/list-mata-pelajaran";

  // const [groupcourseData, setGroupCourseData] = useState([]);

  // fetch function
  // const fetchGroupCourse = async () => {
  //   getKelompokMapel(setGroupCourseData, setSts);
  // };

  // useEffect(() => {
  //   fetchGroupCourse();
  // }, []);

  const postData = (e) => {
    e.preventDefault();
    const code = location.state.code;

    if (name.length === 0 || description.length === 0 || type.length === 0) {
      AlertEmpty();
    } else {
      updateMapel(setSts, code, path, name, description, type);
      // setisOpenStatus(true);
    }
  };

  // const closeModalEmpty = () => {
  //   setisOpenEmpty(false);
  // };

  // const closeModalStatus = () => {
  //   setisOpenStatus(false);
  //   setSts("");
  // };

  const navigateMapel = () => {
    navigate(path);
  };

  // const groupCourseOptions = groupcourseData.map((c) => ({
  //   label: c.name + " - " + c.status,
  //   value: c.id,
  // }));

  return (
    <div>
      <div style={{ marginBottom: "50px" }}>
        <Header
          category="Admin KBM / Mata Pelajaran / Ubah Mata Pelajaran"
          title="Ubah Mata Pelajaran"
        />
      </div>
      <div style={{ marginLeft: "60px" }}>
        <p className="text-3xl mb-16 mt-5 font-bold">
          Form Ubah Mata Pelajaran
        </p>
        <article>
          {/* COL 1 */}
          <section>
            <TextInput
              label="Name"
              type="text"
              placeholder={location.state.code}
              onChange={(e) => setName(e.target.value)}
              required={true}
            />
            <TextInput
              label="Deskripsi"
              type="text"
              placeholder={location.state.course_name}
              onChange={(e) => setDescription(e.target.value)}
              required={true}
            />
            {/* <DropdownJenisTransaksi
              label="Kelompok Mata Pelajaran"
              required={true}
              defaultValue={group_course_id}
              isClearable={false}
              options={groupCourseOptions}
              isSearchable={false}
              onChange={(e) => setGroupCourseId(e.value)}
            /> */}
            <TextInput
              label="Tipe"
              type="text"
              placeholder={location.state.type}
              onChange={(e) => setType(e.target.value)}
              required={true}
            />
          </section>

          <div className="btn-form">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Ubah
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateMapel}
            >
              Batal
            </button>
          </div>

          {/* <ModalStatusTambah
            isOpenStatus={isOpenStatus}
            closeModalStatus={closeModalStatus}
            status={sts}
            navigate={navigateMapel}
          />

          <ModalEmpty
            isOpenEmpty={isOpenEmpty}
            closeModalEmpty={closeModalEmpty}
            onRequestCloseEmpty={closeModalEmpty}
          /> */}
        </article>
      </div>
    </div>
  );
}
