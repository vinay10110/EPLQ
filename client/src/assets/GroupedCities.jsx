const GroupedCities = [
    {
        label: 'Germany',
        code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' },
            { label: 'Cologne', value: 'Cologne' },
            { label: 'Stuttgart', value: 'Stuttgart' },
            { label: 'Düsseldorf', value: 'Düsseldorf' },
            { label: 'Leipzig', value: 'Leipzig' }
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
            { label: 'London', value: 'London' },
            { label: 'Birmingham', value: 'Birmingham' },
            { label: 'Manchester', value: 'Manchester' },
            { label: 'Glasgow', value: 'Glasgow' },
            { label: 'Liverpool', value: 'Liverpool' },
            { label: 'Edinburgh', value: 'Edinburgh' },
            { label: 'Bristol', value: 'Bristol' },
            { label: 'Leeds', value: 'Leeds' }
        ]
    },
    {
        label: 'India',
        code: 'IN',
        items: [
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Bangalore', value: 'Bangalore' },
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Chennai', value: 'Chennai' },
            { label: 'Kolkata', value: 'Kolkata' },
            { label: 'Pune', value: 'Pune' },
            { label: 'Ahmedabad', value: 'Ahmedabad' }
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