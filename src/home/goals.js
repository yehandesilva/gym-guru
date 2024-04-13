import Header from "./header";
import {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {AddFitnessGoal, GetCompletedGoals, GetUncompletedGoals} from "../api/databaseAPI";
import Goal from "./goal";

const Goals = ({user, setUser}) => {

    const [ongoingGoals, setOngoingGoals] = useState([]);
    const [completedGoals, setCompletedGoals] = useState([]);
    const [modified, setModified] = useState(0);

    useEffect(() => {
        GetCompletedGoals(user.member_id).then((data) => {
            if (data.ok) {
                setCompletedGoals(data.res);
            } else {
                setCompletedGoals([]);
            }
        });
        GetUncompletedGoals(user.member_id).then((data) => {
            if (data.ok) {
                setOngoingGoals(data.res);
            } else {
                setOngoingGoals([]);
            }
        });
    }, [modified]);

    const createNewGoal = async () => {
        const newGoal = {
            member_id: user.member_id,
            name: "",
            end_date: new Date(),
            target_goal: 0,
            current_value: 0,
            completed: false,
        }
        await AddFitnessGoal(newGoal);
        setModified((prevState) => (prevState + 1) % 2);
    }

    return (
        <>
            <Header setUser={setUser}/>
            <div className="flex flex-wrap grid justify-content-center mt-8">
                <div className="text-xl mb-4 text-center w-full text-2xl">Ongoing Goals</div>
                {
                    (ongoingGoals.map((goal) => {
                        return (
                            <Goal fitnessGoal={goal} setModified={setModified}></Goal>
                        )
                    }))
                }
                <div className='m-1 col-12 flex justify-content-center'>
                    <Button className='border-round-2xl border-primary text-900 font-bold' label="New Goal" outlined
                            icon="pi pi-plus" onClick={() => createNewGoal()}/>
                </div>
                <div className="text-xl mt-6 mb-4 text-center w-full text-2xl">Completed Goals</div>
                {
                    (completedGoals.map((goal) => {
                        return (
                            <Goal fitnessGoal={goal} setModified={setModified}></Goal>
                        )
                    }))
                }
            </div>
        </>
    )
}

export default Goals;