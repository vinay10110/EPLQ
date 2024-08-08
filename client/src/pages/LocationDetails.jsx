/* eslint-disable react/prop-types */
import { InputText, InputTextarea, Toast,MultiSelect,FloatLabel } from 'primereact';
import {  useRef,useState,useEffect } from 'react';
import tags from '../assets/Tags'
const LocationDetails = ({ location, setLocation }) => {
  const toast = useRef(null);
  const [selectedTags,setSelectedTags]=useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    setLocation((prev) => ({
      ...prev,
      tags: selectedTags,
    }));
  }, [selectedTags,setLocation]);
  return (
    <>
      <Toast ref={toast} />
      <div > 
        <div className='flex flex-column gap-6'>
        <div className='flex justify-content-between'>
          <FloatLabel>
          <label htmlFor="title">Title:</label>
          <InputText id="title" name="title" value={location.title} onChange={handleChange} required style={{ width: '100%' }} />
          </FloatLabel>
          <FloatLabel>
          <label htmlFor="category">Category:</label>
          <InputText id="category" name="category" value={location.category} onChange={handleChange} style={{ width: '100%' }} />
          </FloatLabel>
        </div>
        <div>
          <FloatLabel>
          <label htmlFor="description">Description:</label>
          <InputTextarea id="description" name="description" value={location.description} onChange={handleChange} rows={4} style={{ width: '100%' }} />
          </FloatLabel>
        </div>
        <div className='flex justify-content-between'>
               <FloatLabel>
               <label htmlFor="openingTime">Opening Time:</label>
               <InputText id="openingTime" name="openingTime" value={location.openingTime} onChange={handleChange} style={{ width: '100%' }} />
               </FloatLabel>
               <FloatLabel>
               <label htmlFor="closingTime">Closing Time:</label>
               <InputText id="closingTime" name="closingTime" value={location.closingTime} onChange={handleChange} style={{ width: '100%' }} />
               </FloatLabel>
        </div>
        <div className='flex justify-content-between'>
          <FloatLabel>
          <label htmlFor="contactPhone">Contact Phone:</label>
          <InputText id="contactPhone" name="contactPhone" value={location.contactPhone} onChange={handleChange} style={{ width: '100%' }} />
          </FloatLabel>
          <FloatLabel>
          <label htmlFor="contactEmail">Contact Email:</label>
          <InputText id="contactEmail" name="contactEmail" value={location.contactEmail} onChange={handleChange} style={{ width: '100%' }} />
          </FloatLabel>
        </div>
        <div className='flex justify-content-between'>
          <FloatLabel>
          <label htmlFor="contactWebsite">Contact Website:</label>
          <InputText id="contactWebsite" name="contactWebsite" value={location.contactWebsite} onChange={handleChange} style={{ width: '100%' }} />
          </FloatLabel>
          <FloatLabel>
          <label htmlFor="tags">Tags:</label>
        <MultiSelect value={location.tags} onChange={ev=>setSelectedTags(ev.target.value)} options={tags} optionLabel="name" 
                filter  placeholder="Select Tags" maxSelectedLabels={3} className="w-full md:w-20rem" />
          </FloatLabel>
        </div>
        <div>
          <FloatLabel>
          <label htmlFor="additionalNotes">Additional Notes:</label>
          <InputTextarea id="additionalNotes" name="additionalNotes" value={location.additionalNotes} onChange={handleChange} rows={4} style={{ width: '100%' }} />
          </FloatLabel>
        </div>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;
