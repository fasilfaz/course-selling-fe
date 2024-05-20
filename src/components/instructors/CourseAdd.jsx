import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup
  .object({
    title: yup.string().required(),
    description: yup.string().required(),
    price: yup.string(),
    instructorEmail: yup.string().required(),
    image: yup.mixed().required(),
}).required();

export default function CourseAdd() {
  const [instructors, setInstructors] = useState([]);
  useEffect(() => {
    const instructorList = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/instructor/get-instructors"
      );
      const data =res.data;
      console.log(data);
      setInstructors(data);
    };
    instructorList();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
        const requestBody = {
        title: data.title,
        description: data.description,
        price: data.price,
        instructorEmail: data.instructorEmail,
        image: data.image[0], // assuming data.image is a File object
        };
        try {
            const res = await axios.post(
                "http://localhost:3000/api/v1/instructor/add-courses",
                requestBody,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );
            console.log("Course added successfully:", res.data);
        } catch (error) {
          console.error("Error adding course:", error);
        }
    };

  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2 rounded-md border p-6"
      >
        <input
          {...register("title")}
          type="text"
          placeholder="title"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          {...register("description")}
          type="text"
          placeholder="description"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.description && <p>{errors.description.message}</p>}
        <input
          {...register("price")}
          type="text"
          placeholder="price"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <input
          {...register("image")}
          type="file"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.price && <p>{errors.price.message}</p>}
        <select {...register("instructorEmail")}>
          {instructors.map((instructor, index) => (
            <option key={index} value={instructor.email}>
              {instructor.email}
            </option>
          ))};
        </select>
        <input
          type="submit"
          className="rounded-md bg-blue-500 py-1 text-white"
        />
      </form>
    </div>
  );
}