import React, { useState } from "react";
import "./login.css";
import axios from 'axios';
import { setUserSession } from './common';

function Login(props) {
        const [loading, setLoading] = useState(false);
        const username = useFormInput('');
        const password = useFormInput('');
        const [error, setError] = useState(null);
       
        // handle button click of login form
        const handleLogin = () => {
          setError(null);
          setLoading(true);
          axios.post('http://localhost:4000/users/signin', { username: username.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('./dashboard');
          }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
          });
        };

        return (
            <div className="auth-wrapper"> 
                <form action="./dashboard">
                    <div className="auth-inner">  
                        <img src="/natwest-logo.png" alt="Natwest" class="center"></img>
                        <h4>Expense Tracker</h4>
                        <h5>Sign In</h5>

                        <div className="form-group1">
                            <label>Username</label>
                            <input type="username" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group1" styleName={{ marginTop: 10 }}>
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group1">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <div className="form-group2">
                            <div className="forgot-password" styleName ="display:inline-block">
                            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                                <button type="submit" className="btn btn-default" onClick={handleLogin} disabled={loading}>Submit</button>
                                <label className="forgot-password1"><a href="www.google.com">Forgot password?</a></label>
                            </div>
                        </div>

                        <div className="form-group3">
                            <div className="Register-here" styleName ="display:inline-block">
                                <label className="Register-here-label">New User?</label>
                                <label className="Register-here-label"><a href="#">Register here</a></label>
                            </div>
                        </div>

                    </div>    
                </form>
            </div>        
        );
    }
    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);
       
        const handleChange = e => {
          setValue(e.target.value);
        }
        return {
          value,
          onChange: handleChange
        }
    }
export default Login;    