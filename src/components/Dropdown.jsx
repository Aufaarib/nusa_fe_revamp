import Select from "react-select";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import RadioInput from "./RadioInput";
import { useRef, useState } from "react";

const onKeyDown = (event) => {
  if (event.keyCode === 13) {
    //13 is the key code for Enter
    event.preventDefault();
    //Here you can even write the logic to select the value from the drop down or something.
  }
};

export const DropdownKurikulum = ({
  label,
  name,
  onChange,
  required,
  options,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownStatus = ({
  isSearchable,
  label,
  name,
  onChange,
  required,
  defaultValue,
  isClearable,
  placeholder,
}) => {
  const options = [
    { value: "Aktif", label: "Aktif" },
    { value: "Tidak Aktif", label: "Tidak Aktif" },
  ];

  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder={placeholder}
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownGroup = ({
  isSearchable,
  label,
  name,
  onChange,
  required,
  defaultValue,
  isClearable,
  handleOnClick,
}) => {
  const options = [
    { value: "Operasional", label: "Biaya Operasional" },
    { value: "Biaya Pendidikan", label: "Biaya Pendidikan" },
  ];

  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownCostCenter = ({
  label,
  name,
  onChange,
  required,
  options,
  defaultValue,
  isClearable,
  handleOnClick,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
          <p>
            <a
              style={{ fontSize: "12px", borderBottom: "1px solid #8F0D1E" }}
              className="block text-merah float-right"
              onClick={handleOnClick}
            >
              Tambah Cost Center
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export const DropdownMultiple = ({
  label,
  name,
  onChange,
  required,
  options,
  defaultValue,
  isClearable,
  handleOnClick,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isClearable={isClearable}
            defaultValue={defaultValue}
            isMulti
            placeholder="Pilih Beberapa..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownSiswa = ({
  label,
  name,
  onChange,
  options,
  required,
  isClearable,
  isSearchable,
  defaultValue,
  placeholder,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            isSearchable={isSearchable}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownJenisTransaksi = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  options,
  isClearable,
  defaultValue,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownDebitKredit = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  rows,
  defaultValue,
  isClearable,
}) => {
  const options = [
    { value: "Debit", label: "Debit" },
    { value: "Kredit", label: "Kredit" },
  ];

  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name} className="mt-2">
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span className="mt-2">:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownBank = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  options,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownPendaftaran = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  options,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownValidasiStep = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  defaultValue,
  isClearable,
}) => {
  const options = [
    { value: "valid", label: "Sesuai" },
    { value: "invalid", label: "Tidak Sesuai" },
    { value: "inreview", label: "Sedang Di Tinjau" },
  ];

  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownTipeTransaksi = ({
  isSearchable,
  label,
  type,
  id,
  name,
  ref,
  autoComplete,
  onChange,
  required,
  defaultValue,
  isClearable,
}) => {
  const options = [
    { value: "Transfer", label: "Transfer" },
    { value: "Cash", label: "Cash" },
  ];

  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            // border: "1px solid gray",
          }}
        >
          <Select
            className="w-full"
            isSearchable={isSearchable}
            isClearable={isClearable}
            defaultValue={defaultValue}
            placeholder="Pilih Salah Satu..."
            options={options}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownListComponents = ({
  placeholder,
  label,
  dataSource,
  id,
  name,
  fields,
  value,
  change,
  required,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            // border: "1px solid gray",
          }}
        >
          <DropDownListComponent
            placeholder={placeholder}
            id={id}
            dataSource={dataSource}
            fields={fields}
            value={value}
            change={change}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownDatePickers = ({ label, id, name, value, change }) => {
  return (
    <div>
      <div className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} <span className="ml-1 text-merah">*</span>
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm md:ml-10 text-base font-normal text-gray-700 bg-merah "
          style={{
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
          }}
        >
          <DatePickerComponent
            id={id}
            value={value}
            change={change}
            format="yyy-MM-dd"
            placeholder="Pilih Tanggal (YYYY-MM-DD)"
            openOnFocus
          />
        </div>
      </div>
    </div>
  );
};
export const DropdownRadioInputisOneHouse = ({
  onChange,
  label,
  label2,
  label3,
  checked,
  id,
  name,
  fields,
  value1,
  value2,
  change,
  required,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            gap: "20px",
            // border: "1px solid gray",
          }}
        >
          <RadioInput
            value={value1}
            label={label2}
            name="isOneHouse"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value={value2}
            label={label3}
            name="isOneHouse"
            onChange={onChange}
            checked={checked}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownRadioInputBiological = ({
  onChange,
  label,
  label2,
  label3,
  checked,
  id,
  name,
  fields,
  value1,
  value2,
  change,
  required,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label className="capitalize" htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            outline: "none",
            gap: "20px",
            // border: "1px solid gray",
          }}
        >
          <RadioInput
            value={value1}
            label={label2}
            name="isBiological"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value={value2}
            label={label3}
            name="isBiological"
            onChange={onChange}
            checked={checked}
          />
        </div>
        {/* <div className="flex gap-5 w-full ml-20">
          <RadioInput
            value={value1}
            label={label2}
            name="isBiological"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value={value2}
            label={label3}
            name="isBiological"
            onChange={onChange}
            checked={checked}
          />
        </div> */}
      </form>
    </div>
  );
};
export const DropdownRadioInputGender = ({
  onChange,
  label,
  label2,
  label3,
  checked,
  id,
  name,
  fields,
  value1,
  value2,
  change,
  required,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            gap: "20px",
            // border: "1px solid gray",
          }}
        >
          <RadioInput
            value={value1}
            label={label2}
            name="gender"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value={value2}
            label={label3}
            name="gender"
            onChange={onChange}
            checked={checked}
          />
        </div>
      </form>
    </div>
  );
};
export const DropdownRadioInputBloodType = ({
  onChange,
  label,
  checked,
  id,
  name,
  fields,
  value,
  change,
  required,
  defaultValue,
  isClearable,
}) => {
  return (
    <div>
      <form className="grid-container">
        {label && (
          <label htmlFor={name}>
            {label} {required && <span className="ml-1 text-merah">*</span>}
          </label>
        )}
        <span>:</span>
        <div
          className="text-sm text-base font-normal text-gray-700 bg-white "
          style={{
            marginLeft: "40px",
            display: "flex",
            fontSize: "14px",
            borderRadius: "5px",
            gap: "20px",
            // border: "1px solid gray",
          }}
        >
          <RadioInput
            value="A"
            label="A"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="AB"
            label="AB"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="B"
            label="B"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="O"
            label="O"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
        </div>
        {/* <div className="flex gap-7 w-full ml-20">
          <RadioInput
            value="A"
            label="A"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="AB"
            label="AB"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="B"
            label="B"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
          <RadioInput
            value="O"
            label="O"
            name="bloodType"
            onChange={onChange}
            checked={checked}
          />
        </div> */}
      </form>
    </div>
  );
};
