/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Card, ProgressSpinner, AutoComplete, Rating, Button, Divider } from "primereact";
import { useNavigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import '../index.css';
import 'primeflex/primeflex.css';
const preloadImages = (urls) => {
    return new Promise((resolve, reject) => {
        let loaded = 0;
        const total = urls.length;
        const images = [];

        if (total === 0) {
            resolve(images);
            return;
        }

        urls.forEach((url, index) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loaded += 1;
                images[index] = url;
                if (loaded === total) {
                    resolve(images);
                }
            };
            img.onerror = reject;
        });
    });
};

const Locations = ({ filterCity, filterTags }) => {
    const token = localStorage.getItem('token')
    const [locations, setLocations] = useState([]);
    const [dataTrue, setDataTrue] = useState(false);
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState([]);
    const [value, setValue] = useState(null);
    const [comments, setComments] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [isfiltered, setIsFiltered] = useState(false);
    const [recommendations, setRecommendations] = useState([0])
    const navigate = useNavigate();
    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };
    const fetchLocations = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`);
        const data = await response.json();
        setLocations(data);
        const commentsData = await fetch(`${import.meta.env.VITE_API_URL}/comments`);
        const comments = await commentsData.json();
        setComments(comments);
        const recommended = await fetch(`${import.meta.env.VITE_API_URL}/recommendations`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            }
        })
        const recommendation = await recommended.json();
        const filter = recommendation.map((recommend) => recommend.recommendations);
        setRecommendations(filter[0]);
        const imageUrls = data.flatMap(location => location.imageURLs);
        try {
            const preloadedImages = await preloadImages(imageUrls);
            setImagesLoaded(preloadedImages);
            setDataTrue(true);
        } catch (error) {
            console.error("Image preload failed", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();


    }, []);
    const handleCardClick = (location) => {
        navigate(`/location/${location._id}`, { state: { location } });
    };
    useEffect(() => {
        let filterData = []
        if (filterCity && filterTags) {
            filterData = locations.filter((location) => location.address.state === filterCity);
            if (filterData.length > 0) {
                setIsFiltered(true)
            }
            filterData = filterData.filter(location =>
                filterTags.every(filterTag =>
                    location.tags.some(tag => tag.name === filterTag.name)
                )

            );
            
        }
       else if (filterCity) {
            filterData = locations.filter((location) => location.address.state === filterCity);
            if (filterData.length > 0) {
                setIsFiltered(true)
            }
            
        }
        
       else if (filterTags) {
        const addedLocations = new Set();
        filterData = locations.filter(location => {
            // Check if location or its tags are null or undefined
            if (!location || !location.tags) {
                console.log('Skipping location due to null or undefined tags:', location);
                return false;
            }
        
            // Check if the location has already been added
            if (addedLocations.has(location.id)) {
                console.log('Skipping location as it is already added:', location);
                return false;
            }
        
            // Check if the location matches any filterTag
            const isMatching = filterTags.some(filterTag => 
                location.tags.some(tag => tag.name === filterTag.name)
            );
        
            // Add the location to the Set if it matches any filterTag
            if (isMatching) {
                console.log(`Location ${location.id} matches at least one filterTag and is added.`);
                addedLocations.add(location.id);
                return true;
            } else {
                console.log(`Location ${location.id} does not match any filterTag.`);
                return false;
            }
        });
            if (filterData.length > 0) {
                setIsFiltered(true)
            }
            
        }

        setFiltered(filterData);

    }, [filterCity, filterTags])

    const getRating = (locId) => {
        const filter = comments.filter((comment) => comment.location === locId);
        let sum = 0;
        filter.map((comment) => (
            sum += comment.rating
        ))
        sum = sum / filter.length;
        return sum;
    }
    if (loading) {
        return (
            <div className="flex justify-content-center align-items-center" style={{ width: '100%', height: '100vh' }}>
                <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
            </div>
        );
    }

    const searchTitle = (event) => {
        let results = [];
        if (!event.query.trim().length) {
            results = [...locations];
        } else {
            results = locations.filter(location =>
                location.title.toLowerCase().startsWith(event.query.toLowerCase())
            );
        }
        setSuggestions(results);
    };

    const displayLocations = suggestions.length ? suggestions : isfiltered ? filtered : [];
    return (
        <>

            <div className="flex justify-content-between" >
                <div >
                    {
                        isfiltered && <Button severity="danger" label="cancel" onClick={() => setIsFiltered(false)} style={{marginTop:'5px'}}> </Button>
                    }
                </div>

                <AutoComplete
                    value={value}
                    suggestions={suggestions}
                    completeMethod={searchTitle}
                    field="title"
                    placeholder="Search by title"
                    onChange={(e) => setValue(e.value)}
                    onClear={() => setSuggestions([])}
                    style={{ marginRight: '5px', marginTop: '5px', marginBottom: '5px' }}
                />
            </div>

            {
                displayLocations.length > 0 ? (
                    <div className="grid ml-2 grid-nogutter">
                        {displayLocations.map((location) => (
                            <div key={location._id} onClick={() => handleCardClick(location)} style={{ cursor: 'pointer' }} className="col-12 md:col-6 lg:col-3">
                                <Card
                                    className='mx-3 my-2'
                                    title={location.title}
                                    footer={<p><span className="pi pi-map-marker"></span> <b>{location.address.country}</b>, <b>{location.address.district}</b> <Rating value={getRating(location._id)} readOnly cancel={false} /></p>}
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
                ) : (
                    <>
                        {dataTrue && (
                            <>
                                {
                                    recommendations && <Divider align="center">
                                        <div className="inline-flex align-items-center">
                                            <b>Recommended for you</b>
                                        </div>
                                    </Divider>
                                }
                                <div className="grid ml-2 grid-nogutter">

                                    {recommendations && recommendations.map((location) => (
                                        <div key={location._id} onClick={() => handleCardClick(location)} style={{ cursor: 'pointer' }} className="col-12 md:col-6 lg:col-3">
                                            <Card
                                                className='mx-3 my-2'
                                                title={location.title}
                                                footer={<p><span className="pi pi-map-marker"></span> <b>{location.address.country}</b>, <b>{location.address.district}</b> <Rating value={getRating(location._id)} readOnly cancel={false} /></p>}
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
                        )}
                        {dataTrue && (
                            <> <Divider align="center">
                                <div className="inline-flex align-items-center">
                                    <b>All locations</b>
                                </div>
                            </Divider>
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
                        )}

                    </>
                )
            }

        </>
    );
};

export default Locations;
