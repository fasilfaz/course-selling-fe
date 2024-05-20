import { Link } from "react-router-dom";

const UserNavbar = () => {
  const navLinks = [
    {
      path: "/contact-us",
      value: "Contact Us",
    },
    {
      path: "/about-us",
      value: "About Us",
    },
  ];
  return (
    <div>
      <h1>Logo</h1>
      <ul>
        {navLinks.map((link, index) => (
          <Link key={index} to={link.path}>
            <li>{link.value}</li>
          </Link>
        ))};
      </ul>
    </div>
  );
};

export default UserNavbar;