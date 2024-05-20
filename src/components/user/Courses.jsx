import axios from "axios";
import { useEffect, useState } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourse = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/instructor/get-courses",
        );
        const data = await res.data;
        console.log(data);
        setCourses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCourse();
  }, []);

  const paymentHandler = async (event, courseId) => {
    // console.log(courseId);

    const selectedCourse = courses.find((course) => course._id === courseId);

    console.log("select", selectedCourse);

    const response = await axios.post(
      "http://localhost:3000/api/v1/payment/order",
      { amount: selectedCourse.price },
    );

    const order = await response.data.data;

    console.log(order);

    const option = {
      key: import.meta.env.VITE_SOME_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "Anu",
      description: "Test Transaction",
      order_id: order.id,
      handler: async function (response) {
        const body = { ...response };
        console.log(body);

        const validateResponse = await axios.post(
          "http://localhost:3000/api/v1/payment/verify",
          body,
        );

        const Response = await validateResponse;

        console.log("Response", Response);
      },
      prefill: {
        name: "Anu",
        email: "anu@gmail.com.com",
        contact: "7907613290",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(option);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
    });

    rzp1.open();
    event.preventDefault();
  };

  return (
    <>
      <div className="grid grid-cols-3 px-4">
        {courses.map((course, index) => (
          <div key={index} className="flex h-[300px] w-[600px]">
            <section>
              <img
                src={course.image}
                alt="course image"
                className="w-[200px] border-none bg-center"
              />
            </section>
            <section className="space-y-4 px-3">
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="font-light text-gray-500">{course.description}</p>
              <h3>{course.price}</h3>
              <button
                onClick={(e) => paymentHandler(e, course._id)}
                className="rounded-lg bg-blue-500 px-2 py-1 text-white"
              >
                Pay now
              </button>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}

export default Courses;