//prime react
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/vela-green/theme.css';
import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';

import './App.css';

import {Routes, Route, Navigate} from 'react-router-dom';
import Welcome from "./welcome/welcome";
import {useState} from "react";
import MemberHome from "./member/memberHome";
import Profile from "./member/profile"
import Goals from "./member/goals";
import Classes from "./member/classes";
import Sessions from "./member/sessions";
import TrainerHome from "./trainer/trainerHome";
import TrainerSessions from "./trainer/trainerSessions";
import SearchMembers from "./trainer/searchMembers";

function App() {

    const [user, setUser] = useState();

    return (
        <>
            {
                (!user)?
                    <Routes>
                        <Route path="/" element={<Welcome user={user} setUser={setUser}/>} />
                        <Route path="*" element={<Navigate replace to="/" />} />
                    </Routes>
                    :
                    (user.type === 'member')?
                        <Routes>
                            <Route path="/" element={<MemberHome user={user} setUser={setUser}/>} />
                            <Route path="/goals" element={<Goals user={user} setUser={setUser}/>} />
                            <Route path="/sessions" element={<Sessions user={user} setUser={setUser}/>} />
                            <Route path="/classes" element={<Classes user={user} setUser={setUser}/>} />
                            <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
                            <Route path="*" element={<Navigate replace to="/" />} />
                        </Routes>
                        :
                        <Routes>
                            <Route path="/" element={<TrainerHome user={user} setUser={setUser}/>} />
                            <Route path="/searchMembers" element={<SearchMembers user={user} setUser={setUser}/>} />
                            <Route path="/trainerSessions" element={<TrainerSessions user={user} setUser={setUser}/>} />
                            <Route path="*" element={<Navigate replace to="/" />} />
                        </Routes>
            }
        </>
    );
}

export default App;
