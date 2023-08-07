import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBank } from "../../api/Bank";
import { Header } from "../../components";
import { DataTablesPMB } from "../../components/DataTables";
import { getAdmission, updateStatusAdmission } from "../../api/SetupPmb";
import { AlertUbahStatus } from "../../components/ModalPopUp";

const PembagianKelas = () => {
    const [data, setData] = useState([]);
    const [isOpenStatus, setisOpenStatus] = useState(false);
    const [isOpenDelete, setisOpenDelete] = useState(false);
    const [sts, setSts] = useState(undefined);
    const [deleteId, setDeleteId] = useState("");
    const [desc_nama, setDesc_nama] = useState("");
    const [filterText, setFilterText] = useState("");
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState('');
    const path = "/admin/list-bank";

    let filteredItems = data;
    const kelas = [
        { label: 'Kelas 1', value: 'kelas1' },
        { label: 'Kelas 2', value: 'kelas2' },
        { label: 'Kelas 3', value: 'kelas3' },
    ];

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    if (data !== null) {
        filteredItems = data.filter((data) =>
            data.code.toLowerCase().includes(filterText.toLowerCase())
        );
    }

    useEffect(() => {
        getAdmission(setData, setSts);
    }, []);

    const handleStatus = (code, status) => {
        AlertUbahStatus(code, code, status, onUpdateStatus);

    };



    const onUpdateStatus = (code) => {
        updateStatusAdmission(setSts, code, setData);

    };
    const [selectedRows, setSelectedRows] = useState([]);
    const isAllRowsSelected = selectedRows.length === data.length;
    const handleSelectAll = () => {
        if (selectedRows.length === data.length) {
            setSelectedRows([]);
        } else {
            const allRowIds = data.map((row) => row.id);
            setSelectedRows(allRowIds);
        }
    };
    const handleRowSelect = (rowId) => {
        if (selectedRows.includes(rowId)) {
            setSelectedRows(selectedRows.filter((id) => id !== rowId));
        } else {
            setSelectedRows([...selectedRows, rowId]);
        }
    };

    const columns = [


        {
            name: <div onClick={handleSelectAll}>
                {isAllRowsSelected ? 'Deselect All' : 'Select All'}
            </div>,
            selector: (data) => <input
                type="checkbox"
                checked={selectedRows.includes(data.id)}
                onChange={() => handleRowSelect(data.id)}
            />,
            width: "100px",
        },
        {
            name: <div>Code</div>,
            selector: (data) => data.code,
            cell: (data) => <div>{data.code}</div>,
            width: "auto",
        },
        {
            name: <div>Tahun Ajaran</div>,
            selector: (data) => data.academicYear.name,
            cell: (data) => <div>{data.academicYear.name}</div>,
            width: "auto",
        },
        {
            name: <div>Status</div>,
            selector: (data) => data.status,
            cell: (data) => <div>{data.status == 1 ? "Aktif" : "Tidak Aktif"}</div>,
            width: "auto",
        },
        {
            name: <div>Aksi</div>,
            cell: (data) => (
                <div style={{ display: "flex", flexDirection: "row", gap: "1px" }}>
                    <button
                        className="btn-mrh ml-3 w-auto px-2"
                        title="Detail Pembayaran"
                        onClick={() => navigateAdmissionDetails(data.code)}
                    >
                        <i className="fa fa-warning" /> Detail
                    </button>
                    {data?.status === 1 && (
                        <button
                            className="btn-mrh ml-3 w-auto px-2"
                            onClick={() => handleStatus(data.code, data.status)}
                        >
                            <i className="fa fa-play mt-1 mr-1"></i> Aktif
                        </button>
                    )}
                    {data?.status === 0 && (
                        <button
                            className="btn-mrh ml-3 w-auto px-2"
                            onClick={() => handleStatus(data.code, data.status)}
                        >
                            <i className="fa fa-pause mt-1 mr-1"></i> Tidak Aktif
                        </button>
                    )}
                </div>
            ),
            ignoreRowClick: true,
            button: true,
            width: "300px",
        },
    ];

    // const navigateTambahGelombang = () => {
    //   navigate("/admin/tambah-gelombang-pmb");
    // };

    const navigateAdmissionDetails = (code) => {
        navigate("/admin/admission-detail", {
            state: {
                code: code,
            },
        });
    };

    const navigateTambahPendaftaran = () => {
        navigate("/admin/tambah-pendaftaran");
    };

    return (
        <>
            
            <Header
                home="Admin PMB"
                // prev="Bank"
                // navePrev={path}
                at="Pembagian Kelas"
                title="Pembagian Kelas"
            />
            <select value={selectedValue} onChange={handleSelectChange} style={{marginLeft : 500, marginBottom: -40}}>
                <option value="">Masukan ke kelas</option>
                {kelas.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <div style={{ marginTop: "50px" }}>
                
                <DataTablesPMB
                    columns={columns}
                    data={filteredItems}
                    onClick={navigateTambahPendaftaran}
                    onFilter={(e) => setFilterText(e.target.value)}
                    filterText={filterText}
                    buttontxt="Tambah"
                />

            </div>


        </>
    );
};
export default PembagianKelas
