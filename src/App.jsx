import { useState } from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Destination from "./Pages/Destination";
import Home from "./Pages/Home";
import Crew from "./Pages/Crew";
import Technology from "./Pages/Technology";
import "./sass/index.scss"

function App() {

  const ENDPOINT_JSON = "https://raw.githubusercontent.com/ManukBASS/Space_Tourism/main/src/assets/JSON/data.json"

  const getData = async () => {
    const res = await fetch(ENDPOINT_JSON)
    const data = await res.json()
    return data
  }

  const location = useLocation().pathname
  const extraClass = location.split("/")[1]

  return (
    <div className={"main " + extraClass}>
      <Navbar currentRoute={extraClass}/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/destination" element={<Destination data={getData()} />} />
        <Route path="/crew" element={<Crew data={getData()} />}/>
        <Route path="/technology" element={<Technology data={getData()} />}/>
      </Routes>
    </div>
  );
}

export default App;
