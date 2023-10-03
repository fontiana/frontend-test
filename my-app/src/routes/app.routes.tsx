import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Dashboard } from "../views/Dashboard";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
