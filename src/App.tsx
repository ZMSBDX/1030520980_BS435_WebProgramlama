import { Login } from "./components/login.tsx";
import { useAuth } from "./components/AuthContext.tsx";
import { Route, Routes } from "react-router";
import { Game } from "./components/Game.tsx";


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
                <Route path="/" element={<Game />} />
            </Routes>
        </>
    )
}

export default App