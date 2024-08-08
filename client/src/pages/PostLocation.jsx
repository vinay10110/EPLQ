/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { StepperPanel } from 'primereact/stepperpanel';
import { useNavigate, useParams } from 'react-router-dom';
import LocationDetails from './LocationDetails';
import { FileUpload, Dialog, Button, Tooltip, Toast, Tag, Stepper } from 'primereact';
import { ProgressBar } from 'primereact/progressbar';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import Mapper from '../components/Mapper';

const LocationForm = () => {
  const locationUpdate = useParams();
  const token = localStorage.getItem('token');
  const toast = useRef(null);
  const stepperRef = useRef(null);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [displayDialog, setDisplayDialog] = useState(false);
  const [location, setLocation] = useState({
    latitude: '',
    longitude: '',
    title: '',
    description: '',
    category: '',
    address: {},
    openingTime: '',
    closingTime: '',
    contactPhone: '',
    contactEmail: '',
    contactWebsite: '',
    tags: [],
    imageURLs: [],
    additionalNotes: '',
  });
  const fetchLocation = async (id) => {
    if (!id) return;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/locations/${id}`,{
      headers:{
        'content-type':'application/json',
        'Authorization':`${token}`
      }
    });
    const result = await response.json();
    setLocation(result);
  };

  useEffect(() => {
    if (locationUpdate.id) {
      setUpdate(true);
      fetchLocation(locationUpdate.id);
    }
  }, [locationUpdate]);


  const handlecoordinates = (coords) => {
    setLocation((prev) => ({
      ...prev,
      latitude: coords[0],
      longitude: coords[1],
    }))

  }
  const handleAddress = (address) => {
    setLocation((prev) => ({
      ...prev,
      address: address
    }))

  }
  const handleSubmit = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`, {
      method: 'POST',
      body: JSON.stringify(location),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    })
    if (response.ok) {
      setLocation({
        latitude: '',
        longitude: '',
        title: '',
        description: '',
        category: '',
        address: {},
        openingTime: '',
        closingTime: '',
        contactPhone: '',
        contactEmail: '',
        contactWebsite: '',
        tags: [],
        imageURLs: [],
        additionalNotes: '',
      });
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Location posted successfully!', life: 3000 });
      navigate('/dashboard');
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  };



  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);

  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };




  const onTemplateUpload = async (e) => {
    const files = e.files;
    if (files.length > 0) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setLocation((prevLocation) => ({
            ...prevLocation,
            imageURLs: [...prevLocation.imageURLs, ...urls],
          }));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('You can upload up to 6 images');
    }
  };
  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };
  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

    return (
      <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 10 MB</span>
          <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
        </div>
      </div>
    );
  };
  const removeImage = (image) => {
    const filter = location.imageURLs.filter((imageURL) => imageURL !== image);
    setLocation((prev) => ({
      ...prev,
      imageURLs: filter
    }))
  }
  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: '40%' }}>
          <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
        <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
      </div>
    );
  };
  const emptyTemplate = () => {
    if (update)
      return (
        <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center " style={{ width: '40%' }}>
            {
              location.imageURLs.map((image) => (<>
                <div className='flex '>
                  <img role="presentation" src={image} width={100} />

                  <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => removeImage(image)} />
                </div>
              </>
              ))
            }

          </div>


        </div>
      )
    else return (
      <div className="flex align-items-center flex-column">
        <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
        <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
          Note: first image will be the main image of the location
        </span>
      </div>
    );
  };
  const handleSubmitUpdate = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/locations`, {
      method: 'PUT',
      body: JSON.stringify({locationUpdate, location}),
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    })
    if (response.ok) {
      navigate('/dashboard')
    }
  }
  const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };
  return (
    <>
    <div className='flex flex-column'>
    <div className='flex justify-content-end'>
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
        <span className='pi pi-times' style={{ fontSize: '1.5rem' }}></span>
      </button>
    </div>
      
      <Toast ref={toast} />
      <div className=" flex justify-content-center">

        <Stepper ref={stepperRef} style={{ flexBasis: '50rem' }}>
          <StepperPanel header="Post Location Images">
           
              <div>
                

                  <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                  <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                  <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

                  <FileUpload ref={fileUploadRef} name="demo[]" multiple accept="image/*" maxFileSize={10000000} customUpload
                    uploadHandler={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                    headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                    chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                
             
            </div>
            <div className="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Post Location Details">
           

           <div className='flex justify-content-center'> 
                <LocationDetails location={location} setLocation={setLocation} />
                </div>
              
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" onClick={() => stepperRef.current.nextCallback()} />
            </div>
          </StepperPanel>
          <StepperPanel header="Select Coordinate">
            
                <div className='flex justify-content-center flex-column' >
                  <div  className='flex justify-content-center'>
                  <Button label="Select Location" icon="pi pi-map-marker" onClick={() => setDisplayDialog(true)} />
                  <Dialog header="Select Location" visible={displayDialog} style={{ width: '50vw' }} onHide={() => setDisplayDialog(false)}>
                    <Mapper setCoordinates={handlecoordinates} setAddress={handleAddress} />
                  </Dialog>
                  </div>
                 <div  className='flex justify-content-center '>
                 
                 <p> <b>Longitude</b>:{location.longitude}</p>
                 </div>
                 <div  className='flex justify-content-center '>
                 <p> <b>Latitude</b>:{location.latitude}</p>
                
                 </div>
                </div>
             
            <div className="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              {
                update ? <Button label="Update Location" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmitUpdate} /> :
                  <Button label="Post Location" icon="pi pi-arrow-right" iconPos="right" onClick={handleSubmit} />
              }
            </div>
          </StepperPanel>
        </Stepper>
      </div>
      </div>
    </>
  );
};

export default LocationForm;
