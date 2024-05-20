import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbar/AdminNavbar";

const AdminLayout = () => {
  return (
    <div>
      <nav>
        <AdminNavbar />
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;