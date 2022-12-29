import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LinkIcon from '@mui/icons-material/Link';
import {useCookies} from "react-cookie";
import {Button} from "@mui/material";

const drawerWidth = 240;

const LinksBlock = (props: { names: { text: string, route: string }[] }) => <>
    <Divider/>
    <List>
        {props.names.map((v) => (
            <ListItem key={v.text} disablePadding>
                <a href={v.route}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LinkIcon/>
                        </ListItemIcon>
                        <ListItemText primary={v.text}/>
                    </ListItemButton>
                </a>
            </ListItem>
        ))}
    </List>
</>

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const LoginLogoutButton = () => {
    const [cookies, _, removeCookie] = useCookies();

    const logout = () => {
        removeCookie("token");
        removeCookie("roles");
    }

    return <a href="/login">
        {
            cookies["token"] ?
                <Button onClick={logout} variant="contained">Logout</Button> :
                <Button variant="contained">Login</Button>
        }
    </a>
}

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [cookies] = useCookies();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box sx={{width: '100%'}}/>
                    <LoginLogoutButton/>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                {cookies["roles"]?.includes("Student") && <LinksBlock names={[
                    {text: "Exams", route: "/student/exams"}
                ]}/>}
                {cookies["roles"]?.includes("Teacher") && <LinksBlock names={[
                    {text: "Exams", route: "/teacher/exams"}
                ]}/>}
                {cookies["roles"]?.includes("Admin") && <LinksBlock names={[
                    {text: "Students", route: "/admin/students"},
                    {text: "Teachers", route: "/admin/teachers"},
                    {text: "Courses", route: "/admin/courses"},
                ]}/>}
                {cookies["token"] ?
                    <LinksBlock names={[{text: "Change Password", route: "/change"}]}/> :
                    <LinksBlock names={[{text: "Forgotten Password", route: "/forgotten"}]}/>
                }
            </Drawer>
            <Main open={open} sx={{justifyContent: "center", width: "100vw"}}>
                <DrawerHeader/>
            </Main>
        </Box>
    );
}