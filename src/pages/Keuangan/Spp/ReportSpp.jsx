import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import { BsChevronBarLeft } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSppByStudent } from "../../../api/Spp";
import { Header } from "../../../components";
import { DataTables, DataTablesListSpp } from "../../../components/DataTables";
import { AlertPaymentProof } from "../../../components/ModalPopUp";
import { useStateContext } from "../../../contexts/ContextProvider";
import Modal from "react-modal";
import { Box, Typography } from "@mui/material";
import DataTable from "react-data-table-component";
import reportLogo from "../../../data/logoReport.png";
import moment from "moment/moment";

export default function ReportSpp() {
  const [data, setData] = useState([]);
  const [unpaidData, setUnpaidData] = useState([]);
  const [sts, setSts] = useState(undefined);
  const [filterText, setFilterText] = useState("");
  const [filterPaid, setFilterPaid] = useState(true);
  const [filterUnPaid, setFilterUnPaid] = useState(false);
  const { isLoading, setIsLoading } = useStateContext();
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openPaymentProof = (url) => {
    AlertPaymentProof(url);
  };

  useEffect(() => {
    setIsLoading(true);
    getSppByStudent(
      setData,
      setSts,
      setIsLoading,
      location.state.studentCode,
      localStorage.getItem("TA-CODE")
    );
  }, []);

  const columns = [
    {
      name: <div>No</div>,
      selector: (_row, i) => i + 1,
      width: "55px",
    },
    // {
    //   name: <div>Nama Murid</div>,
    //   cell: (data) => <div>{`${location.state.studentName}`}</div>,
    //   width: "190px",
    // },
    {
      name: <div>Jenis Pembayaran</div>,
      selector: (data) => (
        <div>
          {(data.month == 0 && data.name) ||
            (data.month == 1 && "Spp Januari") ||
            (data.month == 2 && "Spp Februari") ||
            (data.month == 3 && "Spp Maret") ||
            (data.month == 4 && "Spp April") ||
            (data.month == 5 && "Spp Mei") ||
            (data.month == 6 && "Spp Juni") ||
            (data.month == 7 && "Spp Juli") ||
            (data.month == 8 && "Spp Agustus") ||
            (data.month == 9 && "Spp September") ||
            (data.month == 10 && "Spp Oktober") ||
            (data.month == 11 && "Spp November") ||
            (data.month == 12 && "Spp Desember")}
        </div>
      ),
      width: "120px",
    },
    // {
    //   name: <div>Tahun Ajaran</div>,
    //   cell: (data) => <div>{`${data.academicYear?.name}`}</div>,
    //   width: "130px",
    // },
    {
      name: <div>Infak Bulanan</div>,
      selector: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.infaq)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Infak Ta'awun</div>,
      selector: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.taawun)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Lain-lain</div>,
      selector: (data) => (
        <div>
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(data.other)}
        </div>
      ),
      width: "auto",
    },
    {
      name: <div>Bukti Pembayaran</div>,
      selector: (data) => (
        <button
          title="Tampil Bukti Pembayaran"
          onClick={() => {
            openPaymentProof(data.invoice);
          }}
        >
          <i style={{ fontSize: "21px" }} className="fa fa-file" />
        </button>
      ),
      width: "130px",
    },
    {
      name: <div>Keterangan</div>,
      selector: (data) => <div>{data.description}</div>,
      width: "120px",
    },
    {
      name: <div>Aksi</div>,
      selector: (data) => (
        <div className="flex flex-col gap-1">
          <button
            style={{ width: "80px", padding: "2px 10px" }}
            className="btn-biru"
            title="Edit"
            onClick={() =>
              navigateUbahSpp(
                data.id,
                data.month,
                data.name,
                data.infaq,
                data.taawun,
                data.other,
                data.description
                // data.description,
                // data.invoice,
                // data.academicPeriode.id,
                // data.academicPeriode.increment,
                // data.student.code,
                // data.student.firstName
              )
            }
          >
            <i className="fa fa-edit" /> Ubah
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
      width: "130px",
    },
  ];

  const navigateTambahSpp = () => {
    navigate("/admin/tambah-spp", {
      state: {
        id: location.state.id,
        studentName: location.state.studentName,
        studentCode: location.state.studentCode,
        academicYearCode: location.state.academicYearCode,
        academicYearId: location.state.academicYearId,
        academicYearName: location.state.academicYearName,
        academicYear: location.state.academicYear,
        kelas: location.state.kelas,
      },
    });
  };

  const navigateUbahSpp = (
    id,
    month,
    name,
    infaq,
    taawun,
    other,
    description
    // periodeId,
    // increment,
    // code,
    // studentName
  ) => {
    navigate("/admin/ubah-spp", {
      state: {
        sppId: id,
        month: month,
        name: name,
        infaq: infaq,
        taawun: taawun,
        other: other,
        description: description,
        studentName: location.state.studentName,
        studentCode: location.state.studentCode,
        academicYearCode: location.state.academicYearCode,
        academicYearId: location.state.academicYearId,
        academicYearName: location.state.academicYearName,
        academicYear: location.state.academicYear,
        kelas: location.state.kelas,
      },
    });
  };

  let filteredItems = data;
  // if (data !== null) {
  //   filteredItems = data.filter((data) => data.month == 1);
  // }

  const filteredUnpaid = filteredItems.filter(
    (items) => items.description !== "Belum Lunas"
  );

  const styles = StyleSheet.create({
    viewer: {
      width: "160vh",
      height: "500px",
    },
    page: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#E4E4E4",
      padding: "80px",
      paddingTop: "10px",
    },
    section: {
      width: "200vh",
      margin: 10,
      padding: 10,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      width: "118vh",
      backgroundColor: "#fff",
      margin: 0,
      padding: "20px",
      paddingTop: "50px",
    },
    tableRow: {
      border: "1px solid grey",
      margin: 0,
      padding: 0,
      minHeight: "30px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tableCell: {
      margin: 0,
      padding: "5px",
      borderRight: "1px solid grey",
      display: "flex",
    },
    headRow: {
      margin: 0,
      padding: 0,
      display: "flex",
      textAlign: "center",
      border: "1px solid grey",
      backgroundColor: "yellow",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    headCell: {
      margin: 0,
      display: "flex",
      textAlign: "center",
      padding: "5px",
      borderRight: "1px solid grey",
    },
    col1: {
      fontWeight: "extrabold",
      display: "flex",
      textAlign: "center",
      width: "120px",
    },
    col2: {
      width: "220px",
    },
    col3: {
      width: "120px",
    },
    col4: {
      fontWeight: "light",
      width: "120px",
    },
  });

  const CustomStylesStatus = {
    content: {
      // width: "385px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      borderRadius: "8px",
      transform: "translate(-50%, -50%)",
      border: "none",
      cursor: "auto",
      padding: "0px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.5)",
      cursor: "pointer",
    },
  };

  const columnsPdf = [
    {
      style: styles.col1,
      name: "Tanggal",
      selector: (data) =>
        moment(data.createdAt).add(2, "hours").format("D/MMM/YY"),
    },
    {
      style: styles.col2,
      name: "Pembayaran",
      selector: (data) =>
        `${
          (data.month == 0 && data.name === "" ? "lain-lain" : data.name) ||
          (data.month == 1 && "Jan") ||
          (data.month == 2 && "Feb") ||
          (data.month == 3 && "Mar") ||
          (data.month == 4 && "Apr") ||
          (data.month == 5 && "Mei") ||
          (data.month == 6 && "Jun") ||
          (data.month == 7 && "Jul") ||
          (data.month == 8 && "Aug") ||
          (data.month == 9 && "Sep") ||
          (data.month == 10 && "Okt") ||
          (data.month == 11 && "Nov") ||
          (data.month == 12 && "Des")
        }`,
    },
    {
      style: styles.col4,
      name: "Infak Bulanan",
      selector: (data) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.infaq),
    },
    {
      style: styles.col4,
      name: "Infak Taawun",
      selector: (data) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.taawun),
    },
    {
      style: styles.col4,
      name: "Lain-lain",
      selector: (data) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.other),
    },
    {
      style: styles.col4,
      name: "Jumlah",
      selector: (data) =>
        new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(data.total),
    },
    {
      style: styles.col3,
      name: "Keterangan",
      selector: (data) => data.description,
    },
  ];

  return (
    <>
      <Header
        home="Admin Keuangan"
        prev="List Murid"
        navPrev={"/admin/list-spp"}
        at="Report SPP"
        title={`Data Report SPP - ${location.state.studentName} - ${
          location.state.kelas
        } - ${localStorage.getItem("TA-CODE")}`}
      />

      <div style={{ marginTop: "50px" }}>
        <DataTablesListSpp
          columns={columns}
          data={filteredUnpaid}
          onClick={navigateTambahSpp}
          onFilter={(e) => setFilterText(e.target.value)}
          filterText={filterText}
          filterPaid={filterPaid}
          setFilterPaid={setFilterPaid}
          filterUnPaid={filterUnPaid}
          setFilterUnPaid={setFilterUnPaid}
          button="Tambah Spp"
          showButton={true}
          showDownloadButton={true}
          onClickDownload={() => setIsOpen(true)}
        />
      </div>
      <div className="flex justify-start w-full">
        <Link
          to={"/admin/list-spp"}
          className="w-auto pl-0 mx-0 bg-transparent shadow-none btn-navigate hover:bg-transparent text-merah hover:text-gelap"
        >
          <BsChevronBarLeft className="text-xl m-0 mr-2 mt-0.5" /> Kembali
        </Link>
      </div>

      <Modal
        isOpen={open}
        onRequestClose={() => setIsOpen(false)}
        style={CustomStylesStatus}
        contentLabel="Modal Status"
        ariaHideApp={false}
      >
        <Box sx={{ padding: "30px", width: "auto" }}>
          <button
            className="fa fa-times float-right pb-5 text-merah text-3xl"
            onClick={() => setIsOpen(false)}
          />
          <PDFViewer style={styles.viewer}>
            <Document title={`Report Spp ${location.state.studentName}`}>
              <Page size="A3" orientation="landscape" style={styles.page}>
                <View style={styles.section}>
                  <View style={styles.table}>
                    <View
                      style={{
                        paddingLeft: "120px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingRight: "90px",
                        }}
                      >
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "40px",
                            }}
                          >
                            <Text>Nama</Text>
                            <Text>:</Text>
                            <Text>{location.state.studentName}</Text>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "54px",
                            }}
                          >
                            <Text>NIM</Text>
                            <Text>:</Text>
                            <Text></Text>
                          </View>
                          <View
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "43px",
                            }}
                          >
                            <Text>Kelas</Text>
                            <Text>:</Text>
                            <Text>{location.state.kelas}</Text>
                          </View>
                        </View>
                        <Image style={{ width: "100px" }} src={reportLogo} />
                      </View>
                    </View>
                    {/* Table Header */}
                    <View>
                      <View style={styles.headRow}>
                        {columnsPdf.map((col, index) => (
                          <View
                            key={index}
                            style={[styles.headCell, col.style]}
                          >
                            <Text>{col.name}</Text>
                          </View>
                        ))}
                      </View>
                      {/* Table Rows */}
                      {data
                        .filter((items) => items.description !== "Belum Lunas")
                        .map((row, rowIndex) => (
                          <View key={rowIndex} style={styles.tableRow}>
                            {columnsPdf.map((col, colIndex) => (
                              <View
                                key={colIndex}
                                style={[styles.tableCell, col.style]}
                              >
                                <Text>{col.selector(row)}</Text>
                              </View>
                            ))}
                          </View>
                        ))}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          paddingTop: "10px",
                          paddingLeft: "71vh",
                        }}
                      >
                        <Text>Total</Text>
                        <Text
                          style={{
                            paddingLeft: "61px",
                          }}
                        >
                          :
                        </Text>
                        <Text>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(
                            data.reduce((acc, obj) => acc + obj.total, 0)
                          )}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Text style={{ paddingBottom: "10px" }}>
                          Catatan :{" "}
                        </Text>
                        <Text>
                          1. Pembayaran SPP (Infak Bulanan) beserta Infak Taawun
                          setiap bulannya paling telat adalah tanggal 10.
                        </Text>
                        <Text>
                          2. Pembayaran dapat di transfer melalui rekening Bank
                          DKI Syariah 710 215 9000 3 a/n Yayasan Adab Insan
                          Mulia.
                        </Text>
                        <Text>
                          3. Segera kirimkan bukti transfer melalui wa ke nomor
                          0812 980 1108.
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Box>
      </Modal>
    </>
  );
}
