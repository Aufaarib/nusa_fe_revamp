import { UploaderComponent } from "@syncfusion/ej2-react-inputs";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postPengeluaran } from "../../../api/Spendings";
import { Header } from "../../../components";
import {
  DropdownDatePickers,
  DropdownSiswa,
} from "../../../components/Dropdown";
import TextInput from "../../../components/TextInput";
import { AlertMessage } from "../../../components/ModalPopUp";
import { CircularProgress } from "@mui/material";
import { FileUpload } from "../../../components/FileUpload";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function TambahPengeluaran() {
  const [amounts, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [type, setType] = useState("");
  const [sts, setSts] = useState(undefined);
  const [filesData, setFilesData] = useState(null);
  const [fields, setFields] = useState([{ name: "", amount: "", qty: "" }]);
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useStateContext();
  const path = "/admin/list-pengeluaran";
  const uploaderRef = useRef(null);

  const navigateListSpending = () => {
    navigate(path);
  };

  const postData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const invoice = filesData;
    const amount = parseInt(amounts.replace(/\./g, ""), 10);

    const formData = new FormData();

    formData.append(`amount`, amount);
    formData.append(`description`, description);
    formData.append(`name`, name);
    formData.append(`transactionDate`, transactionDate);
    formData.append(`type`, type);
    formData.append(`invoice`, invoice);

    fields.forEach((item, index) => {
      formData.append(`items.${index}.name`, item.name);
      formData.append(`items.${index}.amount`, item.amount);
      formData.append(`items.${index}.qty`, item.qty);
    });

    if (amount.length === 0 || description.length === 0 || type.length === 0) {
      AlertMessage("Gagal", "Input Data Tidak Lengkap", "Coba Lagi", "warning");
      setIsLoading(false);
    } else {
      postPengeluaran(setSts, navigateListSpending, formData, setIsLoading);
    }
  };

  const handleInputChange = (event) => {
    let inputVal = event.target.value;
    inputVal = inputVal.replace(/\D/g, ""); // Remove all non-numeric characters
    inputVal = inputVal.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add dots every 3 digits
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
  const removeField = () => {
    const newFields = [...fields];
    newFields.pop();
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
        navPrev={path}
        at="Tambah Pengeluaran"
        title="Tambah Pengeluaran"
      />
      <div style={{ padding: "44px 104px 0" }}>
        <p
          style={{
            fontSize: "24px",
            marginBottom: "50px",
          }}
          className="ml-1 font-bold text-merah"
        >
          Form Tambah Pengeluaran
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
          <TextInput
            label="Catatan"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            required={true}
          />
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
            <FileUpload
              setFilesData={setFilesData}
              filesData={filesData}
              fileInputId={"fileInput1"}
            />
          </div>
          <br />
          <hr className="mr-10 mb-10" />
          <p className="font-bold text-merah mr-8 underline flex justify-center">
            Tambah Detail Barang
          </p>
          {fields.map((field, index) => (
            <div key={index}>
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
              <br />
              <hr className="mr-10 " />
            </div>
          ))}
          <div className="mr-10 flex justify-end py-5 gap-2">
            <button
              className="btn-mrh w-10"
              title="Kurangi Formulir"
              onClick={removeField}
            >
              <i className="mt-1 fa fa-minus" />
            </button>
            <button
              className="btn-hijau w-10"
              title="Tambah Formulir"
              onClick={addField}
            >
              <i className="mt-1 fa fa-plus" />
            </button>
          </div>
          <br />
          <div className="btn-form mr-7 flex justify-center items-center">
            {isLoading && <CircularProgress size={24} className="mr-8" />}
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
