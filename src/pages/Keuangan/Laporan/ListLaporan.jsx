import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLaporan } from "../../../api/Laporan";
import { Header } from "../../../components";
import {
  DataTablePengeluaran,
  DataTablesFinanceReport,
} from "../../../components/DataTables";

export default function ListLaporan() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleTypeFilter = (event) => {
    const val = event.target.value;
    setFilterType(val);
  };

  let filteredType = data;
  let filteredItems = null;
  let filteredDate = null;
  if (data !== null) {
    if (filterType !== "all") {
      filteredType = data.filter((data) => data.type === filterType);
    }

    if (startDate.length !== 0) {
      if (endDate.length !== 0) {
        filteredDate = filteredType.filter(
          (data) => data.createdAt >= startDate && data.createdAt <= endDate
        );
        filteredItems = filteredDate.filter((data) =>
          data.description.toLowerCase().includes(filterText.toLowerCase())
        );
      } else {
        filteredDate = filteredType.filter(
          (data) => data.createdAt >= startDate
        );
        filteredItems = filteredDate.filter((data) =>
          data.description.toLowerCase().includes(filterText.toLowerCase())
        );
      }
    } else {
      filteredItems = filteredType.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }
  useEffect(() => {
    getLaporan(setData, setSts);
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    {
      name: <div>Tanggal</div>,
      cell: (data) => <div>{moment(data.createdAt).format("YYYY-MM-DD")}</div>,
      width: "240px",
    },
    {
      name: <div>Tipe</div>,
      cell: (data) => <div>{data.type === "K" ? "Kredit" : "Debit"}</div>,
      width: "240px",
    },
    {
      name: <div>Deskripsi</div>,
      cell: (data) => <div>{data.description}</div>,
      width: "auto",
    },
    {
      name: <div>Jumlah</div>,
      cell: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.amount)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Sisa Saldo</div>,
      cell: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.balance)}
        </div>
      ),
      width: "auto",
    },
  ];

  return (
    <>
      <Header
        home="Admin Keuangan"
        // prev="Bank"
        // navePrev={path}
        at="Laporan Keuangan"
        title="Data Laporan Keuangan"
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesFinanceReport
          columns={columns}
          data={filteredItems}
          // onClick={navigateTambahPengeluaran}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          onChange={handleTypeFilter}
          value={filterType}
          selectedStart={startDate}
          onChangeStart={(e) => setStartDate(e.element.value)}
          selectedEnd={endDate}
          onChangeEnd={(e) => setEndDate(e.element.value)}
        />
        {/* <DataTablesFinanceReport
          columns={columns}
          data={filteredItems}
          filterText={filterText}
          filterTipe={filterTipe}
          filterMonth={filterMonth}
          filterYear={filterYear}
          setFilterTipe={setFilterTipe}
          setFilterMonth={setFilterMonth}
          setFilterYear={setFilterYear}
          onChangeMonth={handleMonthFilter}
          valueMonth={monthFilter}
          onChangeTipe={handleTipeFilter}
          valueTipe={tipeFilter}
          onChangeYear={handleYearFilter}
          valueYear={yearFilter}
          onFilter={(e) => setFilterText(e.target.value)}
          createdAt={data}
        /> */}
      </div>
    </>
  );
}
