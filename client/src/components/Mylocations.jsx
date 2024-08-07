/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import { Card, Rating,ProgressSpinner } from 'primereact'
import { UserContext } from './UserContext'
import { useNavigate } from 'react-router-dom'
const Mylocations = () => {
    const [locations, setLocations] = useState([]);
   const [comment,setComment]=useState([]);
    const { userInfo } = useContext(UserContext);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };
    const fetchLocations = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
            const data = await response.json();
            const filteredLocations = data.filter((loc) => loc.user._id === userInfo._id);
            setLocations(filteredLocations);
    
            const commentsData = await fetch(`${import.meta.env.VITE_API_URL}/comments`);
            const commentsResult = await commentsData.json();
            setComment(commentsResult || []);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchLocations();
    }, [])
    const handleCardClick = (location) => {
        navigate(`/location/${location._id}`, { state: { location } });
    };
    const getRating = (locId) => {
        const filterData = comment.filter((comment) => comment.location === locId);
        if (filterData.length === 0) return 0; // Return 0 if no comments
        const sum = filterData.reduce((acc, curr) => acc + curr.rating, 0);
        return sum / filterData.length;
    }
    return (
        <div>
            {
                !loading ? (
                    <>
                        <div className="grid ml-2 grid-nogutter">

                            {locations.map((location) => (

                                <div key={location._id} onClick={() => handleCardClick(location)} style={{ cursor: 'pointer' }} className="col-12 md:col-6 lg:col-3">
                                    <Card
                                        className='mx-3 my-2'
                                        title={location.title}
                                        footer={<p><span className="pi pi-map-marker"></span> <b>{location.address.country}</b>, <b>{location.address.district}</b> <div style={{ marginTop: '5px' }}><Rating value={getRating(location._id)} readOnly cancel={false} /></div></p>}
                                        header={

                                            <img src={location.imageURLs[0]} alt={location.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />

                                        }
                                        style={{ height: 'fit-content' }}
                                    >
                                        <p className="m-0">{truncateDescription(location.description, 100)}</p>

                                    </Card>
                                </div>

                            ))}
                        </div>
                    </>
                ) : (

                    <>
                    <div className='flex justify-content-center align-items-center' style={{width:'100%',height:'100vh'}}>
<ProgressSpinner />
                    </div>
                    </>
                )
            }

        </div>
    )
}

export default Mylocations
