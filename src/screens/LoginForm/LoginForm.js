import React, {useState} from 'react';
import CustomInput from "../../components/CustomInput/CustomInput";
import './LoginForm.css';
import '../../App.css';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomError from "../../components/CustomError/CustomError";
import {login} from "../../services/authService";
import {toast} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import {saveToken} from "../../services/tokenService";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function submitLogin() {
        if(!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setError('');

        setIsLoading(true);
        login(username, password).then((response) => {
            setIsLoading(false);
            saveToken(response);
            toast.success(`Welcome ${username}!`);
            navigate("/institutions");
        }).catch((error) => {
            setIsLoading(false);
            toast.error(error.response.data.message);
        });
    }

    if(isLoading) {
        return (
            <CustomLoader />
        );
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>

            {error && <CustomError message={error} />}

            <div onSubmit={submitLogin} className="form">
                <CustomInput
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <CustomInput
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className="button-container">
                    <CustomButton title="Login" onClick={submitLogin}/>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;