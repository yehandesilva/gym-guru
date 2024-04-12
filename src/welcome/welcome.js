import gymGuruLogo from "../assets/logo.png";

import {useState} from "react";
import { Image } from 'primereact/image';
import Login from './login';
import RegisterForm from "./registerForm";
import {Button} from "primereact/button";
import { Ripple } from 'primereact/ripple';

const Welcome = () => {

    const [login, setLogin] = useState(true);
    return (
        <div className='flex mt-8 justify-content-center align-content-center'>
            <div className='mt-8'>
                {/* Gym Guru Logo and welcome text */}
                <div className='flex justify-content-center'>
                    <Image src={gymGuruLogo} alt="Image" width="350"/>
                </div>
                <div className="flex justify-content-center text-900 text-4xl font-medium mt-6">
                    {
                        (login) ? "Welcome." : "Unlock your fitness potential today."
                    }
                </div>
                <div className='flex mt-4 justify-content-center'>
                    <Button className='p-ripple'
                            label={(login) ? "Create an account today." : "Already have an account? Login."}
                            onClick={() => {
                                setLogin(!login)
                            }} link/>
                    <Ripple/>
                </div>
                <div className='flex justify-content-center mt-4'>
                    {
                        (login) ?
                            <Login setLogin={setLogin}/>
                            :
                            <RegisterForm setLogin={setLogin}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Welcome;