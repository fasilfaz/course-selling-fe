import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";

 
let instructorSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6),
}).required();
const Signin = () => {

    const navigate = useNavigate();

    const { 
         register,
         handleSubmit,
        formState: {errors},
     } = useForm({resolver : yupResolver(instructorSchema)});

    const onSubmit = async (data) => {
      const res =  await axios.post(
        "http://localhost:3000/api/v1/instructor/signin",
         data,
         {
            withCredentials: true,
         
         },
        );

    if (res.data.message === "Logged in!") {
      navigate("/admin/dashboard", { replace: true });
    }
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-2 rounded-md border p-6">
                <input
                    {...register("email")}
                    placeholder="email"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"/>
                {errors.email && <p>{errors.email.message}</p>}
                <input
                    {...register("password")}
                    placeholder="password"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"/>
                {errors.password && <p>{errors.password.message}</p>}
                <input type="submit" className="rounded-md bg-blue-500 py-1 text-white" />
                <p>
                    Instructor not created yet{" "}
                    <Link to="/instructor/signup" className="text-blue-500 underline">
                         Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Signin;
