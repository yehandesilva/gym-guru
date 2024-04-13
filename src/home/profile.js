import Header from "./header";
import RegisterForm from "../welcome/registerForm";


const Profile = ({user, setUser}) => {


    return (
        <>
            <Header />
            <div className="flex justify-content-center mt-8">
                <RegisterForm user={user} setUser={setUser} update={true}/>
            </div>
        </>
    )
}

export default Profile;