import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postPengeluaran, updatePengeluaran } from "../../../api/Spendings";
import { Header } from "../../../components";
import {
  DropdownDatePickers,
  DropdownSiswa,
} from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import { AlertMessage } from "../../../components/ModalPopUp";
import moment from "moment/moment";

export default function UbahPengeluaran() {
  const location = useLocation();
  const [amounts, setAmount] = useState(location.state.amount);
  const [description, setDescription] = useState(location.state.description);
  const [name, setName] = useState(location.state.name);
  const [transactionDate, setTransactionDate] = useState(
    moment(location.state.transactionDate).format("YYYY-MM-DD")
  );
  const [type, setType] = useState({
    label: location.state.type,
    value: location.state.type,
  });
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const [fields, setFields] = useState([{ name: "", amount: "", qty: "" }]);
  const navigate = useNavigate();
  const path = "/admin/list-pengeluaran";
  const uploaderRef = useRef(null);

  const asyncSettings = {
    saveUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Save",
    removeUrl: "https://aspnetmvc.syncfusion.com/services/api/uploadbox/Remove",
  };

  const minFileSize = 0;
  const maxFileSize = 5000000;

  const onRemoveFile = (args) => {};

  const onFileUpload = (args) => {};

  const onSuccess = (args) => {
    console.log("File uploaded successfully!", args);
    setFilesData(args);
  };

  const postData = (e) => {
    const invoice = filesData?.file?.rawFile;
    const amount = parseInt(amounts);
    e.preventDefault();

    const formData = new FormData();

    formData.append(`amount`, amount);
    formData.append(`description`, description);
    formData.append(`name`, name);
    formData.append(`transactionDate`, transactionDate);
    formData.append(`type`, type.value);
    formData.append(`invoice`, invoice);

    fields.forEach((item, index) => {
      formData.append(`items.${index}.name`, item.name);
      formData.append(`items.${index}.amount`, item.amount);
      formData.append(`items.${index}.qty`, item.qty);
    });

    for (const entry of formData.entries()) {
      console.log(entry[0], entry[1]);
    }

    if (amounts === "" || description === "") {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
    } else {
      updatePengeluaran(
        setSts,
        navigatePengeluaran,
        formData,
        location.state.id
      );
    }
  };

  const navigatePengeluaran = () => {
    navigate(path);
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    // inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    // inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
    // const value = parseInt(inputVal);
    setAmount(inputVal);
  };

  // Function to handle changes in form fields
  const handleFieldChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  // Function to add a new set of fields
  const addField = () => {
    setFields([...fields, { name: "", amount: "", qty: "" }]);
  };

  // Function to remove a set of fields
  const removeField = (index) => {
    const newFields = [...fields];
    newFields.splice(index, 1);
    setFields(newFields);
  };

  const typeOptions = [
    {
      value: "pendidikan",
      label: "Pendidikan",
    },
    { value: "operasional", label: "Operasional" },
  ];

  return (
    <div>
      <Header
        home="Admin Keuangan"
        prev="List Pengeluaran"
        navePrev={path}
        at="Ubah Pengeluaran"
        title="Ubah Pengeluaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Ubah Pengeluaran
        </p>
        <article>
          <TextInput
            label="Total Pengeluaran"
            type="text"
            value={amounts}
            onChange={handleInputChange}
            required={true}
          />
          <TextInput
            label="Nama"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />
          <DropdownDatePickers
            label="Tanggal Pengeluaran"
            value={transactionDate}
            change={(e) => setTransactionDate(e.element.value)}
          />
          <DropdownSiswa
            label="Tipe Pengeluaran"
            required={true}
            defaultValue={type}
            isClearable={false}
            options={typeOptions}
            isSearchable={false}
            onChange={(e) => setType(e.value)}
          />
          {/* <TextInput
            label="Tipe Pengeluaran"
            type="text"
            onChange={(e) => setType(e.target.value)}
            required={true}
          /> */}
          <TextInput
            label="Catatan"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
          <div
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
              removing={onRemoveFile}
              uploading={onFileUpload}
              success={onSuccess.bind(this)}
              locale="id-BAHASA"
              allowedExtensions=".png,.jpg"
              accept=".png,.jpg"
              minFileSize={minFileSize}
              maxFileSize={maxFileSize}
              multiple={false}
              buttons={{
                browse: !filesData ? "Unggah Berkas" : "Ganti Berkas",
              }}
            />
            <small className=" text-gray-400">
              <i>Jenis berkas: .png / .jpg</i>
            </small>
          </div>
          <br />
          <p
            style={{ display: "flex", justifyContent: "center" }}
            className="ml-1 font-bold text-merah"
          >
            Detail Barang
          </p>
          {fields.map((field, index) => (
            <div key={index}>
              <br />
              <hr />
              <br />
              <TextInput
                label="Nama Barang"
                type="text"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
                // onChange={(e) => setMonth(e.target.value)}
                required={true}
              />
              <TextInput
                label="Harga Barang"
                type="number"
                value={field.amount}
                onChange={(e) =>
                  handleFieldChange(index, "amount", e.target.value)
                }
                // onChange={(e) => setMonth(e.target.value)}
                required={true}
              />
              <TextInput
                label="Jumlah Barang"
                type="number"
                value={field.qty}
                onChange={(e) =>
                  handleFieldChange(index, "qty", e.target.value)
                }
                // onChange={(e) => setMonth(e.target.value)}
                required={true}
              />
            </div>
          ))}
          <button
            className="btn-mrh w-10"
            style={{ display: "flex", float: "right" }}
            onClick={removeField}
          >
            <i className="mt-1 fa fa-minus" />
          </button>
          <button
            className="btn-hijau w-10"
            style={{ display: "flex", float: "right", marginRight: "4px" }}
            onClick={addField}
          >
            <i className="mt-1 fa fa-plus" />
          </button>
          <br />
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
              onClick={navigatePengeluaran}
            >
              Batal
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
