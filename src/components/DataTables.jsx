import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAdmissionRegistration } from "../api/Registrasi";

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

export function FilterComponent({
  filterText,
  onFilter,
  onClick,
  data = [],
  onChangeRows,
  valueRows,
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
        >
          <button
            style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
            className="btn-mrh"
            onClick={onClick}
          >
            <i className="fa fa-plus mr-1 mt-1"></i> {button}
          </button>
        </div>
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

export const Date = ({
  selectedStart,
  onChangeStart,
  selectedEnd,
  onChangeEnd,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <form className="grid-container">
          <label htmlFor="custom-date-picker-input">
            Tanggal Awal <span className="ml-1 text-merah">*</span>
          </label>

          <span>:</span>

          <DatePicker
            selected={selectedStart}
            onChange={onChangeStart}
            className="custom-date-picker" // Add custom class name
            dateFormat="yyyy-MM-dd" // Set date format
            calendarClassName="custom-date-picker-calendar" // Set calendar class name
            popperPlacement="bottom" // Set calendar position
          />
        </form>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <form className="grid-container">
          <label htmlFor="custom-date-picker-input">
            Tanggal Akhir <span className="ml-1 text-merah">*</span>
          </label>

          <span>:</span>

          <DatePicker
            selected={selectedStart}
            onChange={onChangeStart}
            className="custom-date-picker" // Add custom class name
            dateFormat="yyyy-MM-dd" // Set date format
            calendarClassName="custom-date-picker-calendar" // Set calendar class name
            popperPlacement="bottom" // Set calendar position
          />
        </form>
      </div>
    </div>
  );
};

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
              className="btn-mrh"
              onClick={onClickActivate}
            >
              {buttonActivate}
            </button>
            <button
              style={{ fontSize: "12px", width: "auto", padding: "2px 10px" }}
              className="btn-mrh"
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

export function FilterComponentWithoutButton({
  filterText,
  onFilter,
  data = [],
  onChangeValidation,
  valueValidation,
  valueSteps,
  onChangeSteps,
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
              <option
                style={{ backgroundColor: "gray" }}
                className="text-putih"
                disabled
              >
                Filter Status Pendaftaran :
              </option>
              <option value="valid">Terverifikasi</option>
              <option value="inreview">Belum Terverifikasi</option>
            </select>
            {valueValidation === "inreview" && (
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
                <option
                  style={{ backgroundColor: "gray" }}
                  className="text-putih"
                  disabled
                >
                  Filter Status Tahapan :
                </option>
                <option value="valid">Lengkap</option>
                <option value="inreview">Menunggu Verifikasi</option>
                <option value="invalid">Tidak Sesuai</option>
              </select>
            )}
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

  // console.log("KOLLAAOOOO === ", descSort);

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
      <FilterComponentActivateAdmission
        data={data}
        // onChangeRows={handleItemsPerPageChange}
        // valueRows={itemsPerPage}
        filterText={filterText}
        onFilter={onFilter}
        onClickCreatePhase={onClickCreatePhase}
        onClickActivate={onClickActivate}
        buttonActivate={buttonActivate}
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
  Approve,
  Deny,
  buttonNegative,
  buttonPositive,
  setTest,
  setEducationalPayment,
}) {
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
        {status == 0 ? (
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "24px" }}>Loading...</h1>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
}

export function DataTablesPMBWithoutButton({
  columns,
  status,
  data,
  defaultSortFieldId,
  filterText,
  onFilter,
  onChangeValidation,
  valueValidation,
  onChangeSteps,
  valueSteps,
  setData,
  setSts,
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
    console.log("PAAD", selected);
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

  // console.log("DATA === ", data);

  return (
    <>
      <FilterComponentWithoutButton
        data={data}
        filterText={filterText}
        onFilter={onFilter}
        onChangeValidation={handleFilterStatusValidation}
        valueValidation={valueValidation}
        valueSteps={valueSteps}
        onChangeSteps={handleFilterStatusSteps}
        dataLength={data.length}
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

  // console.log("KOLLAAOOOO === ", descSort);

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
        button={buttontxt}
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
