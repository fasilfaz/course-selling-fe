import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import SignupPage from './pages/user/SignupPage';
import SigninPage from './pages/user/SigninPage';
import IsignupPage from './pages/instructor/IsignupPage';
import IsigninPage from './pages/instructor/IsigninPage';
import App from './App';
import HomeLayout from './layout/HomeLayout';
import UserDashboard from './components/user/UserDashboard';
import UserLayout from './layout/UserLayout';
import AdminDashboardPage from './pages/instructor/AdminDashboardPage';
import AdminLayout from './layout/AdminLayout';
import CourseAdd from './components/instructors/CourseAdd';
import CourseCard from './components/instructors/CourseCard';
import CoursesPage from './pages/user/CoursesPage';
import InstructorPage from './pages/instructor/InstructorPage';
import { ChakraProvider } from '@chakra-ui/react';
import EasyMethod from './protucted-routes/EasyMethod';


const router = createBrowserRouter([
 {
  element: <HomeLayout/>,
  children: [
    {
      path: "/",
      element: <App/>
    },
    {
      path: "/user/signup",
      element: <SignupPage/>
    },
    {
      path: "/user/signin",
      element: <SigninPage/>
    },
    {
      path: "/instructor/signup",
      element: <IsignupPage/>
    },
    {
      path: "/instructor/signin",
      element: <IsigninPage/>
    },

  ],
 },

 {
  element:
  (
    <EasyMethod>
      <AdminLayout />,
    </EasyMethod>
  ),
  children: [
    {
      path: "/admin/dashboard",
      element: <AdminDashboardPage />,
    },
    {
      path: "/admin/courses",
      element: <CourseCard />,
    },
    {
      path: "/admin/instructors",
      element: <InstructorPage />,
    },
    {
      path: "/admin/courses/add-course",
      element: <CourseAdd />,
    },
  ],
},

{
  element: <UserLayout />,
  children: [
    {
      path: "/user/dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/user/courses",
      element: <CoursesPage />,
    },
  ],
},

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
</React.StrictMode>,
)
