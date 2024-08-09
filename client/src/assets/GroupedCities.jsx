const GroupedCities = [
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { label: 'Baden-Württemberg', value: 'Baden-Württemberg' },
            { label: 'Bavaria', value: 'Bavaria' },
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Brandenburg', value: 'Brandenburg' },
            { label: 'Bremen', value: 'Bremen' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Hesse', value: 'Hesse' },
            { label: 'Lower Saxony', value: 'Lower Saxony' },
            { label: 'Mecklenburg-Vorpommern', value: 'Mecklenburg-Vorpommern' },
            { label: 'North Rhine-Westphalia', value: 'North Rhine-Westphalia' },
            { label: 'Rhineland-Palatinate', value: 'Rhineland-Palatinate' },
            { label: 'Saarland', value: 'Saarland' },
            { label: 'Saxony', value: 'Saxony' },
            { label: 'Saxony-Anhalt', value: 'Saxony-Anhalt' },
            { label: 'Schleswig-Holstein', value: 'Schleswig-Holstein' },
            { label: 'Thuringia', value: 'Thuringia' }
        ]
    },
    {
        label: 'USA',
        code: 'US',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' },
            { label: 'Houston', value: 'Houston' },
            { label: 'Phoenix', value: 'Phoenix' },
            { label: 'Philadelphia', value: 'Philadelphia' },
            { label: 'San Antonio', value: 'San Antonio' },
            { label: 'Washington', value: 'Washington' }
        ]
    },
    {
        label: 'Japan',
        code: 'JP',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' },
            { label: 'Nagoya', value: 'Nagoya' },
            { label: 'Sapporo', value: 'Sapporo' },
            { label: 'Fukuoka', value: 'Fukuoka' },
            { label: 'Kobe', value: 'Kobe' }
        ]
    },
    {
        label: 'France',
        code: 'FR',
        items: [
            { label: 'Paris', value: 'Paris' },
            { label: 'Marseille', value: 'Marseille' },
            { label: 'Lyon', value: 'Lyon' },
            { label: 'Toulouse', value: 'Toulouse' },
            { label: 'Nice', value: 'Nice' },
            { label: 'Nantes', value: 'Nantes' },
            { label: 'Strasbourg', value: 'Strasbourg' },
            { label: 'Montpellier', value: 'Montpellier' }
        ]
    },
    {
        label: 'Australia',
        code: 'AU',
        items: [
            { label: 'Sydney', value: 'Sydney' },
            { label: 'Melbourne', value: 'Melbourne' },
            { label: 'Brisbane', value: 'Brisbane' },
            { label: 'Perth', value: 'Perth' },
            { label: 'Adelaide', value: 'Adelaide' },
            { label: 'Gold Coast', value: 'Gold Coast' },
            { label: 'Canberra', value: 'Canberra' },
            { label: 'Hobart', value: 'Hobart' }
        ]
    },
    {
        label: 'Canada',
        code: 'CA',
        items: [
            { label: 'Toronto', value: 'Toronto' },
            { label: 'Vancouver', value: 'Vancouver' },
            { label: 'Montreal', value: 'Montreal' },
            { label: 'Calgary', value: 'Calgary' },
            { label: 'Ottawa', value: 'Ottawa' },
            { label: 'Edmonton', value: 'Edmonton' },
            { label: 'Winnipeg', value: 'Winnipeg' },
            { label: 'Quebec City', value: 'Quebec City' }
        ]
    },
    {
        label: 'United Kingdom',
        code: 'UK',
        items: [
            { label: 'England', value: 'England' },
            { label: 'Scotland', value: 'Scotland' },
            { label: 'Wales', value: 'Wales' },
            { label: 'Northern Ireland', value: 'Northern Ireland' }
        ]
    },
    {
        label: 'India',
        code: 'IN',
        items: [
            { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
            { label: 'Arunachal Pradesh', value: 'Arunachal Pradesh' },
            { label: 'Assam', value: 'Assam' },
            { label: 'Bihar', value: 'Bihar' },
            { label: 'Chhattisgarh', value: 'Chhattisgarh' },
            { label: 'Goa', value: 'Goa' },
            { label: 'Gujarat', value: 'Gujarat' },
            { label: 'Haryana', value: 'Haryana' },
            { label: 'Himachal Pradesh', value: 'Himachal Pradesh' },
            { label: 'Jharkhand', value: 'Jharkhand' },
            { label: 'Karnataka', value: 'Karnataka' },
            { label: 'Kerala', value: 'Kerala' },
            { label: 'Madhya Pradesh', value: 'Madhya Pradesh' },
            { label: 'Maharashtra', value: 'Maharashtra' },
            { label: 'Manipur', value: 'Manipur' },
            { label: 'Meghalaya', value: 'Meghalaya' },
            { label: 'Mizoram', value: 'Mizoram' },
            { label: 'Nagaland', value: 'Nagaland' },
            { label: 'Odisha', value: 'Odisha' },
            { label: 'Punjab', value: 'Punjab' },
            { label: 'Rajasthan', value: 'Rajasthan' },
            { label: 'Sikkim', value: 'Sikkim' },
            { label: 'Tamil Nadu', value: 'Tamil Nadu' },
            { label: 'Telangana', value: 'Telangana' },
            { label: 'Tripura', value: 'Tripura' },
            { label: 'Uttar Pradesh', value: 'Uttar Pradesh' },
            { label: 'Uttarakhand', value: 'Uttarakhand' },
            { label: 'West Bengal', value: 'West Bengal' },
            { label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands' },
            { label: 'Chandigarh', value: 'Chandigarh' },
            { label: 'Dadra and Nagar Haveli and Daman and Diu', value: 'Dadra and Nagar Haveli and Daman and Diu' },
            { label: 'Lakshadweep', value: 'Lakshadweep' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Puducherry', value: 'Puducherry' },
            { label: 'Ladakh', value: 'Ladakh' },
            { label: 'Jammu and Kashmir', value: 'Jammu and Kashmir' }
        ]
    },
   
    {
        label: 'Italy',
        code: 'IT',
        items: [
            { label: 'Rome', value: 'Rome' },
            { label: 'Milan', value: 'Milan' },
            { label: 'Naples', value: 'Naples' },
            { label: 'Turin', value: 'Turin' },
            { label: 'Palermo', value: 'Palermo' },
            { label: 'Genoa', value: 'Genoa' }
        ]
    },
   
   
    {
        label: 'Brazil',
        code: 'BR',
        items: [
            { label: 'São Paulo', value: 'São Paulo' },
            { label: 'Rio de Janeiro', value: 'Rio de Janeiro' },
            { label: 'Salvador', value: 'Salvador' },
            { label: 'Brasília', value: 'Brasília' },
            { label: 'Fortaleza', value: 'Fortaleza' },
            { label: 'Belo Horizonte', value: 'Belo Horizonte' }
        ]
    },
   
    {
        label: 'Spain',
        code: 'ES',
        items: [
            { label: 'Madrid', value: 'Madrid' },
            { label: 'Barcelona', value: 'Barcelona' },
            { label: 'Valencia', value: 'Valencia' },
            { label: 'Seville', value: 'Seville' },
            { label: 'Zaragoza', value: 'Zaragoza' },
            { label: 'Malaga', value: 'Malaga' }
        ]
    },
    
    {
        label: 'China',
        code: 'CN',
        items: [
            { label: 'Beijing', value: 'Beijing' },
            { label: 'Shanghai', value: 'Shanghai' },
            { label: 'Guangzhou', value: 'Guangzhou' },
            { label: 'Shenzhen', value: 'Shenzhen' },
            { label: 'Chengdu', value: 'Chengdu' },
            { label: 'Xi\'an', value: 'Xi\'an' }
        ]
    },
    {
        label: 'Russia',
        code: 'RU',
        items: [
            { label: 'Moscow', value: 'Moscow' },
            { label: 'Saint Petersburg', value: 'Saint Petersburg' },
            { label: 'Novosibirsk', value: 'Novosibirsk' },
            { label: 'Yekaterinburg', value: 'Yekaterinburg' },
            { label: 'Kazan', value: 'Kazan' },
            { label: 'Nizhny Novgorod', value: 'Nizhny Novgorod' }
        ]
    },
    {
        label: 'Mexico',
        code: 'MX',
        items: [
            { label: 'Mexico City', value: 'Mexico City' },
            { label: 'Guadalajara', value: 'Guadalajara' },
            { label: 'Monterrey', value: 'Monterrey' },
            { label: 'Puebla', value: 'Puebla' },
            { label: 'Toluca', value: 'Toluca' },
            { label: 'Tijuana', value: 'Tijuana' }
        ]
    },
    {
        label: 'South Korea',
        code: 'KR',
        items: [
            { label: 'Seoul', value: 'Seoul' },
            { label: 'Busan', value: 'Busan' },
            { label: 'Incheon', value: 'Incheon' },
            { label: 'Daegu', value: 'Daegu' },
            { label: 'Daejeon', value: 'Daejeon' },
            { label: 'Gwangju', value: 'Gwangju' }
        ]
    }
];
export default GroupedCities;