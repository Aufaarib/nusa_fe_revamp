import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLaporan } from "../../../api/Laporan";
import { Header } from "../../../components";
import { DataTablesFinanceReport } from "../../../components/DataTables";

export default function ListLaporan() {
  const [data, setData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [monthFilter, setMonthFilter] = useState(
    localStorage.getItem("MonthFilter") == null
      ? "07"
      : localStorage.getItem("MonthFilter")
  );
  const [tipeFilter, setTipeFilter] = useState(
    localStorage.getItem("TipeFilter") == null
      ? "K"
      : localStorage.getItem("TipeFilter")
  );
  const [yearFilter, setYearFilter] = useState(
    localStorage.getItem("YearFilter") == null
      ? "2023"
      : localStorage.getItem("YearFilter")
  );
  const [filterMonth, setFilterMonth] = useState(
    localStorage.getItem("FilterMonth") == null
      ? "false"
      : localStorage.getItem("FilterMonth")
  );
  const [filterTipe, setFilterTipe] = useState(
    localStorage.getItem("FilterTipe") == null
      ? "false"
      : localStorage.getItem("FilterTipe")
  );
  const [filterYear, setFilterYear] = useState(
    localStorage.getItem("FilterYear") == null
      ? "false"
      : localStorage.getItem("FilterYear")
  );
  const navigate = useNavigate();

  localStorage.setItem("MonthFilter", monthFilter);
  localStorage.setItem("TipeFilter", tipeFilter);
  localStorage.setItem("YearFilter", yearFilter);
  localStorage.setItem("FilterMonth", filterMonth);
  localStorage.setItem("FilterTipe", filterTipe);
  localStorage.setItem("FilterYear", filterYear);

  const handleMonthFilter = (event) => {
    const val = event.target.value;
    setMonthFilter(val);
  };

  const handleYearFilter = (event) => {
    const val = event.target.value;
    setYearFilter(val);
  };

  const handleTipeFilter = (event) => {
    const val = event.target.value;
    setTipeFilter(val);
  };

  let filteredItems = data;
  let filteredMonth = null;
  let filteredTipe = null;
  let filteredYear = null;

  if (data !== null) {
    filteredItems = data.filter((data) =>
      data.description.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filterYear === "true") {
      filteredYear = data.filter(
        (data) => moment(data.createdAt).format("YYYY") === yearFilter
      );

      filteredItems = filteredYear.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterMonth === "true") {
      filteredMonth = data.filter(
        (data) => moment(data.createdAt).format("MM") === monthFilter
      );

      filteredItems = filteredMonth.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (filterTipe === "true") {
      filteredTipe = data.filter((data) => data.type === tipeFilter);

      filteredItems = filteredTipe.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    if (
      filterYear === "true" &&
      filterMonth === "true" &&
      filterTipe === "true"
    ) {
      filteredMonth = filteredYear.filter(
        (data) => moment(data.createdAt).format("MM") === monthFilter
      );
      filteredTipe = filteredMonth.filter((data) => data.type === tipeFilter);
      filteredItems = filteredTipe.filter((data) =>
        data.description.includes(filterText.toLowerCase())
      );
    } else if (filterYear === "true" && filterMonth === "true") {
      filteredMonth = filteredYear.filter(
        (data) => moment(data.createdAt).format("MM") === monthFilter
      );
      filteredItems = filteredMonth.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    } else if (filterMonth === "true" && filterTipe === "true") {
      filteredTipe = filteredMonth.filter((data) => data.type === tipeFilter);
      filteredItems = filteredTipe.filter((data) =>
        data.description.toLowerCase().includes(filterText.toLowerCase())
      );
    }
  }

  console.log("sdadad ===", filteredMonth);
  console.log("sdadsadad ===", filteredTipe);
  console.log("0 ===", filteredItems);

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
      cell: (data) => <div>{moment(data.createdAt).format("DD-MM-YYYY")}</div>,
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
        />
      </div>
    </>
  );
}
