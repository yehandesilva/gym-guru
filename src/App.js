//prime react
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/vela-green/theme.css';
import "primeflex/primeflex.css";

import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import Welcome from "./welcome/welcome";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
        </>
    );
}

export default App;
