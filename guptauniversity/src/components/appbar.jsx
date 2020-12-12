import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Login } from './login';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { LoginContext } from './../LoginContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
		},
		appBarShift: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
			transition: theme.transitions.create(['margin', 'width'], {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		hide: {
			display: 'none',
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
		drawerHeader: {
			display: 'flex',
			alignItems: 'center',
			padding: theme.spacing(0, 1),
			// necessary for content to be below app bar
			...theme.mixins.toolbar,
			justifyContent: 'flex-end',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: -drawerWidth,
		},
		contentShift: {
			transition: theme.transitions.create('margin', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		},
	}),
);

export default function PersistentDrawerLeft() {
	const [state, setState] = useContext(LoginContext);
	console.log(state);
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		// TODO: display relevant user info from contexts
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={'flex-between'}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						<Link to={'/'}>Gupta University</Link>
					</Typography>
					{!state?.user && (
						<Link to="/login">
							<Typography>
								<Button>Login</Button>
							</Typography>
						</Link>
					)}

					{state?.user && (
						<div>
							<div>
								<Typography>{state.user.userName}</Typography>
								<Typography>{state.user.userType}</Typography>
							</div>
							<div>
								<Link to={'/login'}>
									<Button color={'secondary'}>
										<Typography onClick={() => setState({})}>Logout</Typography>
									</Button>
								</Link>
							</div>
						</div>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<div>
					<List>
						<Link to={'/academicCalendar'}>
							<ListItem button key={'Academic Calendar'}>
								<ListItemText primary={'Academic Calendar'}></ListItemText>
							</ListItem>
						</Link>
					</List>
					<List>
						<Link to={'/course-catalog'}>
							<ListItem button key={'course-catalog'}>
								<ListItemText primary={'Course Catalog'}></ListItemText>
							</ListItem>
						</Link>
					</List>
					<List>
						<Link to={'/masterSchedule/15'}>
							<ListItem button key={'masterSchedule'}>
								<ListItemText primary={'Current Master Schedule'}></ListItemText>
							</ListItem>
						</Link>
					</List>
					{state?.user?.userType === 'Student' && (
						<List>
							<Link to={`/student-transcript`}>
								<ListItem button key={'Your transcript'}>
									<ListItemText primary={'Your transcript'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/studentSchedule/15`}>
								<ListItem button key={'Student Schedule'}>
									<ListItemText primary={'Your Schedule'}></ListItemText>
								</ListItem>
							</Link>

							<Link to={`/student-advisors`}>
								<ListItem button key={'Your Advisors'}>
									<ListItemText primary={'Your Advisors'}></ListItemText>
								</ListItem>
							</Link>

							<Link to={`/degree-audit`}>
								<ListItem button key={'Your Degree Audit'}>
									<ListItemText primary={'Your Degree Audit'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/registration`}>
								<ListItem button key={'Registration'}>
									<ListItemText primary={'Registration'}></ListItemText>
								</ListItem>
							</Link>
						</List>
					)}
					{state?.user?.userType === 'Faculty' && (
						<List>
							<Link to={`/classlist`}>
								<ListItem button key={'classList'}>
									<ListItemText primary={'Class History'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/schedule/15`}>
								<ListItem button key={'schedule'}>
									<ListItemText primary={'Current Schedule'}></ListItemText>
								</ListItem>
							</Link>

							<Link to={`/advisees`}>
								<ListItem button key={'Your advisees'}>
									<ListItemText primary={'Your advisees'}></ListItemText>
								</ListItem>
							</Link>
						</List>
					)}
					{state?.user?.userType === 'Administrator' && (
						<List>
							<Link to={`/editMasterSchedule/15`}>
								<ListItem button key={'Edit Master Schedule'}>
									<ListItemText primary={'Edit Master Schedule'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/setTimes`}>
								<ListItem button key={'Set Times'}>
									<ListItemText
										primary={'Set Registration Settings and Grading Settings'}
									></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/classlist`}>
								<ListItem button key={'Class Modifications'}>
									<ListItemText primary={'Class Modifications'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/userlist`}>
								<ListItem button key={'User Modifications'}>
									<ListItemText primary={'User Modifications'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/Studentlist`}>
								<ListItem button key={'Student Modifications'}>
									<ListItemText primary={'Student Modifications'}></ListItemText>
								</ListItem>
							</Link>
							<Link to={`/Account Modifications`}>
								<ListItem button key={'Account Modifications'}>
									<ListItemText primary={'Account Modifications'}></ListItemText>
								</ListItem>
							</Link>
						</List>
					)}
					{state?.user?.userType === 'Researcher' && (
						<List>
							<Link to={`/Data`}>
								<ListItem button key={'Data'}>
									<ListItemText primary={'Data'}></ListItemText>
								</ListItem>
							</Link>
						</List>
					)}
				</div>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.drawerHeader} />
			</main>
		</div>
	);
}
