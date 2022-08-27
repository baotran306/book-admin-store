import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";

const Login = (props: any) => {
    const initialUser = { account: "", password: "" };
    const [user, setUser] = useState(initialUser);
    const [showMessageError, setShowMessageError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const navigate = useNavigate();
    const handleClickLogin = () => {
        login();
    }
    const handleClickHidden = () => {
        setHiddenPassword(!hiddenPassword);
    }
    const login = () => {
        Axios.post('/staff/login', {
            account: user.account,
            password: user.password
        }).then(res => {
            let info = res.data;
            console.log(info.info[0]);
            sessionStorage.setItem('accessToken', JSON.stringify(info.info[0]));
            props.setRole(info.info[0].role_id)
            if (info.info[0].role_id === 3) {
                navigate('/delivery');
            } else {
                if (res.data.result && info.info[0].role_id !== 3)
                    navigate('/order');
            }
        }).catch(error => {
            setMessageError(error.response.data.message);
            setShowMessageError(true);
        })
    }
    const handleChange = (event: any) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    }
    return (
        <div className="container-login">
            <div className="main-login">
                <div className="main">
                    <div className="left"></div>
                    <div className="right">
                        <div className="display-main-login">
                            <div className="title">Đăng nhập</div>
                            <FormControl fullWidth>
                                <TextField
                                    error={showMessageError}
                                    name="account"
                                    value={user.account}
                                    onChange={handleChange}
                                    label="username" />
                            </FormControl>
                            <FormControl className="password-container">
                                <TextField
                                    error={showMessageError}
                                    type={hiddenPassword ? 'password' : 'text'}
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    label="password"
                                />
                                {hiddenPassword ? <Visibility className="icon-password" onClick={handleClickHidden} />
                                    : <VisibilityOff className="icon-password" onClick={handleClickHidden} />}
                            </FormControl>
                            {showMessageError ? <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">{messageError}</FormHelperText>
                            </FormControl> : <></>}

                            <div className="forget-password">
                                <span>Quên mật khẩu</span>
                            </div>
                            <div className="btn-login">
                                <Button sx={{ width: '300px', height: '50px', borderRadius: '25px' }}
                                    onClick={handleClickLogin}
                                    variant="outlined">Đăng nhập</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;