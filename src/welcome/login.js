import {useState} from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='grid mt-2'>
            <div className='col-12 flex justify-content-center'>
                <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
            </div>
            <div className='col-12 flex justify-content-center mt-1'>
                <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="Password"/>
            </div>
            <div className='col-12 flex justify-content-center mt-4'>
                <Button className='border-round-2xl border-primary text-900 font-bold' label="Sign In" outlined/>
            </div>
        </div>
    )
}

export default Login;

