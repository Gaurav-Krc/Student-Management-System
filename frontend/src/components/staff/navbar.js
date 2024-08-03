import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Link from '@mui/material/Link';
import { setLogout } from '../../states/index.js';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
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
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(6), // Adjust indentation
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    marginLeft: theme.spacing(-3), // Adjust text position
}));

export function PersistentDrawerLeft() {
    const frst = useSelector((state) => state.user.firstName);
    const lst = useSelector((state) => state.user.lastName);
    const userName = frst + " " + lst;

    const dispatch = useDispatch();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [complaintOpen, setComplaintOpen] = React.useState(false);
    const [announcementOpen, setAnnouncementOpen] = React.useState(false);
    const [timeTableOpen, setTimeTableOpen] = React.useState(false);
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.staffID);

    const handleUpdateProfileClick = () =>{

    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const handleAnnouncementClick = () => {
        setAnnouncementOpen(!announcementOpen);
    };

    const handleTimeTableClick = () => {
        setTimeTableOpen(!timeTableOpen);
    };

    const handleHomeClick = () => {
        navigate(`/staff/${userId}`);
    };


    const handleNewAnnouncementClick = () => {
        navigate(`/staff/${userId}/announcement/submit`);
    };

    const handleEarlierAnnouncementsClick = () => {
        navigate(`/staff/${userId}/announcement/all`);
    };

    const handleCreateNewTimeTableClick = () => {
        navigate(`/staff/${userId}/timetable/create`);
    };

    const handleGetAllTimeTableClick = () => {
        navigate(`/staff/${userId}/timetable/all`);
    };

    const handleLogout = () => {
        dispatch(setLogout());
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ ml:1,mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        MENU
                    </Typography>
                    <Box sx={{ display: 'flex', marginLeft: 'auto', alignItems: 'center' }}>
                        <Box mr={3}>
                            <IconButton
                                color="inherit"
                                aria-label="update profile"
                                onClick={handleUpdateProfileClick}
                                edge="end"
                            >
                                <Typography variant="h6" noWrap>
                                    {userName}
                                </Typography>
                                <AccountCircleIcon />
                            </IconButton>
                        </Box>
                        <IconButton
                            color="inherit"
                            aria-label="logout"
                            onClick={handleLogout}
                            edge="end"
                            sx={{mr: "1rem"}}
                        >
                            <Typography variant="h6" noWrap>
                                Logout
                            </Typography>
                            <ExitToAppIcon />
                        </IconButton>
                    </Box>

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
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleHomeClick}>
                            <ListItemText primary="HOME" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleAnnouncementClick}>
                            <ListItemText primary="ANNOUNCEMENT" />
                            <ListItemIcon>
                                {announcementOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    {announcementOpen && (
                        <List>
                            <StyledListItem disablePadding>
                                <ListItemButton onClick={handleNewAnnouncementClick}>
                                    <StyledListItemText primary="NEW ANNOUNCEMENT" />
                                </ListItemButton>
                            </StyledListItem>
                            <StyledListItem disablePadding>
                                <ListItemButton onClick={handleEarlierAnnouncementsClick}>
                                    <StyledListItemText primary="EARLIER ANNOUNCEMENTS" />
                                </ListItemButton>
                            </StyledListItem>
                        </List>
                    )}
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleTimeTableClick}>
                            <ListItemText primary="TIMETABLE" />
                            <ListItemIcon>
                                {timeTableOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    {timeTableOpen && (
                        <List>
                            <StyledListItem disablePadding>
                                <ListItemButton onClick={handleCreateNewTimeTableClick}>
                                    <StyledListItemText primary="CREATE NEW" />
                                </ListItemButton>
                            </StyledListItem>
                            <StyledListItem disablePadding>
                                <ListItemButton onClick={handleGetAllTimeTableClick}>
                                    <StyledListItemText primary="GET ALL" />
                                </ListItemButton>
                            </StyledListItem>
                        </List>
                    )}
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
            </Main>
        </Box>
    );
}
