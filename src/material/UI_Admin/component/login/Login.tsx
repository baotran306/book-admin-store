import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';
import { useNavigate } from "react-router-dom";

const Login = (props: any) => {
    const [showMessageError, setShowMessageError] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const navigate = useNavigate();
    const handleClickLogin = () => {
        setShowMessageError(!showMessageError);
        sessionStorage.setItem('accessToken', 'true');
        navigate('/');
    }
    const handleClickHidden = () => {
        setHiddenPassword(!hiddenPassword);
    }
    return (
        <div className="container-login">
            <div className="main-login">
                <div className="main">
                    <div className="left"></div>
                    <div className="right">
                        <div className="display-main-login">
                            <div className="title">Login</div>
                            <FormControl fullWidth>
                                <TextField
                                    error={showMessageError}
                                    label="username" />
                            </FormControl>
                            <FormControl className="password-container">
                                <TextField
                                    error={showMessageError}
                                    type={hiddenPassword ? 'password' : 'text'}
                                    label="password"
                                />
                                {hiddenPassword ? <Visibility className="icon-password" onClick={handleClickHidden} />
                                    : <VisibilityOff className="icon-password" onClick={handleClickHidden} />}
                            </FormControl>
                            {showMessageError ? <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">username or password is incorrect</FormHelperText>
                            </FormControl> : <></>}

                            <div className="forget-password">
                                <span>Forget password</span>
                            </div>
                            <div className="btn-login">
                                <Button sx={{ width: '300px', height: '50px', borderRadius: '25px' }}
                                    onClick={handleClickLogin}
                                    variant="outlined">Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;