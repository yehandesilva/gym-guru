import { Button } from 'primereact/button';
import {Image} from "primereact/image";
import gymGuruLogo from "./assets/logo.png";
import {Link, useLocation} from "react-router-dom";


const Header = ({user, setUser}) => {

    const location = useLocation();

    return (
        <>
            <div>
                <div className='flex mt-4 justify-content-center'>
                    {(location.pathname !== "/")?
                        <Link to="/" className="w-3 text-3xl pi pi-arrow-left text-primary align-content-center"></Link>
                        :
                        <div className="w-3"></div>
                    }
                    <Image className="flex justify-content-center" src={gymGuruLogo} alt="Image" width="300"/>
                    <div className="w-3 flex justify-content-end align-content-start">
                        <Button label="Logout" className="p-button-link text-2xl" onClick={() => {
                            setUser(null)
                        }}>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;