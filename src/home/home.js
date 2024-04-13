import {useRef} from "react";
import {Toast} from "primereact/toast";
import Header from "./header";


const Home = ({user, setUser}) => {

    const toast = useRef(null);

    return (
        <>
            <Toast ref={toast}/>
            <Header user={user} setUser={setUser}/>
        </>
    )
}

export default Home;

