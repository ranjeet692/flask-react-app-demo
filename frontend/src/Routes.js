import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadFile from "./components/UploadFile";
import DataTable from "./components/DataTable";
import NotFoundPage from "./components/NotFoundPage";

function AppRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UploadFile />} />
                <Route path="/data-grid" element={<DataTable />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoute;