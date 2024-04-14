import Header from "../header";
import {useEffect, useState} from "react";
import {SearchSpecifiedMembers} from "../api/databaseAPI";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const SearchMembers = ({user, setUser}) => {

    const [modified, setModified] = useState(0);
    const [members, setMembers] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    useEffect(() => {
        SearchSpecifiedMembers(firstName, lastName).then((data) => {
            if (data.ok) {
                setMembers(data.res);
            } else {
                setMembers([]);
            }
        });
    }, [modified]);

    const onSearch = () => {
        setModified((prevState) => (prevState + 1) % 2);
    }

    return (
        <>
            <Header user={user} setUser={setUser}/>
            <div className="grid mt-4 w-full justify-content-center">
                <div className="col-2 flex flex-column align-items-center">
                    <label htmlFor="firstName" className="mb-2">First Name</label>
                    <InputText id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div className="col-2 flex flex-column align-items-center">
                    <label htmlFor="lastName" className="mb-2">Last Name</label>
                    <InputText id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </div>
            </div>
            <div className='col-12 flex justify-content-center mt-2'>
                <Button className='border-round-2xl border-primary text-900 font-bold'
                        icon="pi pi-search" label="Search" outlined onClick={() => onSearch()}/>
            </div>
            <div className="text-xl mb-2 mt-6 text-center w-full text-4xl">Members</div>
            <div className="px-5">
                <DataTable value={members} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="first_name" header="First Name"></Column>
                    <Column field="last_name" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="date_of_birth" header="Date of Birth"></Column>
                    <Column field="height" header="Height"></Column>
                    <Column field="weight" header="Weight"></Column>
                </DataTable>
            </div>
        </>
    )
}

export default SearchMembers;