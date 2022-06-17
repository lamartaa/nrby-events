import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { authenticate } from '../data/PortalUserRepository';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import { GenericErrorModal } from './GenericErrorModal';



export class LoginPage extends React.Component {
    
    state = {
        username: '',
        password:  '',
        usernameError: '',
        passwordError: '',
        error: '',
        redirectPage: '',
        stayLoggedIn: false
    }

    async componentDidMount() {

        this.props.loadingOn();

        const query = new URLSearchParams(window.location.search);

        var redirectPage = query.get('redirect');

        if(redirectPage == null || redirectPage == '')
        {
            redirectPage = "dashboard";
        }

        this.setState({...this.state, redirectPage: redirectPage});
        this.props.loadingOff();
    }

    HandleUsernameChange = (event) => {
        this.setState({...this.state, username: event.currentTarget.value})
    }

    HandlePasswordChange = (event) => {
        this.setState({...this.state, password: event.currentTarget.value})
    }

    HandleLogin = async (e) => 
    {
        e.preventDefault();
        this.props.loadingOn();
        let usernameError = "";
        let passwordError = "";
        let errored = false;

        if(this.state.username.length == 0)
        {
            usernameError = "Username required.";
            errored = true;
        }

        if(this.state.password.length == 0)
        {
            passwordError = "Password required.";
            errored = true;
        }

        let serverErrorText = "";

        if(!errored){
            var response = await authenticate(this.state.username, this.state.password, this.state.stayLoggedIn);
            
            if(response != null && response.status == 200)
            {
                if(response.data.success)
                {
                    localStorage.setItem("nrby-access-token", response.data.token);

                    this.props.setLoggedIn();
                }
                else{
                    serverErrorText = response.data.errorMsg;
                }
            }
            else{
                serverErrorText = "An unknown error occured. Please try again later";
            }
        }

        this.setState({
            ...this.state,
            usernameError: usernameError,
            passwordError: passwordError,
            error: serverErrorText
        });

        this.props.loadingOff();
    }
    
    StayLoggedInToggle = () => {

        var stayLoggedIn = !this.state.stayLoggedIn;

        this.setState({...this.state, stayLoggedIn: stayLoggedIn})
    }

    CloseErrorModal = () => {
        this.setState({...this.state, error: ""});
    };

    render(){
        const classes = {
            loginBtn: {
            //marginTop: theme.spacing(2),
            flexGrow: 1
            }
          };

        return (
            <div>
                <Card className='cardOverwrite'>
                    <CardHeader style={{ textAlign: 'center', background: '#212121', color: '#fff'}} title="Nrby Events Login" />
                    <CardContent>
                    <div>
                        <TextField
                        error={this.state.usernameError !== ""}
                        fullWidth
                        id="username"
                        type="email"
                        label="Username"
                        margin="normal"
                        helperText={this.state.usernameError}
                        FormHelperTextProps={{ color: "red" }}
                        onChange={(e) => this.HandleUsernameChange(e)}
                        value={this.state.username}
                        variant="outlined"
                        />
                        <TextField
                        error={this.state.passwordError !== ""}
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        margin="normal"
                        helperText={this.state.passwordError}
                        FormHelperTextProps={{ color: "red" }}
                        onChange={(e) => this.HandlePasswordChange(e)}
                        value={this.state.password}
                        variant="outlined"
                        />
                    </div>
                    </CardContent>
                    <CardActions>
                    <Button
                        variant="contained"
                        size="large"
                        className='btn-primary'
                        style={classes.loginBtn}
                        onClick={this.HandleLogin}
                        >
                        Login
                    </Button>
                    </CardActions>
                    <CardContent>
                        <FormControlLabel
                            style={{width: "100%"}}
                            control={
                                <Checkbox
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox'}}
                                    onClick={this.StayLoggedInToggle}
                                    value={this.state.stayLoggedIn}
                                />
                            }
                            label="Stay logged in?"
                            />
                    </CardContent>
                    <CardContent>
                        <div style={{width: "100%"}}>
                            {/* <div className="float-left">
                                <Link href="#" onClick={() => this.props.changePage("/forgot-password")}>
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="float-right">
                                <Link href="#" onClick={() => this.props.changePage("/sign-up")}>
                                    Don't have an account? Sign up
                                </Link>
                            </div> */}
                        </div>
                    </CardContent>
                </Card>
                <GenericErrorModal hidden={this.state.error == ''}
                    message={this.state.error}
                    closeModal={this.CloseErrorModal} />
            </div>
        );
    }
}