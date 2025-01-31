import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.tsx";
import AOS from "aos";
import Login from "./pages/Login.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import "./style/index.css";
import "aos/dist/aos.css";
import { Toaster } from "sonner";
import NotFound from "./pages/NotFound.tsx";
import Callback from "./utils/googleCallbackUtil.tsx";
import { Analytics } from "@vercel/analytics/react";

AOS.init();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />
      <Route path="/dashboard/:userType" element={<DashboardLayout />} />
      <Route
        path="/dashboard/:userType/:subscreen"
        element={<DashboardLayout />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster />
    <Analytics />
  </BrowserRouter>
);
