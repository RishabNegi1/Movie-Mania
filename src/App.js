import Header from "./Components/Header";
import Cards from "./Components/Cards";
import { Route, Routes } from "react-router-dom";
import Log from "./Components/Log";
import './index.css';
import Detail from "./Components/Detail";
import { createContext, useState } from "react";
import Signup from "./Components/Signup";
import Addm from "./Components/Addm";

const Appstate = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");
  return (
    <Appstate.Provider value={{login, setLogin, userName, setUserName}}>
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Cards/>} />
        <Route path="/login" element={<Log/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/addm" element={<Addm/>} />
        <Route path="/detail/:id" element={<Detail/>} />
      </Routes>
    </div>
    </Appstate.Provider>
  );
}

export default App;

export {Appstate};
