import React, {useState} from "react";
import '../../App.css';
import './RegisterForm.css';
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomError from "../../components/CustomError/CustomError";

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

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

        console.log('Username:', username);
        console.log('Password:', password);
        console.log('ConfirmPassword:', confirmPassword);
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
                    label="Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="button-container">
                    <CustomButton title="Register" onClick={submitRegister}/>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;