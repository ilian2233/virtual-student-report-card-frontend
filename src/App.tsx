import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";
import {EditExams, ListExams} from "./exam";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
    <Resource name="exams" list={ListExams} edit={EditExams} />
</Admin>;

export default App;
