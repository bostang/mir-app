// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentForm from './components/IncidentForm';
import LandingPage from './components/LandingPage';
import CallTree from './components/CallTree';
import Layout from './components/Layout';
import ApplicationDetails from './components/ApplicationDetails'; // Impor komponen baru

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <LandingPage />
                        </Layout>
                    }
                />
                <Route
                    path="/mir-form"
                    element={
                        <Layout>
                            <IncidentForm />
                        </Layout>
                    }
                />
                <Route
                    path="/call-tree"
                    element={
                        <Layout>
                            <CallTree />
                        </Layout>
                    }
                />
                {/* Tambahkan rute dinamis untuk halaman detail aplikasi */}
                <Route
                    path="/call-tree/:appId"
                    element={
                        <Layout>
                            <ApplicationDetails />
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;