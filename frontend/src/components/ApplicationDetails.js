import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FloatingButtons.css';
import './ApplicationDetails.css'; // Pastikan file CSS ini ada dan diimpor

const ApplicationDetails = () => {
    const { appId } = useParams();
    const [appData, setAppData] = useState(null);
    const [picData, setPicData] = useState([]);
    const [showPicTable, setShowPicTable] = useState(false);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        const loadAppData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/applications/${appId}`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setAppData(data);
            } catch (error) {
                console.error("Gagal memuat data:", error);
                setAppData(null);
            }
        };
        loadAppData();
    }, [appId, backendUrl]);

    const handleCopyWarroomLink = () => {
        if (appData && appData.warroomLink) {
            navigator.clipboard.writeText(appData.warroomLink)
                .then(() => alert("Link Warroom berhasil disalin!"))
                .catch(err => console.error("Gagal menyalin link:", err));
        }
    };

    const handleTogglePic = async () => {
        if (!showPicTable) {
            try {
                const response = await fetch(`${backendUrl}/api/applications/${appId}/pics`);
                if (!response.ok) {
                    setPicData([]); // Jika tidak ada data PIC
                } else {
                    const data = await response.json();
                    setPicData(data);
                }
                setShowPicTable(true);
            } catch (error) {
                console.error("Gagal memuat data PIC:", error);
                setPicData([]);
                setShowPicTable(true);
            }
        } else {
            setShowPicTable(false);
        }
    };

    if (!appData) {
        return <div className="container my-5 text-center">Data aplikasi tidak ditemukan atau sedang dimuat...</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Detail Aplikasi</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{appData['Nama Aplikasi']}</h5>
                    <p className="card-text"><strong>Application ID:</strong> {appData['Application ID']}</p>
                    <p className="card-text"><strong>Business Owner:</strong> {appData['Business Owner']}</p>
                    <p className="card-text"><strong>System Owner:</strong> {appData['System Owner']}</p>
                    <p className="card-text"><strong>Description:</strong> {appData['Description/Definition']}</p>
                    
                    <div className="d-flex flex-wrap mt-3">
                        <Link to="/call-tree" className="btn btn-secondary mt-3">
                            <i className="bi bi-arrow-left"></i> Kembali ke Daftar Aplikasi
                        </Link>
                    </div>
                </div>
            </div>

            {showPicTable && (
                <div className="pic-table-container mt-4">
                    <h2 className="mb-3">Daftar PIC</h2>
                    {picData.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Nama</th>
                                        <th>Jabatan</th>
                                        <th>Role</th>
                                        <th>No. Telp</th>
                                        <th>Email</th>
                                        <th>Grup</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {picData.map((pic, index) => (
                                        <tr key={index}>
                                            <td>{pic.Nama}</td>
                                            <td>{pic.Jabatan}</td>
                                            <td>{pic.Role}</td>
                                            <td>{pic['No Telp']}</td>
                                            <td>{pic.Email}</td>
                                            <td>{pic.Grup}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Tidak ada data PIC yang tersedia.</p>
                    )}
                </div>
            )}

            <div className="floating-btn-container">
                <button 
                    className="btn btn-primary floating-btn" 
                    title="Daftar PIC" 
                    onClick={handleTogglePic}
                >
                    <i className="bi bi-person-fill"></i>
                </button>

                {appData.warroomLink && (
                    <button 
                        onClick={handleCopyWarroomLink} 
                        className="btn btn-info floating-btn" 
                        title="Salin Link Warroom"
                    >
                        <i className="bi bi-people"></i>
                    </button>
                )}

                {appData.aodDocLink && (
                    <a 
                        href={appData.aodDocLink} 
                        className="btn btn-warning floating-btn" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        title="Dokumen AOD"
                    >
                        <i className="bi bi-file-earmark-pdf"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetails;