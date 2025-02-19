import moment from "moment/moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useStateContext } from "../contexts/ContextProvider";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import DatePicker from "react-date-picker";

//Filter Components
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  font-size: 14px;
  display: inline-block;
  float: left;
  height: 30px;
  width: 200px;
  padding: 8px;
  border-radius: 5px;
  outline: none;
`;
// export const Date = ({
//   selectedStart,
//   onChangeStart,
//   selectedEnd,
//   onChangeEnd,
// }) => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <form className="grid-container">
//           <label htmlFor="custom-date-picker-input">
//             Tanggal Awal <span className="ml-1 text-merah">*</span>
//           </label>

//           <span>:</span>

//           <DatePicker
//             selected={selectedStart}
//             onChange={onChangeStart}
//             className="custom-date-picker" // Add custom class name
//             dateFormat="yyyy-MM-dd" // Set date format
//             calendarClassName="custom-date-picker-calendar" // Set calendar class name
//             popperPlacement="bottom" // Set calendar position
//           />
//         </form>
//       </div>
//       <div style={{ display: "flex", flexDirection: "row" }}>
//         <form className="grid-container">
//           <label htmlFor="custom-date-picker-input">
//             Tanggal Akhir <span className="ml-1 text-merah">*</span>
//           </label>

//           <span>:</span>

//           <DatePicker
//             selected={selectedStart}
//             onChange={onChangeStart}
//             className="custom-date-picker" // Add custom class name
//             dateFormat="yyyy-MM-dd" // Set date format
//             calendarClassName="custom-date-picker-calendar" // Set calendar class name
//             popperPlacement="bottom" // Set calendar position
//           />
//         </form>
//       </div>
//     </div>
//   );
// };
export const FilterDate = ({
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <label style={{ marginRight: "10px" }} htmlFor="custom-date-picker-input">
        Tanggal Awal:
      </label>
      <DatePicker
        selected={selectedStart}
        onChange={onChangeStart}
        className="custom-date-picker" // Add custom class name
        dateFormat="yyyy-MM-dd" // Set date format
        calendarClassName="custom-date-picker-calendar" // Set calendar class name
        popperPlacement="bottom" // Set calendar position
      />
      <br />
      <label style={{ marginRight: "10px" }} htmlFor="custom-date-picker-input">
        Tanggal Akhir:
      </label>
      <DatePicker
        selected={selectedEnd}
        onChange={onChangeEnd}
        className="custom-date-picker" // Add custom class name
        dateFormat="yyyy-MM-dd" // Set date format
        calendarClassName="custom-date-picker-calendar" // Set calendar class name
        popperPlacement="bottom" // Set calendar position
      />
    </div>
  );
};
export function FilterComponent({
  filterText,
  onFilter,
  onClick,
  onClickMove,
  button,
  buttonMoveStudents,
  selectedRows,
  setSelected,
  selectedClassRoom,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginBottom: "20px",
          }}
        >
          {selectedRows &&
            selectedRows.length !== 0 &&
            selectedClassRoom !== 0 && (
              <button
                style={{
                  fontSize: "12px",
                  width: "auto",
                  padding: "2px 10px",
                }}
                className="btn-hijau"
                onClick={() => setSelected()}
              >
                <i className="fa fa-reply mr-1 mt-1"> </i> Pindahkan Murid
              </button>
            )}
          {buttonMoveStudents && (
            <button
              style={{
                fontSize: "12px",
                width: "auto",
                padding: "2px 10px",
                marginRight: "5px",
              }}
              className="btn-hijau"
              onClick={onClickMove}
            >
              <i className="fa fa-arrows mr-1 mt-1"></i> {buttonMoveStudents}
            </button>
          )}
          {button && (
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className="btn-hijau"
              onClick={onClick}
            >
              <i className="fa fa-plus mr-1 mt-1"></i> {button}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export function FilterComponentPengeluaran({
  filterText,
  onFilter,
  onClick,
  button,
  value,
  onChange,
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) {
  return (
    <>
      <div
        className="px-0 py-2"
        style={{
          display: "block",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Cari..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginBottom: "20px",
          }}
        >
          <button
            style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            onClick={onClick}
          >
            <i className="fa fa-plus mr-1 mt-1"></i> {button}
          </button>
        </div>
      </div>
      <div className="flex mb-3 px-0 gap-5 justify-between items-center font-bold text-merah">
        <div className="flex flex-row gap-2 mt-5">
          <label className="mt-6">Filter Tipe : </label>
          <select
            className="text-hitam font-normal w-28 mt-6 px-2"
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              height: "30px",
              fontSize: "12px",
            }}
            value={value}
            onChange={onChange}
          >
            <option value="all">Semua</option>
            <option value="operasional">Operasional</option>
            <option value="pendidikan">Pendidikan</option>
          </select>
        </div>
        <div className="flex flex-row gap-2 mt-5">
          <label className="mt-6">Filter Tanggal : </label>
          <div className="flex flex-row gap-5 items-center">
            <DatePickerComponent
              floatLabelType="Auto"
              value={selectedStart}
              change={onChangeStart}
              format="yyy-MM-dd"
              placeholder="Mulai (YYYY-MM-DD)"
              openOnFocus
            />
            <label className="mt-5">~</label>
            <DatePickerComponent
              floatLabelType="Auto"
              value={selectedEnd}
              change={onChangeEnd}
              format="yyy-MM-dd"
              placeholder="Sampai (YYYY-MM-DD)"
              openOnFocus
            />
          </div>
        </div>
      </div>
    </>
  );
}
export function FilterComponentSpp({
  filterText,
  onFilter,
  onClick,
  button,
  showButton,
  showDownloadButton,
  onClickDownload,
  selectedTA,
  TAoptions,
  onChangeTAOption,
  filterPaid,
  setFilterPaid,
  filterUnPaid,
  setFilterUnPaid,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Cari Nama Murid..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        {TAoptions && (
          <div
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "20px",
              marginLeft: "10px",
            }}
          >
            <label className="mr-4">Tahun Ajaran : </label>
            <select
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                width: "auto",
                height: "32px",
                fontSize: "12px",
                padding: "5px",
                outline: "none",
              }}
              value={selectedTA}
              onChange={onChangeTAOption}
            >
              <option disabled value="">
                Pilih Tahun Ajaran
              </option>
              {TAoptions.map((items, index) => (
                <option key={items.id} value={items.value}>
                  {items.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {showButton && (
          <div
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "20px",
              marginLeft: "10px",
            }}
          >
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className="btn-hijau"
              onClick={onClick}
            >
              <i className="fa fa-plus mr-1 mt-1"></i> {button}
            </button>
          </div>
        )}
        {showDownloadButton && (
          <div
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "20px",
            }}
          >
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className="btn-hijau"
              onClick={onClickDownload}
            >
              <i className="fa fa-download mr-1 mt-1"></i> Download Report
            </button>
          </div>
        )}
      </div>
    </>
  );
}
export function FilterComponentSession({
  download,
  data = [],
  filterText,
  filter,
  onFilter,
  TAData = [],
  onChangeTA,
  valueTA,
  filterTA,
  SetFilterTA,
  sessionData = [],
  onChangeSession,
  valueSession,
  filterSession,
  SetFilterSession,
  onClick,
  button,
  showButton,
  filterPreTest,
  setFilterPreTest,
  filterPresensi,
  setFilterPresensi,
  setFilterFlag,
  reportFilter,
  searchOptions,
  valueOption,
  onChangeOption,
  searchText,
}) {
  const [isOpenFilter, SetIsOpenFilter] = useState(false);
  const [filterFlag, SetfilterFlag] = useState("");
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          {reportFilter ? (
            <div className="flex flex-row pr-1">
              <select
                style={{
                  border: "1px solid grey",
                  borderRadius: "5px",
                  width: "auto",
                  height: "32px",
                  fontSize: "12px",
                  padding: "5px",
                  outline: "none",
                }}
                value={valueOption.value}
                onChange={onChangeOption}
              >
                <option disabled value="">
                  Pilih Pencarian
                </option>
                {searchOptions.map((items, index) => (
                  <option key={items.id} value={items.value}>
                    {items.label}
                  </option>
                ))}
              </select>
              <Input
                id="search"
                placeholder={`Cari ${valueOption.label}...`}
                value={filterText}
                onChange={onFilter}
              />
              <i style={{ padding: "7px 6px" }} className="fa fa-search" />
            </div>
          ) : (
            searchText && (
              <>
                <Input
                  id="search"
                  placeholder={searchText}
                  value={filterText}
                  onChange={onFilter}
                />
                <i style={{ padding: "7px 6px" }} className="fa fa-search" />
              </>
            )
          )}
        </div>

        {filter ? (
          <>
            <button
              className="btn-hijau w-auto ml-2"
              style={{
                display: "inline-block",
                float: "right",
                padding: "2px 10px",
                fontSize: "12px",
                width: "auto",
              }}
              onClick={() => SetIsOpenFilter(true)}
            >
              <i className="fa fa-filter mr-1"> </i> Pilih Filter Tahun Ajaran
            </button>
            <button
              className={`ml-2
                ${
                  filterFlag === "PRE_TEST"
                    ? "btn-modal-filter-true"
                    : "btn-modal-filter-false"
                }
                `}
              style={{
                display: "inline-block",
                float: "right",
                padding: "2px 10px",
                fontSize: "12px",
                width: "auto",
              }}
              onClick={() => {
                setFilterPresensi(false);
                setFilterPreTest(true);
                if (filterPreTest && filterFlag !== "") {
                  setFilterFlag("");
                  SetfilterFlag("");
                } else {
                  SetfilterFlag("PRE_TEST");
                  setFilterFlag("PRE_TEST");
                }
              }}
            >
              <i
                className={`${
                  filterFlag === "PRE_TEST"
                    ? "fa fa-check text-hijau"
                    : "fa fa-filter"
                } mr-1`}
              ></i>{" "}
              Filter Pre-Test
            </button>
            <button
              className={
                filterFlag === "ATTENDANCE"
                  ? "btn-modal-filter-true"
                  : "btn-modal-filter-false"
              }
              style={{
                display: "inline-block",
                float: "right",
                padding: "2px 10px",
                fontSize: "12px",
                width: "auto",
              }}
              onClick={() => {
                setFilterPresensi(true);
                setFilterPreTest(false);
                if (filterPresensi && filterFlag !== "") {
                  setFilterFlag("");
                  SetfilterFlag("");
                } else {
                  setFilterFlag("ATTENDANCE");
                  SetfilterFlag("ATTENDANCE");
                }
              }}
            >
              <i
                className={`${
                  filterFlag === "ATTENDANCE"
                    ? "fa fa-check text-hijau"
                    : "fa fa-filter"
                } mr-1`}
              >
                {" "}
              </i>{" "}
              Filter Presensi
            </button>
            <button
              className="btn-hijau w-auto mr-2"
              style={{
                display: "inline-block",
                float: "right",
                padding: "2px 10px",
                fontSize: "12px",
                width: "auto",
              }}
              onClick={download}
            >
              <i className="fa fa-download mr-1"> </i> Download Report
            </button>

            {isOpenFilter && (
              <>
                <div className="nav-item absolute right-20 mt-2 bg-white dark:bg-[#42464D] p-7 rounded-lg w-320 drop-shadow-2xl">
                  <div className="flex justify-between">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          display: "block",
                          marginBottom: "10px",
                        }}
                      >
                        <div style={{ display: "inline-block" }}>
                          <h3>Filter Data</h3>
                        </div>
                        <button
                          className="text-merah"
                          onClick={() => SetIsOpenFilter(false)}
                          style={{
                            display: "inline-block",
                            float: "right",
                            fontSize: "25px",
                          }}
                        >
                          <MdOutlineCancel />
                        </button>
                      </div>
                      <strong className="text-merah">
                        Filter Data Berdasarkan :
                      </strong>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "start",
                          gap: "5px",
                        }}
                      >
                        <button
                          onClick={() => {
                            {
                              SetFilterTA(!filterTA);
                            }
                          }}
                          className={
                            filterTA
                              ? "btn-modal-filter-true"
                              : "btn-modal-filter-false"
                          }
                        >
                          Tahun Ajaran{" "}
                          {filterTA ? (
                            <i className="fa fa-check text-hijau" />
                          ) : (
                            <i className="fa fa-angle-down" />
                          )}
                        </button>
                        {filterTA && (
                          <select
                            style={{
                              border: "1px solid grey",
                              borderRadius: "10px",
                              width: "auto",
                              height: "32px",
                              fontSize: "12px",
                              padding: "5px",
                              marginLeft: "10px",
                              outline: "none",
                            }}
                            value={valueTA}
                            onChange={onChangeTA}
                          >
                            <option disabled value="">
                              Pilih Tahun Ajaran
                            </option>
                            {TAData.map((items, index) => (
                              <option key={items.id} value={items.id}>
                                {items.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                      {valueTA && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            gap: "5px",
                          }}
                        >
                          <button
                            onClick={() => {
                              {
                                SetFilterSession(!filterSession);
                              }
                            }}
                            className={
                              filterSession
                                ? "btn-modal-filter-true"
                                : "btn-modal-filter-false"
                            }
                          >
                            Sesi{" "}
                            {filterSession ? (
                              <i className="fa fa-check text-hijau" />
                            ) : (
                              <i className="fa fa-angle-down" />
                            )}
                          </button>
                          {filterSession && (
                            <select
                              style={{
                                border: "1px solid grey",
                                borderRadius: "10px",
                                width: "auto",
                                height: "32px",
                                fontSize: "12px",
                                padding: "5px",
                                marginLeft: "10px",
                                outline: "none",
                              }}
                              value={valueSession}
                              onChange={onChangeSession}
                            >
                              <option disabled value="">
                                Pilih Sesi
                              </option>
                              {sessionData.map((items, index) => (
                                <option key={items.id} value={items.id}>
                                  {items.title}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <div
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "20px",
            }}
          >
            {showButton !== false && (
              <button
                style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
                className="btn-hijau font-bold"
                onClick={onClick}
              >
                <i className="fa fa-plus mr-1 mt-1"></i> {button}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export function FilterComponentWithoutButton({
  filterText,
  onFilter,
  onClick,
  button,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginBottom: "20px",
          }}
        ></div>
      </div>
    </>
  );
}
export function FilterComponentSaring({
  filterText,
  onFilter,
  onClick,
  data = [],
  onChangeRows,
  valueRows,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "5px 14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginBottom: "20px",
          }}
        >
          <button
            style={{ fontSize: "12px" }}
            className="btn-mrh"
            onClick={onClick}
          >
            <i className="fa fa-filter mr-2 mt-1"></i>Saring
          </button>
        </div>
      </div>
    </>
  );
}
export function FilterComponentActivateAdmission({
  filterText,
  onFilter,
  onClickActivate,
  onClickCreatePhase,
  buttonActivate,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <div
          style={{
            display: "inline-block",
            float: "right",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className={buttonActivate === "Aktifkan" ? "btn-biru" : "btn-mrh"}
              onClick={onClickActivate}
            >
              {buttonActivate}
            </button>
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className="btn-hijau"
              onClick={onClickCreatePhase}
            >
              <i className="fa fa-plus mr-1 mt-1"> </i>
              Tambah Gelombang
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export function FilterComponentRegistrations({
  filterText,
  filterValidation,
  SetFilterValidation,
  filterAcademicYear,
  SetFilterAcademicYear,
  filterSteps,
  SetFilterSteps,
  onFilter,
  data = [],
  academicYeardata = [],
  onChangeAcademicYear,
  valueAcademicYear,
  onChangeValidation,
  valueValidation,
  valueSteps,
  onChangeSteps,
  setSelected,
  // setAllSelected,
  selectedRows,
}) {
  const [isOpenFilter, SetIsOpenFilter] = useState("false");

  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <button
          className="btn-hijau w-auto"
          style={{
            display: "inline-block",
            float: "right",
            padding: "2px 10px",
            fontSize: "12px",
            width: "auto",
          }}
          onClick={() => SetIsOpenFilter("true")}
        >
          <i className="fa fa-filter mr-1"> </i> Filter
        </button>
        {isOpenFilter === "true" && (
          <>
            <div className="nav-item absolute right-20 mt-2 bg-white dark:bg-[#42464D] p-7 rounded-lg w-320 drop-shadow-2xl">
              <div className="flex justify-between">
                {data ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      <div style={{ display: "inline-block" }}>
                        <h3>Filter Data</h3>
                      </div>
                      <button
                        className="text-merah"
                        onClick={() => SetIsOpenFilter("false")}
                        style={{
                          display: "inline-block",
                          float: "right",
                          fontSize: "25px",
                        }}
                      >
                        <MdOutlineCancel />
                      </button>
                    </div>
                    <strong className="text-merah">
                      Filter Data Berdasarkan :
                    </strong>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "5px",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (filterAcademicYear === "false") {
                            SetFilterAcademicYear("true");
                          } else SetFilterAcademicYear("false");
                        }}
                        className={
                          filterAcademicYear === "true"
                            ? "btn-modal-filter-true"
                            : "btn-modal-filter-false"
                        }
                      >
                        Tahun Ajaran{" "}
                        {filterAcademicYear === "true" ? (
                          <i className="fa fa-check text-hijau" />
                        ) : (
                          <i className="fa fa-angle-down" />
                        )}
                      </button>
                      {filterAcademicYear === "true" && (
                        <select
                          style={{
                            border: "1px solid grey",
                            borderRadius: "10px",
                            width: "auto",
                            height: "32px",
                            fontSize: "12px",
                            padding: "5px",
                            marginLeft: "10px",
                            outline: "none",
                          }}
                          value={valueAcademicYear}
                          onChange={onChangeAcademicYear}
                        >
                          {academicYeardata.map((c) => (
                            <>
                              <option value={c.year}>{c.year}</option>
                            </>
                          ))}
                        </select>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "5px",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (filterValidation === "false") {
                            SetFilterValidation("true");
                          } else SetFilterValidation("false");
                        }}
                        className={
                          filterValidation === "true"
                            ? "btn-modal-filter-true"
                            : "btn-modal-filter-false"
                        }
                      >
                        Status Pendaftaran{" "}
                        {filterValidation === "true" ? (
                          <i className="fa fa-check text-hijau" />
                        ) : (
                          <i className="fa fa-angle-down" />
                        )}
                      </button>
                      {filterValidation === "true" && (
                        <select
                          style={{
                            border: "1px solid grey",
                            borderRadius: "10px",
                            width: "auto",
                            height: "32px",
                            fontSize: "12px",
                            padding: "5px",
                            marginLeft: "10px",
                            outline: "none",
                          }}
                          value={valueValidation}
                          onChange={onChangeValidation}
                        >
                          <option value="valid">Terverifikasi</option>
                          <option value="inreview">Belum Terverifikasi</option>
                        </select>
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start",
                        gap: "5px",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (filterSteps === "false") {
                            SetFilterSteps("true");
                          } else SetFilterSteps("false");
                        }}
                        className={
                          filterSteps === "true"
                            ? "btn-modal-filter-true"
                            : "btn-modal-filter-false"
                        }
                      >
                        Status Tahapan{" "}
                        {filterSteps === "true" ? (
                          <i className="fa fa-check text-hijau" />
                        ) : (
                          <i className="fa fa-angle-down" />
                        )}
                      </button>
                      {filterSteps === "true" && (
                        <select
                          style={{
                            border: "1px solid grey",
                            borderRadius: "10px",
                            width: "auto",
                            height: "32px",
                            fontSize: "12px",
                            padding: "5px",
                            marginLeft: "10px",
                            outline: "none",
                          }}
                          value={valueSteps}
                          onChange={onChangeSteps}
                        >
                          <option value="verification">
                            Menunggu Verifikasi
                          </option>
                          <option value="testResult">Menunggu Hasil Tes</option>
                          <option value="reReg">
                            Menunggu Persetujuan Daftar Ulang
                          </option>
                          <option value="eduPayment">
                            Menunggu Pembayaran Pendidikan
                          </option>
                          <option value="complete">Lengkap</option>
                          <option value="invalid">Tidak Sesuai</option>
                        </select>
                      )}
                    </div>
                    {/* // )} */}
                  </div>
                ) : (
                  <select
                    style={{
                      border: "1px solid grey",
                      borderRadius: "10px",
                      width: "auto",
                      height: "30px",
                      fontSize: "12px",
                      padding: "5px",
                      marginLeft: "10px",
                    }}
                  >
                    <option value="null">Data Tidak Tersedia</option>
                  </select>
                )}
              </div>
            </div>
          </>
        )}
        {valueValidation === "valid" && (
          <div
            style={{
              display: "inline-block",
              float: "right",
              marginBottom: "20px",
              marginRight: "5px",
            }}
          >
            <div style={{ display: "flex", gap: "5px" }}>
              {selectedRows.length != 0 && (
                <button
                  style={{
                    fontSize: "12px",
                    width: "auto",
                    padding: "2px 10px",
                  }}
                  className="btn-hijau"
                  onClick={() => setSelected()}
                >
                  <i className="fa fa-reply mr-1"> </i> Jadikan Sebagai Murid
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export function FilterComponentFinanceReport({
  filterText,
  onFilter,
  onClick,
  button,
  value,
  onChange,
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) {
  return (
    <>
      <div
        style={{
          borderRadius: "5px",
          border: "1px solid #bfbfbf",
          textAlign: "center",
          display: "inline-block",
        }}
      >
        <Input
          id="search"
          placeholder="Cari Nama Barang..."
          value={filterText}
          onChange={onFilter}
        />
        <i style={{ padding: "7px 6px" }} className="fa fa-search" />
      </div>
      <div className="flex mb-3 px-0 gap-5 justify-between items-center font-bold text-merah">
        <div className="flex flex-row gap-2 mt-5">
          <label className="mt-6">Filter Tipe : </label>
          <select
            className="text-hitam font-normal w-28 mt-6 px-2"
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              height: "30px",
              fontSize: "12px",
            }}
            value={value}
            onChange={onChange}
          >
            <option value="all">Semua</option>
            <option value="K">Kredit</option>
            <option value="D">Debit</option>
          </select>
        </div>
        <div className="flex flex-row gap-2 mt-5">
          <label className="mt-6">Filter Tanggal : </label>
          <div className="flex flex-row gap-5 items-center">
            <DatePickerComponent
              floatLabelType="Auto"
              value={selectedStart}
              change={onChangeStart}
              format="yyy-MM-dd"
              placeholder="Mulai (YYYY-MM-DD)"
              openOnFocus
            />
            <label className="mt-5">~</label>
            <DatePickerComponent
              floatLabelType="Auto"
              value={selectedEnd}
              change={onChangeEnd}
              format="yyy-MM-dd"
              placeholder="Sampai (YYYY-MM-DD)"
              openOnFocus
            />
          </div>
        </div>
      </div>
    </>
  );
}
export function FilterComponentMoveStudentToClassRoom({
  filterText,
  onFilter,
  data = [],
  setSelected,
  setAllSelected,
  selectedRows,
}) {
  return (
    <>
      <div
        style={{
          display: "block",
          padding: "14px",
          marginBottom: "10px",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            borderRadius: "5px",
            border: "1px solid #bfbfbf",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <Input
            id="search"
            placeholder="Pencarian..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        {data ? (
          <>
            <div
              style={{
                display: "inline-block",
                float: "right",
                marginBottom: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "5px" }}>
                {selectedRows.length == 0 && (
                  <button
                    style={{
                      fontSize: "12px",
                      width: "auto",
                      padding: "2px 10px",
                    }}
                    className="btn-mrh"
                    onClick={() => setAllSelected()}
                  >
                    Tambahkan Semua
                  </button>
                )}
                {selectedRows.length != 0 && (
                  <button
                    style={{
                      fontSize: "12px",
                      width: "auto",
                      padding: "2px 10px",
                    }}
                    className="btn-mrh"
                    onClick={() => setSelected()}
                  >
                    Tambahkan Terpilih
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <select
            style={{
              border: "1px solid grey",
              borderRadius: "10px",
              width: "auto",
              height: "30px",
              fontSize: "12px",
              padding: "5px",
              marginLeft: "10px",
            }}
          >
            <option value="null">Data Tidak Tersedia</option>
          </select>
        )}
      </div>
    </>
  );
}
// (AdmissionDetails, )
export function DataTablesAdmissionDetail({
  columns,
  status,
  data,
  defaultSortFieldId,
  filterText,
  onFilter,
  onClickCreatePhase,
  onClickActivate,
  buttonActivate,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            justify-content: center;
            width: 100%;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentActivateAdmission
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onClickCreatePhase={onClickCreatePhase}
        onClickActivate={onClickActivate}
        buttonActivate={buttonActivate}
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (DataRegistrasi)
export function DataTablesRegistrations({
  columns,
  filterValidation,
  SetFilterValidation,
  filterAcademicYear,
  SetFilterAcademicYear,
  filterSteps,
  SetFilterSteps,
  status,
  academicYeardata,
  data,
  defaultSortFieldId,
  filterText,
  onFilter,
  onChangeAcademicYear,
  valueAcademicYear,
  onChangeValidation,
  valueValidation,
  onChangeSteps,
  valueSteps,
  setSelected,
  selectedRows,
}) {
  const { isLoading, setIsLoading } = useStateContext();

  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        .pagination li.active:hover{
            background-color: #8F0D1E;
        }
        .pagination li:hover{
            background-color: #F8F8F8;
        }
        .pagination li.disabled:hover{
            background-color: transparent;
        }
        .pagination li.disabled:hover a{
            background-color: transparent;
            color: grey;
        }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  academicYeardata.sort(function (a, b) {
    return b.year - a.year;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event);
    setCurrentPage(0);
  };

  const handleFilterAcademicYear = (e) => {
    onChangeAcademicYear(e);
    setCurrentPage(0);
  };

  const handleFilterStatusValidation = (e) => {
    onChangeValidation(e);
    setCurrentPage(0);
  };

  const handleFilterStatusSteps = (e) => {
    onChangeSteps(e);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 1;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentRegistrations
        academicYeardata={academicYeardata}
        filterValidation={filterValidation}
        SetFilterValidation={SetFilterValidation}
        filterAcademicYear={filterAcademicYear}
        SetFilterAcademicYear={SetFilterAcademicYear}
        filterSteps={filterSteps}
        SetFilterSteps={SetFilterSteps}
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onChangeAcademicYear={handleFilterAcademicYear}
        valueAcademicYear={valueAcademicYear}
        onChangeValidation={handleFilterStatusValidation}
        valueValidation={valueValidation}
        valueSteps={valueSteps}
        onChangeSteps={handleFilterStatusSteps}
        dataLength={data.length}
        setSelected={setSelected}
        selectedRows={selectedRows}
      />
      <div>
        {data ? (
          <div>
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress size={24} />
              </div>
            ) : (
              <DataTable
                columns={columns}
                customStyles={CustomStylesTable}
                data={currentPageData}
                defaultSortAsc={false}
                defaultSortFieldId={defaultSortFieldId}
              />
            )}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
          </div>
        )}
      </div>
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => handleItemsPerPageChange(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => handleItemsPerPageChange(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => handleItemsPerPageChange(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (SetupPMB, TahunAjaran, ListGuru, ListRuangan, ListRuanganKelas)
export function DataTablesPMB({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
  onClickMove,
  buttontxt,
  buttonMoveStudents,
  selectedRows,
  setSelected,
  selectedClassRoom,
}) {
  const { isLoading, setIsLoading } = useStateContext();

  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponent
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        onClickMove={onClickMove}
        button={buttontxt}
        buttonMoveStudents={buttonMoveStudents}
        selectedRows={selectedRows}
        setSelected={setSelected}
        selectedClassRoom={selectedClassRoom}
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              // progressPending={true}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (ListKurikulum, ListKelas, ListMataPelajaran, ListKelompokMapel, ListPengeluaran, )
export function DataTables({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponent
        data={data}
        // onChangeRows={handleItemsPerPageChange}
        // valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        button="Tambah"
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (ListSpp)
export function DataTablesListSpp({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
  filterPaid,
  setFilterPaid,
  filterUnPaid,
  setFilterUnPaid,
  button,
  showButton,
  showDownloadButton,
  onClickDownload,
  selectedTA,
  TAoptions,
  onChangeTAOption,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentSpp
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        filterPaid={filterPaid}
        setFilterPaid={setFilterPaid}
        filterUnPaid={filterUnPaid}
        setFilterUnPaid={setFilterUnPaid}
        button={button}
        showButton={showButton}
        showDownloadButton={showDownloadButton}
        onClickDownload={onClickDownload}
        selectedTA={selectedTA}
        TAoptions={TAoptions}
        onChangeTAOption={onChangeTAOption}
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export function DataTablesSession({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  filter,
  onFilter,
  onClick,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  currentPage,
  pagination,
  buttonText,
  showButton,
  sessionData,
  onChangeSession,
  valueSession,
  filterSession,
  SetFilterSession,
  TAData,
  onChangeTA,
  valueTA,
  filterTA,
  SetFilterTA,
  filterPreTest,
  setFilterPreTest,
  filterPresensi,
  setFilterPresensi,
  setFilterFlag,
  reportFilter,
  searchOptions,
  valueOption,
  onChangeOption,
  searchText,
}) {
  const { isLoading, setIsLoading } = useStateContext();

  const CustomStylesTable = {
    table: {
      style: {
        // maxWidth: "",
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data?.sort(function (a, b) {
    return b.id - a.id;
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(
      pagination?.total_data / itemsPerPage ||
        pagination?.total / itemsPerPage ||
        currentPageData.length / itemsPerPage
    );
  }

  const downloadExcel = async () => {
    setIsLoading(true);

    try {
      // Step 1: Get all unique questions
      const allQuestions = new Set();
      data.forEach((val) => {
        val.answer_result?.forEach((q) => {
          if (q.question?.question) {
            allQuestions.add(q.question.question);
          }
        });
      });

      const questionHeaders = Array.from(allQuestions);

      // Step 2: Map data into organized format
      const organizedData = data.map((val) => {
        const answers = {};
        val.answer_result?.forEach((q) => {
          if (q.question?.question) {
            answers[q.question.question] =
              q.question?.question_type !== "UPLOAD" &&
              q.answer_description !== ""
                ? q.answer_description
                : q.answer || "-";
          }
        });

        // Extract file URL from answer_result where question_type is UPLOAD
        let fileUrl = "-";
        val.answer_result?.forEach((q) => {
          if (q.question?.question_type === "UPLOAD" && q.answer) {
            fileUrl = `${process.env.REACT_APP_BASE_STATIC_SARAT_FILE}${q.answer}`;
          }
        });

        return {
          "Asal Cabang": val.institution?.name || "-",
          Status: val.user?.role === "mother" ? "Bunda" : "Ayah" || "-",
          "Nama Wali Murid": val.user?.fullname || "-",
          "Nama Murid":
            val.user?.students
              ?.map((student) => student.student_name)
              .join(", ") || "-",
          Kelas:
            val.user?.students?.map((student) => student.class).join(", ") ||
            "-",
          Tanggal: moment(val.created_at).format("DD MMM YYYY") || "-",
          Jam: moment(val.created_at).format("hh:mm") || "-",
          Kehadiran: val.attendance_type || "-",
          "Alasan hadir terlambat": val.reason_late || "-",
          ...questionHeaders.reduce((acc, question) => {
            acc[question] = answers[question] || "-";
            return acc;
          }, {}),
          "Link Resume": fileUrl, // Store raw URL for now
        };
      });

      // Step 3: Convert to XLSX format
      const worksheet = XLSX.utils.json_to_sheet(organizedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users Report");

      const linkColumnIndex = Object.keys(organizedData[0]).indexOf(
        "Link Resume"
      );

      organizedData.forEach((row, rowIndex) => {
        if (row["Link Resume"] && row["Link Resume"] !== "-") {
          const cellRef = XLSX.utils.encode_cell({
            r: rowIndex + 1,
            c: linkColumnIndex,
          });

          // Apply hyperlink styling
          worksheet[cellRef] = {
            t: "s",
            v: row["Link Resume"], // Display text
            l: { Target: row["Link Resume"], Tooltip: "Click to open" }, // Hyperlink
            s: { font: { color: { rgb: "0000FF" }, underline: true } }, // Blue & underlined
          };
        }
      });

      // Step 4: Auto-adjust column widths
      const columnWidths = Object.keys(organizedData[0]).map((key) => ({
        wch: Math.max(
          key.length, // Header length
          ...organizedData.map((row) =>
            row[key] ? row[key].toString().length : 0
          ) // Longest cell
        ),
      }));

      worksheet["!cols"] = columnWidths;

      // Step 5: Trigger download
      XLSX.writeFile(workbook, "resume-report.xlsx");
    } catch (error) {
      console.error("Error generating Excel file:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FilterComponentSession
        download={() => downloadExcel()}
        data={data}
        filterText={filterText}
        filter={filter}
        onFilter={onFilter}
        TAData={TAData}
        onChangeTA={onChangeTA}
        valueTA={valueTA}
        filterTA={filterTA}
        SetFilterTA={SetFilterTA}
        sessionData={sessionData}
        onChangeSession={onChangeSession}
        valueSession={valueSession}
        filterSession={filterSession}
        SetFilterSession={SetFilterSession}
        onClick={onClick}
        button={buttonText}
        showButton={showButton}
        filterPreTest={filterPreTest}
        setFilterPreTest={setFilterPreTest}
        filterPresensi={filterPresensi}
        setFilterPresensi={setFilterPresensi}
        setFilterFlag={setFilterFlag}
        reportFilter={reportFilter}
        searchOptions={searchOptions}
        valueOption={valueOption}
        onChangeOption={onChangeOption}
        searchText={searchText}
      />
      <div>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress size={24} />
          </div>
        ) : currentPageData.length !== 0 ? (
          <DataTable
            columns={columns}
            customStyles={CustomStylesTable}
            data={currentPageData}
            defaultSortAsc={false}
            defaultSortFieldId={defaultSortFieldId}
          />
        ) : (
          currentPageData.length == 0 ||
          (!isLoading && (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
            </div>
          ))
        )}
      </div>
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => {
                    setCurrentPage(0);
                    setItemsPerPage(20);
                  }}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(0);
                    setItemsPerPage(50);
                  }}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(0);
                    setItemsPerPage(100);
                  }}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(0);
                    setItemsPerPage(500);
                  }}
                  className={
                    itemsPerPage === 500
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  500
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">
                  {currentPageData?.length}
                </strong>{" "}
                dari <strong className="text-merah">{data?.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function DataTablesDetailSession({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  currentPage,
  pagination,
  buttonText,
  showButton,
}) {
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  return (
    <>
      {data ? (
        <div>
          {data.length == 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={data}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
    </>
  );
}
// (ListPengeluaran)
export function DataTablePengeluaran({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
  onChange,
  value,
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    var c = new Date(a.transactionDate);
    var d = new Date(b.transactionDate);
    return c - d;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentPengeluaran
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        value={value}
        onChange={onChange}
        selectedStart={selectedStart}
        onChangeStart={onChangeStart}
        selectedEnd={selectedEnd}
        onChangeEnd={onChangeEnd}
        button="Tambah Pengeluaran"
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (ListMurid)
export function DataTablesWithoutButton({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentWithoutButton
        data={data}
        // onChangeRows={handleItemsPerPageChange}
        // valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        button="Tambah"
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
// (ListLaporan)
export function DataTablesFinanceReport({
  columns,
  status,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
  onChange,
  value,
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) {
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    var c = new Date(a.createdAt);
    var d = new Date(b.createdAt);
    return c - d;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentFinanceReport
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
        value={value}
        onChange={onChange}
        selectedStart={selectedStart}
        onChangeStart={onChangeStart}
        selectedEnd={selectedEnd}
        onChangeEnd={onChangeEnd}
      />
      {data ? (
        <div>
          {status == 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export function DataTablesRegistrationDetail({
  columns,
  status,
  data,
  defaultSortFieldId,
}) {
  const { isLoading, setIsLoading } = useStateContext();

  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
        backgroundColor: "#F3F4F6",
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#FFF",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };
  return (
    <>
      <div>
        <div
          style={{
            borderRadius: "6px",
            backgroundColor: "#F3F4F6",
            padding: "30px 30px 30px",
          }}
        >
          {data ? (
            <div>
              {isLoading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress size={24} />
                </div>
              ) : (
                <DataTable
                  columns={columns}
                  customStyles={CustomStylesTable}
                  data={data}
                  defaultSortAsc={false}
                  defaultSortFieldId={defaultSortFieldId}
                />
              )}
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
            </div>
          )}
          <div></div>
        </div>
      </div>
    </>
  );
}
export function DataTablesMoveStudentToClassRoom({
  columns,
  status,
  data,
  defaultSortFieldId,
  filterText,
  onFilter,
  setSelected,
  setAllSelected,
  selectedRows,
}) {
  const { isLoading, setIsLoading } = useStateContext();
  const CustomStylesTable = {
    table: {
      style: {
        maxWidth: "1000px", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        .pagination li.active:hover{
            background-color: #8F0D1E;
        }
        .pagination li:hover{
            background-color: #F8F8F8;
        }
        .pagination li.disabled:hover{
            background-color: transparent;
        }
        .pagination li.disabled:hover a{
            background-color: transparent;
            color: grey;
        }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 1;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentMoveStudentToClassRoom
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        dataLength={data.length}
        setSelected={setSelected}
        setAllSelected={setAllSelected}
        selectedRows={selectedRows}
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <CircularProgress size={24} />
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => handleItemsPerPageChange(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => handleItemsPerPageChange(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => handleItemsPerPageChange(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export function DataTablesSaring({
  columns,
  data = [],
  defaultSortFieldId,
  filterText,
  onFilter,
  onClick,
}) {
  const CustomStylesTable = {
    table: {
      style: {
        width: "auto", // set the width of the table wrapper
      },
    },
    cells: {
      style: {
        paddingLeft: "20px", // override the cell padding for data cells
        justifyContent: "center",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        backgroundColor: "#D5D5D540",
        marginTop: "10px",
        borderRadius: "10px",
        border: "0px",
        minHeight: "72px", // override the row height
        "&:not(:last-of-type)": {
          border: "0px",
        },
      },
    },
    denseStyle: {
      minHeight: "32px",
    },
    headRow: {
      style: {
        backgroundColor: "#8F0D1E",
        minHeight: "52px",
        borderRadius: "10px",
      },
      denseStyle: {
        minHeight: "32px",
      },
    },
    headCells: {
      style: {
        paddingLeft: "20px", // override the cell padding for head cells
        paddingRight: "10px",
        justifyContent: "center",
        color: "rgb(243 241 241)",
      },
    },
  };

  // CSS styles
  const styles = `
        .pagination {
            display: flex;
            border-radius: 10px;
            padding: 0 0;
        }
        .pagination li {
            display: inline-block;
            margin-right: 5px;
            padding: 5px;
            border-radius: 15px;
            background-color: transparent;
            width: 40px;
            text-align: center;
        }
        .pagination li.active {
            background-color: #8F0D1E;
        }
        .pagination li.disabled {
            opacity: 0.5;
            cursor: default;
        }
        .pagination li a {
            cursor: pointer;
            color: black;
        }
        .pagination li.active a {
            cursor: pointer;
            color: #fff;
        }
        .pagination li.disabled a {
            cursor: not-allowed;
            color: grey;
        }
        // .pagination li:hover{
        //     background-color: #8F0D1E;
        // }
        // .pagination li:hover a{
        //     background-color: #8F0D1E;
        //     color: #fff;
        // }
        // .pagination li.disabled:hover{
        //     background-color: transparent;
        // }
        // .pagination li.disabled:hover a{
        //     background-color: transparent;
        //     color: grey;
        // }
        `;

  data.sort(function (a, b) {
    return b.id - a.id;
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    setItemsPerPage(itemsPerPage);
  };

  const offset = currentPage * itemsPerPage;
  let currentPageData = [];
  let pageCount = 0;

  if (data !== null) {
    currentPageData =
      itemsPerPage === "all" ? data : data.slice(offset, offset + itemsPerPage);
    pageCount = Math.ceil(data.length / itemsPerPage);
  }

  return (
    <>
      <FilterComponentSaring
        data={data}
        // onChangeRows={handleItemsPerPageChange}
        // valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClick={onClick}
      />
      {data ? (
        <div>
          {data.length === 0 ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
            </div>
          ) : (
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={currentPageData}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          )}
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px" }}>Data Tidak Tersedia</h1>
        </div>
      )}
      {itemsPerPage !== "all" && (
        <>
          <div
            style={{
              display: "block",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <strong className="text-merah" style={{ marginTop: "6px" }}>
                  Jumlah Data Per Halaman
                </strong>
                <button
                  onClick={() => setItemsPerPage(20)}
                  className={
                    itemsPerPage === 20
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  20
                </button>
                <button
                  onClick={() => setItemsPerPage(50)}
                  className={
                    itemsPerPage === 50
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  50
                </button>
                <button
                  onClick={() => setItemsPerPage(100)}
                  className={
                    itemsPerPage === 100
                      ? "btn-rows-per-page-active"
                      : "btn-rows-per-page"
                  }
                >
                  100
                </button>
              </div>
            </div>
            <div style={{ display: "inline-block", float: "right" }}>
              <style>{styles}</style>
              <ReactPaginate
                previousLabel={
                  <i className="fa fa-chevron-left text-merah"></i>
                }
                nextLabel={<i className="fa fa-chevron-right text-merah"></i>}
                breakLabel={<a className="text-merah">...</a>}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                forcePage={currentPage}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
          <div
            style={{
              display: "block",
              padding: "20px 0",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                float: "left",
                fontSize: "14px",
              }}
            >
              <label>
                Menampilkan{" "}
                <strong className="text-merah">{currentPageData.length}</strong>{" "}
                dari <strong className="text-merah">{data.length}</strong> Data
              </label>
            </div>
          </div>
        </>
      )}
    </>
  );
}
