import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import LoginPage from "./components/page/LoginPage.jsx";
import Middleware from "./components/common/Middleware.jsx";
import Layout from "./components/common/Layout.jsx";
import ProfilPage from "./components/page/ProfilPage.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const savedTheme = localStorage.getItem("theme");
if (
  savedTheme === "dark" ||
  (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Middleware>
                  <App />
                </Middleware>
              }
            />
            <Route
              path="/profil"
              element={
                <Middleware>
                  <ProfilPage />
                </Middleware>
              }
            />
          </Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
