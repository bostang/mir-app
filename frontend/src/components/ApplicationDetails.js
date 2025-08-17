// src/components/ApplicationDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Pastikan sudah diimpor

const ApplicationDetails = () => {
    const { appId } = useParams();
    const [appData, setAppData] = useState(null);

    useEffect(() => {
        const loadAppData = async () => {
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            try {
                // Gunakan URL absolut untuk memanggil API backend
                const response = await fetch(`${backendUrl}/api/applications/${appId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                // Set data yang diterima dari backend
                setAppData(data);
                
            } catch (error) {
                console.error("Gagal memuat data:", error);
                setAppData(null); // Set ke null jika gagal
            }
        };

        loadAppData();
    }, [appId]);

    // Tampilkan pesan "Memuat data..." atau jika data tidak ditemukan
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
                    
                    {/* Container untuk tombol-tombol baru */}
                    <div className="d-flex flex-wrap mt-3">
                        {/* Tombol Teams War Room */}
                        {appData.teamsLink && (
                            <a href={appData.teamsLink} className="btn btn-primary me-2 mb-2" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-people me-1"></i> Teams War Room
                            </a>
                        )}
    
                        {/* Tombol Dokumen Call Tree */}
                        {appData.callTreeDoc && (
                            <a href={appData.callTreeDoc} className="btn btn-info me-2 mb-2" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-file-earmark-pdf me-1"></i> Dokumen Call Tree
                            </a>
                        )}
    
                        {/* Tombol Dokumen AOD */}
                        {appData.aodDoc && (
                            <a href={appData.aodDoc} className="btn btn-warning me-2 mb-2" target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-file-earmark-pdf me-1"></i> Dokumen AOD
                            </a>
                        )}
                    </div>
                    
                    {/* Tombol Kembali */}
                    <Link to="/call-tree" className="btn btn-secondary mt-3">
                        <i className="bi bi-arrow-left"></i> Kembali ke Daftar Aplikasi
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetails;