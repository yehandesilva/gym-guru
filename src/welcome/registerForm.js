import {useRef, useState} from "react";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {FloatLabel} from "primereact/floatlabel";
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber'
import { Dialog } from 'primereact/dialog';
import Subscriptions from "../subscriptions";
import {RegisterMember} from "../databaseAPI";
import {Password} from "primereact/password";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

const RegisterForm = () => {

    const toast = useRef(null);
    const [first_name, set_first_name] = useState("");
    const [last_name, set_last_name] = useState("");
    const [email, set_email] = useState("");
    const [date_of_birth, set_date_of_birth] = useState(null);
    const [username, set_username] = useState("");
    const [password, set_password] = useState("");
    const [height, set_height] = useState();
    const [weight, set_weight] = useState();
    const [planDialogVisible, setPlanDialogVisible] = useState(false);
    const [subscription_id, set_subscription_id] = useState(-1);

    const formComplete = () => {
        return !(first_name !== "" &&
            last_name !== "" &&
            email !== "" &&
            date_of_birth !== "" &&
            username !== "" &&
            password !== "" &&
            height !== null &&
            weight !== null &&
            subscription_id !== -1
        )
    }

    const registerUser = async () => {
        const memberData = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            date_of_birth: date_of_birth,
            username: username,
            password: password,
            height: height,
            weight: weight,
            subscription_id: subscription_id,
        }
        const res = await RegisterMember(memberData);
        if (res === true) {
            toast.current.show({ severity: 'info', summary: 'Success', detail: 'You have registered', life: 3000 });
        } else {
            toast.current.show({ severity: 'warn', summary: 'Failed', detail: res, life: 3000 });
        }
    }

    const confirmRegistration = () => {
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
        });
    };

    const accept = async () => {
        await registerUser();
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Dialog header="Subscriptions" visible={planDialogVisible} style={{ width: '50vw' }}  onHide={() => setPlanDialogVisible(false)} closable={true}>
                <Subscriptions subscription_id={subscription_id} set_subscription_id={set_subscription_id}/>
            </Dialog>
            <div className='grid mt-4 w-5'>
                <div className='col-6 flex justify-content-center'>
                    <FloatLabel>
                        <InputText value={first_name} onChange={(e) => set_first_name(e.target.value)}/>
                        <label htmlFor="firstName">First Name</label>
                    </FloatLabel>
                </div>
                <div className='col-6 flex justify-content-center'>
                    <FloatLabel>
                        <InputText value={last_name} onChange={(e) => set_last_name(e.target.value)}/>
                        <label htmlFor="lastName">Last Name</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <InputText value={email} onChange={(e) => set_email(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <Calendar value={date_of_birth} onChange={(e) => set_date_of_birth(e.value)} showButtonBar/>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <InputNumber value={height} onValueChange={(e) => set_height(e.value)} min={0} max={999.99}
                                     minFractionDigits={2} maxFractionDigits={2} suffix=" cm"/>
                        <label htmlFor="height">Height</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <InputNumber value={weight} onValueChange={(e) => set_weight(e.value)} min={0} max={999.99}
                                     minFractionDigits={2} maxFractionDigits={2} suffix=" kg"/>
                        <label htmlFor="weight">Weight</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <InputText value={username} onChange={(e) => set_username(e.target.value)}/>
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                </div>
                <div className='col-6 mt-2 flex justify-content-center'>
                    <FloatLabel>
                        <Password value={password} onChange={(e) => set_password(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                    </FloatLabel>
                </div>
                <div className='col-12 flex justify-content-center mt-2'>
                    <Button className='border-round-2xl border-primary text-900 font-bold' label="Select a Plan"
                            outlined onClick={() => setPlanDialogVisible(true)}/>
                </div>
                <div className='col-12 flex justify-content-center mt-2'>
                    <Button className='border-round-2xl border-primary text-900 font-bold' label="Register" outlined
                            disabled={formComplete()} onClick={() => confirmRegistration()}/>
                </div>
            </div>
        </>
    )
}

export default RegisterForm;