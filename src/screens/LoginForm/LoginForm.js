import React, {useState} from 'react';
import CustomInput from "../components/CustomInput/CustomInput";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function submitLogin() {
        if(!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setError('');

        console.log('username:', username);
        console.log('password:', password);
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Login</h2>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={submitLogin} className="form">
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
            </form>
        </div>
    );
}

export default LoginForm;