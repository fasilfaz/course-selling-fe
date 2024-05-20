import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";


 
let userSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().min(6),
}).required();

const Signup = () => {

    
    const navigate = useNavigate();
    const {
         register, 
         handleSubmit,
         formState: {errors},
     } = useForm({resolver : yupResolver(userSchema)}
    );
 
    const onSubmit = async (data) => {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/v1/user/signup",
            data,
            {
                withCredentials: true,
              
            },
            
          );
          console.log(res.data);
          const resData = await res.data;
          if (resData === "signned in!") {
            navigate("/user/dashboard");
          }
        } catch (error) {
          console.log(error);
        }
      };
    

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={handleSubmit(onSubmit)}
             className="flex flex-col gap-y-3 p-8 shadow-md">
                <input {...register("firstName")} 
                placeholder="first name" 
                className="px-1.5 py-1 border rounded-md text-black-100 " />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <input {...register("lastName")} 
                placeholder="last name" 
                className="px-1.5 py-1 border rounded-md text-black-100" />
                {errors.lastName && <p>{errors.lastName.message}</p>}
                <input {...register("email")} 
                placeholder="email" 
                className="px-1.5 py-1 border rounded-md text-black-100" />
                {errors.email && <p>{errors.email.message}</p>}
                <input {...register("password")} 
                placeholder="password" 
                type="password" 
                className="px-1.5 py-1 border rounded-md text-black-100" />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="submit" className="rounded-md bg-blue-500 text-white hover:bg-blue-400" />
                <p>
                    User already exist{""}
                    <Link to="/user/signin" className="text-blue-500 underline">
                         Signin
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
