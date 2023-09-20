import moment from "moment/moment";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdOutlineCancel } from "react-icons/md";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { useStateContext } from "../contexts/ContextProvider";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

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

export function FilterComponent({ filterText, onFilter, onClick, button }) {
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
          <button
            style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
            className="btn-hijau"
            onClick={onClick}
          >
            <i className="fa fa-plus mr-1 mt-1"></i> {button}
          </button>
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
            placeholder="Cari Nama Barang..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <label className="ml-2 text-merah font-bold">Filter Tipe : </label>
        <select
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            width: "auto",
            height: "30px",
            fontSize: "12px",
            padding: "5px",
            marginLeft: "5px",
          }}
          value={value}
          onChange={onChange}
        >
          <option value="all">Semua</option>
          <option value="operasional">Operasional</option>
          <option value="pendidikan">Pendidikan</option>
        </select>
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
      <div className="flex mb-3 px-48 gap-5 justify-between items-center font-bold text-merah">
        <div className="w-96 mt-5">
          <label>Filter Tanggal : </label>
        </div>
        <DatePickerComponent
          floatLabelType="Auto"
          value={selectedStart}
          change={onChangeStart}
          format="yyy-MM-dd"
          placeholder="Mulai (YYYY-MM-DD)"
        />
        <label className="mt-5">-</label>
        <DatePickerComponent
          floatLabelType="Auto"
          value={selectedEnd}
          change={onChangeEnd}
          format="yyy-MM-dd"
          placeholder="Sampai (YYYY-MM-DD)"
        />
      </div>
    </>
  );
}

export function FilterComponentSpp({
  filterText,
  onFilter,
  onClick,
  button,
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
            placeholder="Cari Nama Barang..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <button
          onClick={() => {
            if (filterPaid === false) {
              setFilterPaid(true);
            } else setFilterPaid(false);
          }}
          className={
            filterPaid === true
              ? "ml-2 btn-modal-filter-true"
              : "ml-2 btn-modal-filter-false"
          }
        >
          Tampilkan Telah Membayar{" "}
          {filterPaid === true && <i className="fa fa-check text-hijau" />}
        </button>

        <button
          onClick={() => {
            if (filterUnPaid === false) {
              setFilterUnPaid(true);
            } else setFilterUnPaid(false);
          }}
          className={
            filterUnPaid === true
              ? "ml-2 btn-modal-filter-true"
              : "ml-2 btn-modal-filter-false"
          }
        >
          Tampilkan Belum Membayar{" "}
          {filterUnPaid === true && <i className="fa fa-check text-hijau" />}
        </button>
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
            placeholder="Cari Nama Barang..."
            value={filterText}
            onChange={onFilter}
          />
          <i style={{ padding: "7px 6px" }} className="fa fa-search" />
        </div>
        <label className="ml-2 text-merah font-bold">Filter Tipe : </label>
        <select
          style={{
            border: "1px solid grey",
            borderRadius: "10px",
            width: "auto",
            height: "30px",
            fontSize: "12px",
            padding: "5px",
            marginLeft: "5px",
          }}
          value={value}
          onChange={onChange}
        >
          <option value="all">Semua</option>
          <option value="K">Kredit</option>
          <option value="D">Debit</option>
        </select>
      </div>
      <div className="flex mb-3 px-48 gap-5 justify-between items-center font-bold text-merah">
        <div className="w-96 mt-5">
          <label>Filter Tanggal : </label>
        </div>
        <DatePickerComponent
          floatLabelType="Auto"
          value={selectedStart}
          change={onChangeStart}
          format="yyy-MM-dd"
          placeholder="Mulai (YYYY-MM-DD)"
          strictMode
        />
        <label className="mt-5">-</label>
        <DatePickerComponent
          floatLabelType="Auto"
          value={selectedEnd}
          change={onChangeEnd}
          format="yyy-MM-dd"
          placeholder="Sampai (YYYY-MM-DD)"
          strictMode
        />
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
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "24px" }}>Loading...</h1>
          </div>
        ) : data ? (
          <DataTable
            columns={columns}
            customStyles={CustomStylesTable}
            data={currentPageData}
            defaultSortAsc={false}
            defaultSortFieldId={defaultSortFieldId}
          />
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
  buttontxt,
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
        button={buttontxt}
      />
      {data ? (
        <div>
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "24px" }}>Loading...</h1>
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
        button="Tambah"
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
          <div>
            <DataTable
              columns={columns}
              customStyles={CustomStylesTable}
              data={data}
              defaultSortAsc={false}
              defaultSortFieldId={defaultSortFieldId}
            />
          </div>
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
