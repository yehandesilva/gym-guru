import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {useState} from "react";
import {FloatLabel} from "primereact/floatlabel";

const RegisterForm = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const formComplete = () => {
        return !(firstName !== "" &&
            lastName !== "" &&
            email !== "" &&
            dateOfBirth !== "" &&
            username !== "" &&
            password !== ""
        )
    }

    return (
        <div className='grid mt-4 w-5'>
            <div className='col-6 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                    <label htmlFor="firstName">First Name</label>
                </FloatLabel>
            </div>
            <div className='col-6 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                    <label htmlFor="firstName">Last Name</label>
                </FloatLabel>
            </div>
            <div className='col-6 mt-2 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <label htmlFor="firstName">Email</label>
                </FloatLabel>
            </div>
            <div className='col-6 mt-2 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/>
                    <label htmlFor="firstName">Date of Birth</label>
                </FloatLabel>
            </div>
            <div className='col-6 mt-2 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="username">Username</label>
                </FloatLabel>
            </div>
            <div className='col-6 mt-2 flex justify-content-center'>
                <FloatLabel>
                    <InputText value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="password">Password</label>
                </FloatLabel>
            </div>
            <div className='col-12 flex justify-content-center mt-2'>
                <Button className='border-round-2xl border-primary text-900 font-bold' label="Select a Plan" outlined/>
            </div>
            <div className='col-12 flex justify-content-center mt-2'>
                <Button className='border-round-2xl border-primary text-900 font-bold' label="Register" outlined disabled={formComplete()}/>
            </div>
        </div>
    )
}

export default RegisterForm;