/* eslint-disable react/prop-types */
import { useState, useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { Dropdown } from 'primereact/dropdown';
import { Avatar } from 'primereact/avatar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import EditProfileSidebar from './EditProfileSidebar';
import FilterSidebar from './FilterSidebar';
import Locations from '../components/Locations';
import Mylocations from './Mylocations';
const Navbar = () => {
    const { userInfo } = useContext(UserContext);
    const [selectedOption, setSelectedOption] = useState(null);
    const [locationsTrue, setLocationsTrue] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [filterSidebarVisible, setFilterSidebarVisible] = useState(false);
    const [filterCity, setFilterCity] = useState();
    const [filterTags, setFilterTags] = useState();
    const history = useNavigate();

    const profileOptions = [
        { label: 'Edit', value: 'edit' },
        { label: 'Logout', value: 'logout' }
    ];

    const handleOptionChange = (e) => {
        const value = e.value;
        setSelectedOption(value);
        if (value === 'logout') {
            confirmDialog({
                message: 'Are you sure you want to log out?',
                header: 'Logout Confirmation',
                icon: 'pi pi-info-circle',
                accept: () => {
                    localStorage.clear();
                    history('/');
                    setSelectedOption(null);
                },
                reject: () => {
                    setSelectedOption(null);
                }
            });
        } else if (value === 'edit') {
            setSidebarVisible(true);
        }
    };

    const handleSidebarHide = () => {
        setSidebarVisible(false);
        setSelectedOption(null);
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
            <Dropdown
                value={selectedOption}
                onChange={handleOptionChange}
                options={profileOptions}
                placeholder="Profile"
                className="w-10rem"
            />
            <Avatar image={userInfo.imageData} shape="circle" />
        </div>
    );
    return (
        <>
            <Menubar model={items} end={end} />
            <ConfirmDialog />
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
