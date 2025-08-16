import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; // Tetap gunakan untuk styling kustom yang minim

const LandingPage = () => {
    return (
        <div className="container my-5"> {/* 'my-5' untuk margin vertikal */}
            <h1 className="text-center mb-4">Pilih Halaman</h1>
            <div className="row justify-content-center">
                {/* Card 1: Major Incident Report */}
                <div className="col-md-5 col-sm-10 mb-4">
                    <Link to="/mir-form" className="card-link">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <i className="bi bi-file-earmark-bar-graph display-4 mb-3"></i>
                                <h3 className="card-title">Major Incident Report</h3>
                                <p className="card-text">Buat laporan insiden utama secara cepat dan efisien.</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Card 2: Call Tree */}
                <div className="col-md-5 col-sm-10 mb-4">
                    <Link to="/call-tree" className="card-link">
                        <div className="card h-100 text-center">
                            <div className="card-body">
                                <i className="bi bi-diagram-3 display-4 mb-3"></i>
                                <h3 className="card-title">Call Tree</h3>
                                <p className="card-text">Lihat bagan hierarki untuk menghubungi tim terkait.</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;