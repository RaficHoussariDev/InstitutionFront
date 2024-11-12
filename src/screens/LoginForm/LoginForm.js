import React, {useState} from 'react';
import CustomInput from "../../components/CustomInput/CustomInput";
import './LoginForm.css';
import '../../App.css';
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomError from "../../components/CustomError/CustomError";
import {login} from "../../services/authService";
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function submitLogin() {
        if(!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setError('');

        setIsLoading(true);
        login(username, password).then(() => {
            setIsLoading(false);
            toast.success(`Welcome ${username}!`);
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

            <ToastContainer />
        </div>
    );
}

export default LoginForm;