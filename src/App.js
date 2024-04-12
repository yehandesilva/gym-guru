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
