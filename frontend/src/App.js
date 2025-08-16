// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IncidentForm from './components/IncidentForm';
import LandingPage from './components/LandingPage';
import CallTree from './components/CallTree';
import Layout from './components/Layout';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* LandingPage sekarang juga menggunakan Layout */}
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
            </Routes>
        </Router>
    );
};

export default App;