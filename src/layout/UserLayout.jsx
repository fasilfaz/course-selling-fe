import { Outlet } from "react-router-dom";
import UserNavbar from "../components/navbar/UserNavbar";

const UserLayout = () => {
  return (
    <div>
      <nav>
        <UserNavbar />
      </nav>
      <Outlet />
    </div>
  );
};

export default UserLayout;