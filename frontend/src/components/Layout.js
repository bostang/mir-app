// src/components/Layout.js
import React from 'react';
import bniMimLogo from '../assets/bni-mim.png';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container d-flex justify-content-center">
                    <Link to="/" className="navbar-brand">
                        <img src={bniMimLogo} alt="Logo" height="20" className="d-inline-block align-text-top me-2" />
                    </Link>
                </div>
            </nav>

            {/* Konten Halaman */}
            <div style={{ paddingTop: '60px', paddingBottom: '40px' }}>
                {children}
            </div>

            {/* Footer */}
            <footer className="bg-dark text-light text-center p-2 fixed-bottom">
                <p className="small">&copy; 2025 All Rights Reserved. Created by Bostang Palaguna</p>
            </footer>
        </div>
    );
};

export default Layout;