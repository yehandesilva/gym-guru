import {useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";
import Header from "../header";
import {DataView} from "primereact/dataview";
import {Link} from "react-router-dom";


const MemberHome = ({user, setUser}) => {

    const toast = useRef(null);
    const [pages, setPages] = useState([]);

    const _pages = [
        {
            name: "Goals",
            icon: "pi pi-flag-fill",
            link: "goals"
        },
        {
            name: "Sessions",
            icon: "pi pi-book",
            link: "sessions"
        },
        {
            name: "Classes",
            icon: "pi pi-building",
            link: "classes"
        },
        {
            name: "Profile",
            icon: "pi pi-user-edit",
            link: "profile",
        },
    ];

    useEffect(() => {
        setPages(_pages);
    }, []);

    const gridItem = (page) => {
        const handleItemClick = () => {

        };
        return (
            <Link to={page.link} className="col-12 sm:col-6 lg:col-12 xl:col-4 px-3 py-2 w-3 border-primary text-primary" key={page.name}
                 onClick={handleItemClick}>
                <div className="grid mt-1 p-4 border-2 border-round-xl justify-content-center text-center">
                    <div className="col-12">
                        <div className={`${page.icon} text-8xl`}></div>
                    </div>
                    <div className="flex flex-column col-12 align-items-center gap-1">
                        <div className="text-6xl font-bold">{page.name}</div>
                    </div>
                </div>
            </Link>

        );
    };

    const itemTemplate = (icon) => {
        if (!icon) {
            return;
        }
        return gridItem(icon);
    };

    return (
        <>
            <Toast ref={toast}/>
            <Header user={user} setUser={setUser}/>
            <div className="flex ml-6 justify-content-start text-900 text-6xl font-medium mt-6">
                <div>Hi,</div>
                <div className='ml-2 text-primary'> {`${user.first_name}`}</div>
                <div className="ml-1">.</div>
            </div>
            <div className="card mt-7 p-4">
                <DataView value={pages} itemTemplate={itemTemplate} layout="grid"/>
            </div>
        </>
    )
}

export default MemberHome;

