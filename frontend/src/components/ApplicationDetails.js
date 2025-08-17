import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ApplicationDetails.css';

const ApplicationDetails = () => {
    const { appId } = useParams();
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const loadAppData = async () => {
            try {
                // Gunakan URL absolut untuk memanggil API backend
                const response = await fetch(`${backendUrl}/api/applications/${appId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAppData(data);
                
            } catch (error) {
                console.error("Gagal memuat data:", error);
                setAppData(null);
            }
        };

        loadAppData();
    }, [appId]);

    const handleCopyWarroomLink = () => {
        if (appData && appData.warroomLink) {
            navigator.clipboard.writeText(appData.warroomLink)
                .then(() => {
                    alert("Link Warroom berhasil disalin!");
                })
                .catch(err => {
                    console.error("Gagal menyalin link:", err);
                });
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

            <div className="floating-btn-container">
                <button className="btn btn-primary floating-btn" title="Daftar PIC">
                    <i className="bi bi-person-fill"></i>
                </button>

                {appData.warroomLink && (
                    <button onClick={handleCopyWarroomLink} className="btn btn-info floating-btn" title="Salin Link Warroom">
                        <i className="bi bi-people"></i>
                    </button>
                )}

                {appData.aodDocLink && (
                    <a href={appData.aodDocLink} className="btn btn-warning floating-btn" target="_blank" rel="noopener noreferrer" title="Dokumen AOD">
                        <i className="bi bi-file-earmark-pdf"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ApplicationDetails;