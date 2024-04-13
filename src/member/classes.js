import Header from "../header";
import {useEffect, useState} from "react";
import {GetAllClasses, GetUserClasses, JoinFitnessGlass, LeaveFitnessClass} from "../api/databaseAPI";
import {DataView} from "primereact/dataview";
import { Rating } from 'primereact/rating';
import {Button} from "primereact/button";

const Classes = ({user, setUser}) => {

    const [classes, setClasses] = useState([]);
    const [joinedClassIds, setJoinedClassIds] = useState([]);
    const [modified, setModified] = useState(0);

    useEffect(() => {
        GetAllClasses().then((data) => {
            if (data.ok) {
                setClasses(data.res);
            } else {
                setClasses([]);
            }
        });
        GetUserClasses(user.member_id).then((data) => {
            if (data.ok) {
                setJoinedClassIds((data.res).map((item) => item.fitness_class_id));
            } else {
                setJoinedClassIds([]);
            }
        });
    }, [modified]);

    const leaveJoinClass = async (joined, fitnessClassId) => {
        if (joined) {
            await LeaveFitnessClass(user.member_id, fitnessClassId);
        } else {
            await JoinFitnessGlass(user.member_id, fitnessClassId);
        }
        setModified((prevState) => (prevState + 1) % 2)
    }

    const gridItem = (classVal) => {
        // If user has joined this class
        const joined = joinedClassIds.includes(classVal.fitness_class_id);
        return (
            <div className={`col-12 sm:col-6 lg:col-12 xl:col-4 px-3 py-2 w-3 ${(joined)? "text-primary" : "text-red-400"}`} key={classVal.fitness_class_id}>
                <div className={`grid mt-1 p-4 border-2 border-round-xl justify-content-center text-center ${(joined)? "border-primary" : "border-red-400"}`}>
                    <div className="col-12">
                        <div className={`${(joined) ? "pi pi-search-minus" : "pi pi-search-plus"} text-8xl`}></div>
                    </div>
                    <div className="flex flex-column col-12 align-items-center gap-1">
                        <div className="text-6xl font-bold">{classVal.type}</div>
                        <div
                            className="text-2xl font-bold">{`Trainer: ${classVal.first_name} ${classVal.last_name}`}</div>
                        <Rating value={classVal.rating} readOnly cancel={false}
                                onIcon={<div className={`pi pi-star-fill ${(joined)? "text-primary" : "text-red-400"}`}/>}
                                offIcon={<div className={`pi pi-star ${(joined)? "text-primary" : "text-red-400"}`}/>}/>
                        <div className="text-lg font-bold mt-2">{`Room #: ${classVal.room_id}`}</div>
                        <div className="text-lg font-bold">{`Date: ${classVal.class_date}`}</div>
                    </div>
                    <div className='m-1 col-12 flex justify-content-center'>
                        {
                            (joined)?
                                <Button className='border-round-2xl border-white text-900 font-bold' label="Leave" outlined
                                        icon="pi pi-minus" onClick={() =>leaveJoinClass(joined, classVal.fitness_class_id)}/>
                                :
                                <Button className='border-round-2xl border-white text-900 font-bold' label="Join" outlined
                                        icon="pi pi-plus" onClick={() =>leaveJoinClass(joined, classVal.fitness_class_id)}/>
                        }
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (classVal) => {
        if (!classVal) {
            return;
        }
        return gridItem(classVal);
    };

    return (
        <>
            <Header setUser={setUser}/>
            <div className="card mt-7 p-4">
                <DataView value={classes} itemTemplate={itemTemplate} layout="grid"/>
            </div>
        </>
    )
}

export default Classes;