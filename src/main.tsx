import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LandingPage from "./Landing-page";
import {GetStudentExams, CreateExams} from "./Exam";
import {Login} from "./Login";
import {CookiesProvider} from "react-cookie";
import {CreateUser} from "./User";
import {CreateCourse} from "./Course";
import PersistentDrawerLeft from "./Frame";
import {OptionsObject, SnackbarKey, SnackbarMessage, SnackbarProvider} from "notistack";
import {AxiosPromise} from "axios";
import ErrorPage from "./Error-page";

export const requestResult = (alertHandler:  (message: SnackbarMessage, options?: (OptionsObject | undefined)) => SnackbarKey) => (request: Promise<AxiosPromise>) => request
    .then(r=>{
        alertHandler("Success", {variant: "success"})
        return r
    })
    .catch(e=>{
        alertHandler("Request failed", {variant: "error"})
        return e
    })

const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/student/exams",
        element: <GetStudentExams/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/teacher/exams",
        element: <CreateExams/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/students",
        element: <CreateUser role="student"/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/teachers",
        element: <CreateUser role="teacher"/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/admin/courses",
        element: <CreateCourse/>,
        errorElement: <ErrorPage/>,
    }
]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <CookiesProvider>
          <SnackbarProvider maxSnack={3}>
              <RouterProvider router={router} />
              <BrowserRouter>
                  <PersistentDrawerLeft/>
              </BrowserRouter>
          </SnackbarProvider>
      </CookiesProvider>
  </React.StrictMode>,
)
