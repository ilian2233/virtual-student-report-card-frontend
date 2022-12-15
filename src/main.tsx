import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./Error-page";
import {StudentExams, TeacherExams} from "./Exams";
import {Login} from "./Login";
import {CookiesProvider} from "react-cookie";

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
        element: <StudentExams/>,
    },
    {
        path: "/teacher/exams",
        element: <TeacherExams/>,
    }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <CookiesProvider>
          <RouterProvider router={router} />
      </CookiesProvider>
  </React.StrictMode>,
)
