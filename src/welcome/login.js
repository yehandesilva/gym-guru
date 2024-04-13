import {useRef, useState} from "react";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import {AccountLogin} from "../api/databaseAPI";
import {Toast} from "primereact/toast";


const Login = ({setUser}) => {

    const toast = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async () => {
        const signInData = {
            username: username,
            password: password,
        }
        const res = await AccountLogin(signInData);
        if (res.ok) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'Logged In', life: 3000 });
            setUser(res.res);
        } else {
            toast.current.show({ severity: 'warn', summary: 'Unable to login', detail: res.res, life: 3000 });
        }
    }

    return (
        <>
            <Toast ref={toast}/>
            <div className='grid mt-2'>
                <div className='col-12 flex justify-content-center'>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                </div>
                <div className='col-12 flex justify-content-center mt-1'>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false}
                              placeholder="Password"/>
                </div>
                <div className='col-12 flex justify-content-center mt-4'>
                    <Button className='border-round-2xl border-primary text-900 font-bold' label="Sign In" outlined
                            onClick={() => signIn()}/>
                </div>
            </div>
        </>
    )
}

export default Login;

