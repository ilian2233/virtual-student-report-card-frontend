import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import App from "./App";
import {GetStudentExams, CreateExams} from "./Exam";
import {Login} from "./Login";
import {CookiesProvider} from "react-cookie";
import {CreateUser} from "./User";
import {CreateCourse} from "./Course";
import PersistentDrawerLeft from "./Frame";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Navigate to="/login" replace={true} />,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/student/exams",
        element: <GetStudentExams/>,
    },
    {
        path: "/teacher/exams",
        element: <CreateExams/>,
    },
    {
        path: "/admin/students",
        element: <CreateUser role="student"/>,
    },
    {
        path: "/admin/teachers",
        element: <CreateUser role="teacher"/>,
    },
    {
        path: "/admin/courses",
        element: <CreateCourse/>,
    }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <CookiesProvider>
          <RouterProvider router={router} />
          <BrowserRouter>
<<<<<<< HEAD
          <PersistentDrawerLeft>
          </PersistentDrawerLeft>
=======
              <PersistentDrawerLeft/>
>>>>>>> d7e00db (Removed Error handling file)
          </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>,
)
