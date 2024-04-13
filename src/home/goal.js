import {useEffect, useState} from "react";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import { Checkbox } from 'primereact/checkbox';
import {UpdateFitnessGoal} from "../api/databaseAPI";

const Goal = ({fitnessGoal, setModified}) => {

    const[goal, setGoal] = useState({
        member_id: -1,
        name: "",
        end_date: new Date(),
        target_goal: 0,
        current_value: 0,
        completed: false,
    });

    useEffect(() => {
        setGoal(fitnessGoal);
    }, []);

    const onChange = (field, value) => {
        setGoal({...goal, [field]:value});
    }

    const onBlur = async (field, value) => {
        const _goal = ({...goal, [field]:value});
        await UpdateFitnessGoal(_goal);
        setModified((prevState) => (prevState + 1) % 2);
    }

    return (
        <>
            <ul className="flex flex-wrap list-none p-0 m-0 mt-2 p-1 w-full mx-8 justify-content-center">
                <li className="flex-column px-2 col-2">
                    <div className="text-500 w-full font-medium">Completed</div>
                    <div className="text-900 w-full mt-2 ">
                        <Checkbox className="w-full" onChange={e => onBlur('completed', e.checked)} checked={goal.completed}></Checkbox>
                    </div>
                </li>
                <li className="flex-column px-2 col-4">
                    <div className="text-500 w-full font-medium">Name</div>
                    <div className="text-900 w-full ">
                        <InputText className="w-full" value={goal.name}
                                   onChange={(e) => onChange('name', e.target.value)}
                                   onBlur={(e) => onBlur('name', e.target.value)}/>
                    </div>
                </li>
                <li className="flex-column px-2 col-2">
                    <div className="text-500 w-full font-medium">Current Value</div>
                    <div className="text-900 w-full ">
                        <InputNumber className="w-full" value={goal.current_value}
                                     onValueChange={(e) => onChange('current_value', e.target.value)}
                                     onBlur={(e) => onBlur('current_value', e.target.value)}/>
                    </div>
                </li>
                <li className="flex-column px-2 col-2">
                    <div className="text-500 w-full font-medium">Target Goal</div>
                    <div className="text-900 w-full ">
                        <InputNumber className="w-full" value={goal.target_goal}
                                     onValueChange={(e) => onChange('target_goal', e.target.value)}
                                     onBlur={(e) => onBlur('target_goal', e.target.value)}/>
                    </div>
                </li>
                <li className="flex-column px-2 col-2">
                    <div className="text-500 w-full font-medium">End Date</div>
                    <div className="text-900 w-full ">
                        <Calendar value={goal.end_date} onChange={(e) => onBlur('end_date', new Date(e.value))} showButtonBar/>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default Goal;