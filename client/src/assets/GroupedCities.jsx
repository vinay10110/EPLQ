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
            { label: 'Tianjin', value: 'Tianjin' },
            { label: 'Chongqing', value: 'Chongqing' },
            { label: 'Hebei', value: 'Hebei' },
            { label: 'Henan', value: 'Henan' },
            { label: 'Yunnan', value: 'Yunnan' },
            { label: 'Liaoning', value: 'Liaoning' },
            { label: 'Heilongjiang', value: 'Heilongjiang' },
            { label: 'Hunan', value: 'Hunan' },
            { label: 'Anhui', value: 'Anhui' },
            { label: 'Shandong', value: 'Shandong' },
            { label: 'Xinjiang', value: 'Xinjiang' },
            { label: 'Jiangsu', value: 'Jiangsu' },
            { label: 'Zhejiang', value: 'Zhejiang' },
            { label: 'Jiangxi', value: 'Jiangxi' },
            { label: 'Hubei', value: 'Hubei' },
            { label: 'Guangxi', value: 'Guangxi' },
            { label: 'Gansu', value: 'Gansu' },
            { label: 'Shanxi', value: 'Shanxi' },
            { label: 'Inner Mongolia', value: 'Inner Mongolia' },
            { label: 'Shaanxi', value: 'Shaanxi' },
            { label: 'Jilin', value: 'Jilin' },
            { label: 'Fujian', value: 'Fujian' },
            { label: 'Guizhou', value: 'Guizhou' },
            { label: 'Guangdong', value: 'Guangdong' },
            { label: 'Qinghai', value: 'Qinghai' },
            { label: 'Tibet', value: 'Tibet' },
            { label: 'Sichuan', value: 'Sichuan' },
            { label: 'Ningxia', value: 'Ningxia' },
            { label: 'Hainan', value: 'Hainan' },
            { label: 'Taiwan', value: 'Taiwan' },
            { label: 'Hong Kong', value: 'Hong Kong' },
            { label: 'Macau', value: 'Macau' }
        ]
    },
    {
        label: 'Russia',
        code: 'RU',
        items: [
            { label: 'Moscow', value: 'Moscow' },
            { label: 'Saint Petersburg', value: 'Saint Petersburg' },
            { label: 'Moscow Oblast', value: 'Moscow Oblast' },
            { label: 'Leningrad Oblast', value: 'Leningrad Oblast' },
            { label: 'Krasnodar Krai', value: 'Krasnodar Krai' },
            { label: 'Rostov Oblast', value: 'Rostov Oblast' },
            { label: 'Republic of Tatarstan', value: 'Republic of Tatarstan' },
            { label: 'Republic of Bashkortostan', value: 'Republic of Bashkortostan' },
            { label: 'Nizhny Novgorod Oblast', value: 'Nizhny Novgorod Oblast' },
            { label: 'Samara Oblast', value: 'Samara Oblast' },
            { label: 'Sverdlovsk Oblast', value: 'Sverdlovsk Oblast' },
            { label: 'Chelyabinsk Oblast', value: 'Chelyabinsk Oblast' },
            { label: 'Novosibirsk Oblast', value: 'Novosibirsk Oblast' },
            { label: 'Krasnoyarsk Krai', value: 'Krasnoyarsk Krai' },
            { label: 'Perm Krai', value: 'Perm Krai' },
            { label: 'Primorsky Krai', value: 'Primorsky Krai' },
            { label: 'Voronezh Oblast', value: 'Voronezh Oblast' },
            { label: 'Volgograd Oblast', value: 'Volgograd Oblast' },
            { label: 'Orenburg Oblast', value: 'Orenburg Oblast' },
            { label: 'Republic of Crimea', value: 'Republic of Crimea' },
            { label: 'Khabarovsk Krai', value: 'Khabarovsk Krai' },
            { label: 'Sakha Republic (Yakutia)', value: 'Sakha Republic (Yakutia)' },
            { label: 'Amur Oblast', value: 'Amur Oblast' },
            { label: 'Irkutsk Oblast', value: 'Irkutsk Oblast' },
            { label: 'Kaliningrad Oblast', value: 'Kaliningrad Oblast' },
            { label: 'Stavropol Krai', value: 'Stavropol Krai' },
            { label: 'Tyumen Oblast', value: 'Tyumen Oblast' },
            { label: 'Tomsk Oblast', value: 'Tomsk Oblast' },
            { label: 'Chukotka Autonomous Okrug', value: 'Chukotka Autonomous Okrug' },
            { label: 'Kamchatka Krai', value: 'Kamchatka Krai' }
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
            { label: 'Daegu', value: 'Daegu' },
            { label: 'Incheon', value: 'Incheon' },
            { label: 'Gwangju', value: 'Gwangju' },
            { label: 'Daejeon', value: 'Daejeon' },
            { label: 'Ulsan', value: 'Ulsan' },
            { label: 'Sejong', value: 'Sejong' },
            { label: 'Gyeonggi', value: 'Gyeonggi' },
            { label: 'Gangwon', value: 'Gangwon' },
            { label: 'North Chungcheong', value: 'North Chungcheong' },
            { label: 'South Chungcheong', value: 'South Chungcheong' },
            { label: 'North Jeolla', value: 'North Jeolla' },
            { label: 'South Jeolla', value: 'South Jeolla' },
            { label: 'North Gyeongsang', value: 'North Gyeongsang' },
            { label: 'South Gyeongsang', value: 'South Gyeongsang' },
            { label: 'Jeju', value: 'Jeju' }
        ]
    }
];
export default GroupedCities;