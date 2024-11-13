import logo from "../../logo.svg";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import CustomButton from "../../components/CustomButton/CustomButton";
import {useState} from "react";
import '../../App.css';
import {ToastContainer} from "react-toastify";

function LoginRegister() {
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

            <ToastContainer />
        </div>
    );
}

export default LoginRegister;