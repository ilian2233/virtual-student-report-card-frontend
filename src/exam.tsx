import { List,Edit, EditButton, Datagrid, TextField, EmailField, SimpleForm, ReferenceInput, TextInput } from "react-admin";

export const ListExams = () => (
    <List>
        <Datagrid>
            <TextField source="id" />
            <TextField source="CourseName" />
            <TextField source="StudentName" />
            //TODO: Check for permissions
            <EditButton />
        </Datagrid>
    </List>
);


export const EditExams = () => (
    <Edit>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="id" />
            <TextInput source="CourseName" />
            <TextInput source="StudentName" />
        </SimpleForm>
    </Edit>
);