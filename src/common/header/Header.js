import React, { useEffect, useState } from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import { RefreshSharp, SubdirectoryArrowLeftRounded } from '@material-ui/icons';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { Link } from '@material-ui/core';
import { useHistory, useLocation, useParams } from 'react-router-dom';

function Header() {


    const [modalOpen, setModalOpen] = useState(false)
    const [user, setUser] = useState(false)

    useEffect(() => {
        setUser(localStorage.getItem('userInfo'))
    }, [user])

    const history = useHistory()

    const location = useLocation()

    const params = useParams()

    const bookshow = () => {
        if (user) {
            console.log(params);
            history.push(`/bookshow/${params.id}`)
            return;
        }
        else setModalOpen(true)

    }



    return (
        <div className="headerCSS">
            <img id='logo' src="https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg"></img>

            {location.pathname.includes('details') && <Button variant="contained" onClick={bookshow} color="primary" style={{
                float: "right", position: "absolute", right: 100, top: 7
            }} > BOOK SHOW  </Button>}


            {user ? <Button id='login' variant="contained" onClick={() => {
                localStorage.removeItem('userInfo')
                setUser(false)
            }} style=
                {{ float: "right", position: "absolute", right: 10, top: 7 }} >
                Logout
            </Button> :
                <Button id='login' variant="contained" onClick={() => {
                    setModalOpen(true)
                }} style=
                    {{ float: "right", position: "absolute", right: 10, top: 7 }} >
                    LOGIN
                </Button>}

            <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={500}>
                <div>
                    <FullWidthTabs setUser={setUser} />
                </div>

            </Modal>

        </div>
    )

}

///----------------------------------------------------- tab ui

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 400,
    },
}));

export function FullWidthTabs({ setUser }) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="Secondary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="LOGIN" style={{ color: "black" }} {...a11yProps(0)} />
                    <Tab label="REGISTER" style={{ color: "black" }} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <TabFirst setUser={setUser} />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <TabTwo />

                </TabPanel>

            </SwipeableViews>
        </div>
    );
}


//--------------------------login username and password component-------------------------


const useStylesLogin = makeStyles((theme) => ({
    root: {
        paddingLeft: 50,
        '& > *': {
            margin: theme.spacing(1),

        },
    },
    erro: {
        color: theme.palette.secondary.main,
    },

}));

export function TabFirst({ setUser }) {
    const [name, setName] = React.useState('Composed TextField');
    const classes = useStylesLogin();

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const history = useHistory()

    const handleLogin = () => {
        const user = localStorage.getItem('userInfo')

        // JSON.parse(user)

        if (!user) {
            localStorage.setItem('userInfo', true)
            setUser(true)
            history.push('/')
        }
    }

    return (
        <div className='loginUsername'>
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl>
                        <Input
                            placeholder="Username*"
                            id="component-helper"
                            onChange={handleChange}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text"></FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Password*"
                            id="component-helper"
                            onChange={handleChange}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text"></FormHelperText>
                    </FormControl>
                </form>
            </div>
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
        </div>
    );
}



export function TabTwo() {
    const [name, setName] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [ename, setEname] = React.useState('');
    const [pname, setPname] = React.useState('');
    const [cname, setCname] = React.useState('');

    const [error, setError] = React.useState('');
    const [complete, setComplete] = React.useState('');

    const classes = useStylesLogin();

    const handleChange = () => {
        if (name != "" && lname != "" && ename != "" && pname != "" && cname != "") {
            setComplete("Registration Successful. Please Login")
        }
        else {
            setError("Required")
        }
    };

    return (
        <div className='loginUsername'>
            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <FormControl>
                        <Input
                            placeholder="First Name *"
                            id="component-helper"
                            onChange={(e) => setName(e.target.value)}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text">{error}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Last Name *"
                            id="component-helper"
                            onChange={(e) => setLname(e.target.value)}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text">{error}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="Email *"
                            id="component-helper"
                            onChange={(e) => setEname(e.target.value)}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text">{error}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            type="password"
                            placeholder="Password *"
                            id="component-helper"
                            onChange={(e) => setPname(e.target.value)}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text">{error}</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <Input
                            type="number"
                            placeholder="Contact No. *"
                            id="component-helper"
                            onChange={(e) => setCname(e.target.value)}
                            aria-describedby="component-helper-text"
                        />
                        <FormHelperText className={classes.erro} id="component-helper-text">{error}</FormHelperText>
                    </FormControl><br />
                    <span>{complete}</span>
                </form>
            </div>
            <Button onClick={handleChange} variant="contained" color="primary">
                Register
            </Button>
        </div>
    );
}


export default Header;