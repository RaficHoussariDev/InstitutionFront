import React, {useState} from "react";
import '../../App.css';
import './RegisterForm.css';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomError from "../../components/CustomError/CustomError";
import {register} from "../../services/authService";
import 'react-toastify/dist/ReactToastify.css';
import {toast, ToastContainer} from "react-toastify";
import CustomLoader from "../../components/CustomLoader/CustomLoader";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function submitRegister() {
        if (!username || !password || !confirmPassword) {
            setError('Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setError('');

        setIsLoading(true);
        register(username, password).then(() => {
                setIsLoading(false);
                toast.success('Registration successful! Please log in.')
        }).catch((error) =>  {
                setIsLoading(false);
                toast.error(error.response.data.message)
        });
    }

    if(isLoading) {
        return (
            <CustomLoader />
        );
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Register</h2>

            {error && <CustomError message={error} />}

            <div onSubmit={submitRegister} className="form">
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

                <CustomInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="button-container">
                    <CustomButton title="Register" onClick={submitRegister}/>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default RegisterForm;