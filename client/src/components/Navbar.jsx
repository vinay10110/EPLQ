/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { Avatar } from 'primereact/avatar';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import EditProfileSidebar from './EditProfileSidebar';
import FilterSidebar from './FilterSidebar';
import Locations from '../components/Locations';
import Mylocations from './Mylocations';
const Navbar = () => {
    const { userInfo } = useContext(UserContext);
    const [locationsTrue, setLocationsTrue] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [filterSidebarVisible, setFilterSidebarVisible] = useState(false);
    const [filterCity, setFilterCity] = useState();
    const [filterTags, setFilterTags] = useState();
    const history = useNavigate();


    const handleProfileClick = () => {
        setSidebarVisible(true);
    };

    const handleSidebarHide = () => {
        setSidebarVisible(false);
    };

    const handleFilterSidebarHide = () => {
        setFilterSidebarVisible(false);
    };

    const itemsUser = [
        { label: 'Home', icon: 'pi pi-home', },
        { label: 'Filter', icon: 'pi pi-search', command: () => setFilterSidebarVisible(true) },
    ];

    const itemsAdmin = [
        { label: 'Home', icon: 'pi pi-home',command:()=>setLocationsTrue(false) },
        { label: 'Filter', icon: 'pi pi-search', command: () => setFilterSidebarVisible(true) },
        { label: 'My locations', icon: 'pi pi-search',command:()=>setLocationsTrue(true) },
        { label: 'Post Locations', icon: 'pi pi-plus-circle', command: () => history('/postlocation') },
    ];

    const items = userInfo.type === 'Admin' ? itemsAdmin : itemsUser;


    const end = (
        <div className="flex align-items-center gap-2">
            <Avatar 
                image={userInfo.imageData} 
                shape="circle" 
                onClick={handleProfileClick}
                style={{ cursor: 'pointer' }}
            />
        </div>
    );
    return (
        <>
            <Menubar model={items} end={end} />
            <EditProfileSidebar
                visible={sidebarVisible}
                onHide={handleSidebarHide}
            />
            <FilterSidebar
                visible={filterSidebarVisible}
                onHide={handleFilterSidebarHide}
                setFilterCity={setFilterCity}
                setFilterTags={setFilterTags}
            />
            {
                !locationsTrue ?<Locations filterCity={filterCity} filterTags={filterTags} /> : <Mylocations />
            }
            
        </>
    );
};

export default Navbar;
