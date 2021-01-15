import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link, useHistory} from "react-router-dom";
import {login, redirect} from "../store/actions/userActions";
import {connect} from "react-redux";
import fetchUser from "../store/actions/fetchUser";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LoginPage({loginAction, message, needRedirect, redirect}) {
    const history = useHistory();
    const classes = useStyles();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (needRedirect) {
            redirect();
            history.push('/hello');
        }
    });
    return (
        <Container component="main" maxWidth="xs">

            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    id='form'
                    className={classes.form}
                      onSubmit={(e) => {
                          e.preventDefault();
                          loginAction(login, password);
                      }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Login"
                        name="login"
                        autoFocus
                        onChange={(event) => setLogin(event.target.value)}
                        error={message !== ""}
                        helperText={message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
            </Box>
        </Container>
    );
}

const mapStateToProps = store => {
    return {
        message: store.user.message,
        needRedirect: store.user.justLogin
    }
};
const mapDispatchToProps = dispatch => {
    return {
        loginAction: (login, password) => dispatch(fetchUser({login, password})), // [1]
        redirect: () => dispatch(redirect())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
