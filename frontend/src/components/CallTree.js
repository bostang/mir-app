// src/components/CallTree.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CallTree.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CallTree = () => {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredApplications, setFilteredApplications] = useState([]);

    useEffect(() => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        // Fungsi untuk memuat data dari API
        const loadApplications = async () => {
            try {
                // Ganti URL relatif menjadi URL absolut
                const response = await fetch(`${backendUrl}/api/applications`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                setApplications(data);
                setFilteredApplications(data);
            } catch (error) {
                console.error("Gagal memuat data aplikasi:", error);
            }
        };

        loadApplications();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const filterData = applications.filter(app => {
            const searchLower = searchTerm.toLowerCase();
            return (
                (app['Nama Aplikasi'] && String(app['Nama Aplikasi']).toLowerCase().includes(searchLower)) ||
                (app['Application ID'] && String(app['Application ID']).toLowerCase().includes(searchLower)) ||
                (app['Business Owner'] && String(app['Business Owner']).toLowerCase().includes(searchLower)) ||
                (app['System Owner'] && String(app['System Owner']).toLowerCase().includes(searchLower))
            );
        });
        setFilteredApplications(filterData);
    }, [searchTerm, applications]);


    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Call Tree Page</h1>
            <p className="text-center">Daftar Aplikasi dan Penanggung Jawab</p>

            <div className="mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Cari berdasarkan Nama Aplikasi, Application ID, atau Business Owner..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>No</th>
                            <th>Application ID</th>
                            <th>Nama Aplikasi</th>
                            <th>Business Owner</th>
                            <th>System Owner</th>
                            <th>Criticality</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredApplications.map((app, index) => (
                            <tr key={index}>
                                <td>{app['No']}</td>
                                <td>{app['Application ID']}</td>
                                <td>{app['Nama Aplikasi']}</td>
                                <td>{app['Business Owner']}</td>
                                <td>{app['System Owner']}</td>
                                <td>{app['Criticality']}</td>
                                <td>
                                    <Link to={`/call-tree/${app['Application ID']}`} className="btn btn-primary btn-sm">
                                        <i className="bi bi-box-arrow-up-right"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CallTree;