import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <header></header>
      <nav></nav>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default App;
