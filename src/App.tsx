import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Start from "./components/Start";
import Battle from "./components/war/Battle";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <div className="app">
      <header>
        <nav>
          <Link to="/"> Start</Link>
          <Link to="/war"> Battle </Link>
          <Link to="/Gallery"> Gallery </Link>
        </nav>
        
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/war" element={<Battle />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/*" element={<FourOhFour />} />
        </Routes>
      </main>
    </div>
  );
}
function FourOhFour() {
  return <p> 404 not found!! </p>;
}

export default App;
