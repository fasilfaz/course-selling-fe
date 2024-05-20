import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EasyMethod = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get('token');
  console.log(token);
//   if (token === undefined) {
//     navigate("/", { replace: true });
//   }
  useEffect(() => {
    if(token === null || token === undefined){
      navigate("/")
    }
  });
  return children;
};

export default EasyMethod;