//prime react
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/vela-green/theme.css';
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';

import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import Welcome from "./welcome/welcome";
import {useState} from "react";


function App() {

    const [user, setUser] = useState();

    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome setUser={setUser}/>} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );
}

export default App;
