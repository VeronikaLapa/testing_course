import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import fetchUser from "../store/actions/fetchUser";
import getAuth from "../store/actions/getAuth";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function PopOver({auth, name, getAuthUserAction}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (anchorEl && auth) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        if (!auth) {
            setAnchorEl(null);
        }
    });

    const handleMenu = (event) => {
        console.log('handle menu');
        setAnchorEl(event.currentTarget);
        if (name == null) {
            //getAuthUserAction();
        }
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    };


    return (
        <div>
            {auth && (
                <div>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        id='avatar'
                    >
                        <AccountCircle/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>{name}</MenuItem>
                        <MenuItem><Link to="/logout"><Typography color="error">Exit</Typography></Link></MenuItem>
                    </Menu>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = store => {
    console.log(store); // посмотрим, что же у нас в store?
    return {
        auth: store.user.auth,
        name: store.user.user.name
    }
};
const mapDispatchToProps = dispatch => {
    return {
        getAuthUserAction: () => dispatch(getAuth()), // [1]
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(PopOver);
