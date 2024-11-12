import logo from './logo.svg';
import './App.css';
import LoginForm from "./screens/LoginForm/LoginForm";
import {useState} from "react";
import RegisterForm from "./screens/RegisterForm/RegisterForm";
import CustomButton from "./components/CustomButton/CustomButton";

function App() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="App">
            <img src={logo} className="App-logo" alt="logo"/>
            {isLogin ? <LoginForm/> : <RegisterForm/>}

            <div className="button-container">
                <CustomButton
                    onClick={() => setIsLogin(!isLogin)}
                    title={isLogin ? 'Create User' : 'Back to Login'}
                    backgroundColor="transparent"
                    textColor="grey"
                />
            </div>
        </div>
    );
}

export default App;
