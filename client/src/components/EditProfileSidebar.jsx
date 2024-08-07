/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { InputText, Sidebar, Avatar, FileUpload, Button, Password, FloatLabel } from 'primereact';
import { useState, useContext } from 'react';
import { UserContext } from './UserContext';

const EditProfileSidebar = ({ visible, onHide }) => {
    const token = localStorage.getItem('token');
    const { setUserInfo, userInfo } = useContext(UserContext);
    const [name, setName] = useState(userInfo.name);
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const [isEditingImage, setIsEditingImage] = useState(false);
    const [editDetails, setEditDetails] = useState(false);

    const handleUpload = (event) => {
        console.log("hi");
        const file = event.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const binaryData = e.target.result;
                const base64String = arrayBufferToBase64(binaryData);              
                setImage(`data:image/jpeg;base64,${base64String}`);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const handleImageSave = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile/image`, {
            method: 'PUT',
            body: JSON.stringify({ image }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data.userDoc);
            setImage('');
            setIsEditingImage(false);
        }
    };

    const handleCancelEditImage = () => {
        setIsEditingImage(false);
    };

    const handleSaveProfile = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            method: 'PUT',
            body: JSON.stringify({ name, password }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            }
        });
        if (response.ok) {
            const data = await response.json();
            setUserInfo(data.userDoc);
        }
        setEditDetails(false);
    };

    return (
        <Sidebar visible={visible} onHide={onHide} position="right">
            <div className="flex flex-column align-items-center h-full justify-content-center">
                <h3>Edit Profile</h3>
                <div className="field">
                    <Avatar image={image ? image : userInfo.imageData} shape="circle" size="xlarge" />
                </div>
                {isEditingImage ? (
                    <>
                        <FileUpload
                            mode="basic"
                            name="profilePic"
                            accept="image/*"
                            customUpload
                            uploadHandler={handleUpload}
                        />
                        <div className="flex justify-content-center w-full mt-2">
                            <Button label="Cancel" onClick={handleCancelEditImage} className="p-button-secondary p-mr-2" />
                            <Button label="Upload" icon="pi pi-check" className="p-button-success" onClick={handleImageSave} />
                        </div>
                    </>
                ) : (
                    <Button
                        label="Edit Image"
                        icon="pi pi-pencil"
                        onClick={() => setIsEditingImage(true)}
                        className="mt-2"
                    />
                )}
                <div className="field mt-4">
                    <FloatLabel>
                        <label htmlFor="username">Username</label>
                        <InputText disabled={!editDetails} id="username" value={name} onChange={(e) => setName(e.target.value)} />
                    </FloatLabel>
                </div>
                <div className="field mt-2">
                    <FloatLabel>
                        <label htmlFor="password">Password</label>
                        <Password disabled={!editDetails} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </FloatLabel>
                </div>
                <div className="flex justify-content-center w-full mt-4">
                    {
                        editDetails ? (
                            <>
                                <Button label="Cancel" onClick={() => setEditDetails(false)} className="p-button-secondary p-mr-2" />
                                <Button label="Save" icon="pi pi-check" onClick={handleSaveProfile} className="p-button-success" />
                            </>
                        ) : (
                            <Button label="Edit" icon="pi pi-pencil" className="mt-2" onClick={() => setEditDetails(true)} />
                        )
                    }
                </div>
            </div>
        </Sidebar>
    );
};

export default EditProfileSidebar;
