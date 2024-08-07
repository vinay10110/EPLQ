/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Button,Checkbox,Dropdown,Sidebar } from 'primereact';
import { useState } from 'react';
import GroupedCities from '../assets/GroupedCities';
import Tags from '../assets/Tags';

const FilterSidebar = ({ visible, onHide, setFilterCity, setFilterTags }) => {
    const [city, setCity] = useState(null);
    const [tags, setTags] = useState([]);

    const handleCityChange = (e) => {
        setCity(e.value);
    };

    const handleTagChange = (e) => {
        const selectedTags = [...tags];
        if (e.checked) {
            selectedTags.push(e.value);
        } else {
            const index = selectedTags.indexOf(e.value);
            if (index !== -1) {
                selectedTags.splice(index, 1);
            }
        }
        setTags(selectedTags);
    };

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.label} src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px' }} />
                <div>{option.label}</div>
            </div>
        );
    };

    const handleSubmit = () => {
        setFilterCity(city);
        setFilterTags(tags);
        onHide();
        setCity('');
        setTags('')
    };
    return (
        <Sidebar visible={visible} onHide={onHide} position="right">
            <h2>Filter Options</h2>
            <Dropdown value={city} onChange={handleCityChange} options={GroupedCities} optionLabel="label" filter
                optionGroupLabel="label" optionGroupChildren="items" optionGroupTemplate={groupedItemTemplate} className="w-full md:w-14rem" placeholder="Select a City" style={{marginBottom:'15px'}}/>
            <div className='formgroup-inline'>
                {Tags.map(tag => (
                    <div key={tag.name} className="field-checkbox">
                        <Checkbox
                            value={tag}
                            onChange={handleTagChange}
                            checked={tags.includes(tag)}
                        />
                        <label htmlFor={tag.name}>{tag.name}</label>
                    </div>
                ))}
            </div>
            <div className='flex justify-content-center'>
                <Button onClick={handleSubmit}>Apply</Button>
            </div>
        </Sidebar>
    );
};

export default FilterSidebar;
