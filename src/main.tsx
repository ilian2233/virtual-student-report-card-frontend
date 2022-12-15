import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./Error-page";
import {GetStudentExams, CreateExams} from "./Exams";
import {Login} from "./Login";
import {CookiesProvider} from "react-cookie";
import {CreateStudent} from "./Student";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
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
        element: <CreateStudent/>,
    }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <CookiesProvider>
          <RouterProvider router={router} />
      </CookiesProvider>
  </React.StrictMode>,
)
