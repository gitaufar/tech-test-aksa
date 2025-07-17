import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar";


export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Navbar />}
      <Outlet />
    </>
  );
}