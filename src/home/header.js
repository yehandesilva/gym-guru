import { Button } from 'primereact/button';
import {Image} from "primereact/image";
import gymGuruLogo from "../assets/logo.png";


const Header = ({user, setUser}) => {


    return (
        <>
            <div>
                <div className='flex mt-4 justify-content-center'>
                    <div className="w-4"></div>
                    <Image src={gymGuruLogo} alt="Image" width="300"/>
                    <div className="w-4 flex justify-content-end align-content-start">
                        <Button label="Logout" className="p-button-link text-2xl" onClick={()=>{setUser(null)}}>
                        </Button>
                    </div>
                </div>
                <div className="flex ml-6 justify-content-start text-900 text-4xl font-medium mt-6">
                    <div>Hi,</div><div className='ml-2 text-primary'> {`${user.first_name}`}</div> <div className="ml-1">.</div>
                </div>
            </div>
        </>
    )
}

export default Header;