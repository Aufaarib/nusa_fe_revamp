import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { DropdownSiswa } from "../../../components/Dropdown";
import TextInput, { TextArea } from "../../../components/TextInput";
import { getActiveSession, postNews, updateNews } from "../../../api/Sarat";
import { AlertMessage } from "../../../components/ModalPopUp";
import { useEffect } from "react";

export default function UbahNews() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [session_detail_id, setSessionDetailId] = useState({
    label: location.state.session_detail_id,
    value: location.state.session_detail_id,
  });
  const [description, setDescription] = useState(location.state.description);
  const [video_url, setVideoUrl] = useState(location.state.video_url);
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(location.state.images);
  const [updateFilesData, setUpdateFilesData] = useState([]);
  const navigate = useNavigate();
  const path = "/admin/list-berita";
  const uploaderRef = useRef(null);

  const removeFiles = (index) => {
    const newArray = [...filesData];
    newArray.splice(index, 1);
    setFilesData(newArray);
  };

  console.log("filesData === ", filesData);

  useEffect(() => {
    getActiveSession(setData, setSts);
  }, []);

  const navigateListSpending = () => {
    navigate(path);
  };

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const minFileSize = 0;
  const maxFileSize = 5000000;

  const onUploadChange = (args) => {
    console.log("File uploaded successfully:", args);
    setUpdateFilesData([...updateFilesData, args]);
  };

  const removeFile = (fileIndex) => {
    const updatedFiles = [...updateFilesData];
    updatedFiles.splice(fileIndex, 1);
    setUpdateFilesData(updatedFiles);
  };
  const onFileUpload = (args) => {};

  const onSuccess = (args) => {
    console.log("File uploaded successfully!", args);
  };

  const postData = (e) => {
    e.preventDefault();
    // const invoice = filesData?.filesData[0].rawFile;
    const formData = new FormData();

    formData.append(`session_detail_id`, 103);
    formData.append(`description`, description);
    formData.append(`video_url`, video_url);

    filesData.forEach((file, index) => {
      formData.append(
        `images`,
        process.env.REACT_APP_BASE_STATIC_SARAT_FILE + file.image_url
      );
    });

    updateFilesData.forEach((file, index) => {
      formData.append(`images`, file.filesData[0].rawFile);
    });

    formData.forEach(function (value, key) {
      console.log(key, value);
    });

    if (
      session_detail_id.value === "" ||
      description === "" ||
      video_url === ""
      // filesData.length === 0
    ) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updateNews(location.state.id, setSts, navigateListSpending, formData);
    }
  };

  const activeSession = data.map((c) => ({
    label: `${c.title} : ${c.description}`,
    value: c.id,
  }));

  return (
    <div>
      <Header
        home="Admin SARAT"
        prev="List Berita"
        navPrev={path}
        at="Ubah Berita"
        title="Ubah Berita"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Berita
        </p>
        <article>
          <DropdownSiswa
            label="Sesi"
            required={true}
            defaultValue={session_detail_id}
            isClearable={false}
            options={activeSession}
            isSearchable={false}
            onChange={(e) => setSessionDetailId(e.value)}
          />
          <TextArea
            label="Deskripsi"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <TextInput
            label="Link Video"
            type="text"
            onChange={(e) => setVideoUrl(e.target.value)}
            value={video_url}
            required={true}
          />
          <br />
          <hr className="mr-10 mb-10" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              padding: "20px",
            }}
          >
            {filesData.map((files, index) => (
              <div
                key={index}
                className="flex flex-col justify-center gap-3 items-center"
              >
                <img
                  className="w-84 h-64 mt-2"
                  src={
                    process.env.REACT_APP_BASE_STATIC_SARAT_FILE +
                    files.image_url
                  }
                  alt="Not Found"
                />
                {/* <button
                  className="mt-2 px-2 text-merah border-solid border-1 border-merah rounded-full text-3xl fa fa-trash"
                  onClick={() => removeFiles(index)}
                /> */}
              </div>
            ))}
          </div>
          <br />
          <p className="font-bold text-merah mr-8 underline flex justify-center">
            Ganti Foto-Foto
          </p>
          <br />
          <div
            className="mr-10"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginTop: "20px",
              width: "auto",
            }}
          >
            <UploaderComponent
              type="file"
              ref={uploaderRef}
              asyncSettings={asyncSettings}
              removing={removeFile}
              selected={onUploadChange}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              // multiple={true}
              buttons={{
                browse: filesData.length === 0 ? "Unggah Foto" : "Tambah Foto",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png / .jpg</i>
            </small>
          </div>
          <br />
          <hr className="mr-10 " />
          <div className="btn-form mr-7">
            <button
              type="button"
              className="w-20 btn-merah flex justify-center mb-5"
              onClick={postData}
            >
              Simpan
            </button>
            <button
              type="button"
              className="w-20 btn-putih flex justify-center mb-5"
              onClick={navigateListSpending}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
