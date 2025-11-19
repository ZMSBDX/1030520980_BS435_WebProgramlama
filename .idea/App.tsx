import '../../BS435_WebProgramlama_I/apps/2025/app2/src/App.css'
import {useState} from "react";
import {Login} from "./login.tsx";
import {Weather} from "../../BS435_WebProgramlama_I/apps/2025/app2/src/weather.tsx";
import {useAuth} from "../../BS435_WebProgramlama_I/apps/2025/app2/src/AuthContext.tsx";
import {Route, Routes} from "react-router";

function App() {

    const {
        isLoggedIn,
        username,
        login,
        logout
    } = useAuth();

    return (
        <>
            {isLoggedIn ? <h2>{username}</h2>:<h2>Giriş Yap</h2>}
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Weather/>} />
            </Routes>
        </>
    )
}

export default App
