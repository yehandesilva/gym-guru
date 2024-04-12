import gymGuruLogo from "../assets/logo.png";

import './welcome.css';

const Welcome = () => {
    return (
        <div>
            {/* Gym Guru Logo and welcome text */}
            <img src={gymGuruLogo} className="logo" alt="Gym Guru logo"/>
            <h1 className="welcome">Welcome.</h1>
        </div>
    )
}

export default Welcome;