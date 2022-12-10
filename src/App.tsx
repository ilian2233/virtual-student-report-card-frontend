import {Admin} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth/>;

export default App;
