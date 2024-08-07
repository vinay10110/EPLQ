/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { UserContext } from '../components/UserContext';
import { Carousel, Button, Chips, ProgressSpinner } from 'primereact';
import Comments from '../components/Comments';
import PostLocation from '../pages/PostLocation';

const LocationPage = () => {
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState([0, 0]);
  const [location, setLocation] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [loadDirection, setLoadDirection] = useState(false);
  const [route, setRoute] = useState([]);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const DynamicMap = ({ route, userLoc, coordinates }) => {
    const map = useMap();

    useEffect(() => {
      if (route.length > 0 && userLoc) {
        const bounds = [userLoc, coordinates];
        map.fitBounds(bounds);
      }
    }, [route, userLoc, coordinates, map]);

    return null;
  };

  const fetchLocationDetails = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/locations/${id}`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `${token}`
        },
      });
      const result = await response.json();
      setLocation(result);
      setCoordinates([result.longitude, result.latitude]);
      setImageUrls(result.imageURLs);

    } catch (error) {
      console.error('Error fetching location details:', error);
    }
   setLoading(false)
  };
  useEffect(() => {
    fetchLocationDetails();
   
  }, [id]);
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const imageTemplate = (url) => (
    <div className="p-grid p-nogutter p-justify-center">
      <img src={url} alt="Location Image" style={{ width: '100%', borderRadius: '8px' }} />
    </div>
  );

  const handleLocDelete = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`,
      },
    });
    if (response.ok) {
      navigate('/dashboard');
    }
  };

  const handleLocUpdate = () => {
    navigate(`/postlocation/update/${location._id}`, { state: { location } });
  };

  const fetchRoute = async (start, end) => {
    setLoadDirection(true);
    const stops = `${start[0]},${start[1]};${end[0]},${end[1]}`;
    const url = `https://trueway-directions2.p.rapidapi.com/FindDrivingRoute?stops=${encodeURIComponent(stops)}`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '344b6cfffamshb0dac064337b943p180c04jsn6702bb3313d0',
        'x-rapidapi-host': 'trueway-directions2.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const coordinates = result.route.geometry?.coordinates;
      setRoute(coordinates.map((coord) => [coord[0], coord[1]]));
    } catch (error) {
      console.error('Error fetching route:', error);
    }
    setLoadDirection(false);
  };

  const handleShowRoute = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLoc = [position.coords.latitude, position.coords.longitude];
        setUserLocation(userLoc);
        fetchRoute(userLoc, coordinates);
      });
    }
  };

  return (
    <>

      {
        !loading ? (<div className="surface-section">
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
            }}
          >
            <span className="pi pi-times" style={{ fontSize: '1.5rem' }}></span>
          </button>
          <div className="font-medium text-3xl text-900 mb-3" style={{ textAlign: 'center' }}>
            Location Information
          </div>

          <div className="card">
            <Carousel
              value={imageUrls}
              numVisible={1}
              numScroll={1}
              responsiveOptions={responsiveOptions}
              circular
              autoplayInterval={3000}
              itemTemplate={imageTemplate}
              style={{ maxWidth: '700px', margin: '0 auto' }}
            />
          </div>

          <div className="flex justify-content-center">
            {userInfo._id === location.user && (
              <>
                <Button style={{ marginRight: '5px',marginBottom:'5px' }} onClick={handleLocUpdate}>
                  Edit
                </Button>
                <Button severity="danger" style={{marginBottom:'5px' }} onClick={() => handleLocDelete(location._id)}>
                  Delete
                </Button>
              </>
            )}
            {updating && <PostLocation locationUpdate={location} />}
          </div>

          <ul className="list-none p-0 m-0">
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Title</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.title}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Category</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.category}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Description</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.description}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Tags</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                <Chips value={location.tags?.map((tag) => tag.name)} disabled />
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Opening time</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.openingTime}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Closing time</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.closingTime}</div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Address</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {location.address?.country},{location.address?.state},{location.address?.district}
              </div>
            </li>
            <li className="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
              <div className="text-500 w-6 md:w-2 font-medium">Contact no</div>
              <div className="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{location.contactPhone}</div>
            </li>
          </ul>


          <div style={{ height: '400px', marginTop: '1rem' }}>
            <MapContainer center={coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{location.title}</Popup>
              </Marker>
              {route.length > 0 && userLocation && (
                <>
                  <Marker position={userLocation}>
                    <Popup>Your Location</Popup>
                  </Marker>
                  <Polyline positions={route} color="blue" />
                  <DynamicMap route={route} userLoc={userLocation} coordinates={coordinates} />
                </>
              )}
            </MapContainer>



          </div>
          <div className='flex justify-content-center ' style={{ height: 'fit-content', marginTop: '10px',marginBottom:'10px' }}>
            {loadDirection ? (
              <ProgressSpinner />
            ) : (
              <Button
                className="p-button-secondary"
                icon="pi pi-directions"
                label="Show Route"
                onClick={handleShowRoute}
              />
            )}
          </div>
          {
            userInfo.type === 'User' && <div className="card">
              <Comments locId={id} />
            </div>
          }

        </div>) : (
          <div style={{width:'100%',height:'100vh'}} className='flex justify-content-center align-items-center'>
 <ProgressSpinner />
          </div>
         
        )
      }
    </>
  );
};

export default LocationPage;
