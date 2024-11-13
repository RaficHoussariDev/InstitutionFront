import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LoginRegister from "./screens/LoginRegister/LoginRegister";
import InstitutionList from "./screens/InstitutionList/InstitutionList";
import {getToken} from "./services/tokenService";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

function App() {
    const isLoggedIn = !!getToken();

    function PrivateRoute({children}) {
        return isLoggedIn ? children : <Navigate to="/" />
    }

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                <Route path="*" element={ <Navigate to={ isLoggedIn ? "/institutions" : "/" } /> } />
                <Route path="/" element={ <LoginRegister /> } />

                <Route
                    path="/institutions"
                    element={
                        <PrivateRoute>
                            <InstitutionList />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
