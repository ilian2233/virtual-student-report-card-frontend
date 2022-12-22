import React from "react";
import axios, {AxiosPromise, AxiosResponse} from "axios";
import {exam} from "./Exam";
import {CookieSetOptions} from "universal-cookie";
import moment from "moment";
import {roles} from "./User";

const baseURL = "http://localhost:8080";

export const login = (email: string, password: string, setCookie: (name: string, value: any, options?: (CookieSetOptions)) => void, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {
    printResult(axios.post(baseURL+"/login", {Email: email, Password: password}))
        .then((r) => {
            setCookie("token", r.data.Token, {expires: moment(new Date()).add(30, 'm').toDate()})
            setCookie("roles", JSON.parse(atob(r.data.Token.split('.')[1]))["roles"])
        })
        .catch(error => {
            console.error(error);
        });
}

export const getExams = (setExams:  React.Dispatch<React.SetStateAction<exam[]>>, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.get(baseURL+"/student/exams",config))
        .then((response: { data: exam[] }) => {
            setExams(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const getStudentFacultyNumbers = (setStudents:  React.Dispatch<React.SetStateAction<string[]>>, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.get(baseURL+"/teacher/students",config))
        .then((response: { data: string[] }) => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const getCourses = (setCourses:  React.Dispatch<React.SetStateAction<string[]>>, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.get(baseURL+"/teacher/courses",config))
        .then((response: { data: string[] }) => {
            setCourses(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const saveExam = (courseName: string, studentFacultyNumber: string, points: number, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.post(baseURL+"/teacher/exams", {CourseName: courseName, StudentFacultyNumber: studentFacultyNumber, Points: points}, config))
        .then(() => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}

export const saveUser = (name: string, email: string, phone: string, token: string, role: roles, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    let slug = ""
    switch (role){
        case "student":
            slug = "/admin/students"
            break
        case "teacher":
            slug = "/admin/teachers"
            break
        case "admin":
            slug = "/admin/admins"
            break
    }

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.post(baseURL+slug, {Name: name, Email: email, Phone: phone}, config))
        .then(() => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}

export const getTeachers = (setTeachers:  React.Dispatch<React.SetStateAction<string[]>>, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.get(baseURL+"/admin/teachers",config))
        .then((response: { data: string[] }) => {
            setTeachers(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const saveCourse = (courseName: string, teacherEmail: string, token: string, printResult: (request: Promise<AxiosPromise>) => Promise<AxiosResponse<any>>) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    printResult(axios.post(baseURL+"/admin/courses", {CourseName: courseName, TeacherEmail: teacherEmail}, config))
        .then(() => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}