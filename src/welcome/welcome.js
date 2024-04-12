import gymGuruLogo from "../assets/logo.png";

import {useState} from "react";
import { Image } from 'primereact/image';
import Login from './login';
import RegisterForm from "./registerForm";

const Welcome = () => {

    const [login, setLogin] = useState(true);
    return (
        <div className='mt-8'>
            {/* Gym Guru Logo and welcome text */}
            <div className='flex justify-content-center'>
                <Image src={gymGuruLogo} alt="Image" width="250" />
            </div>
            <div className='flex justify-content-center mt-6'>
                {
                    (login)?
                        <Login setLogin={setLogin}/>
                        :
                        <RegisterForm setLogin={setLogin}/>
                }
            </div>
        </div>
    )
}

export default Welcome;