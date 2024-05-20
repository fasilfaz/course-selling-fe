import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const HomeLayout = () => {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <Outlet />
    </>
  );
};

export default HomeLayout;