import { Game } from "./components/Game.tsx";

function App() {
    return (
        <div className="App">
            {/* Sadece Oyunu Çağırıyoruz, başka hiçbir şeye gerek yok */}
            <Game />
        </div>
    )
}

export default App