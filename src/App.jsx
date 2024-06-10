import { useState } from 'react';
import Input from './components/Input'
import Map from './components/Map'
import LocationDetails from './components/LocationDetails';

function App() {

  const [ipAddress, setIpAddress] = useState("101.33.11.255");
  const [coords, setCoords] = useState([]);
  const [err, setErr] = useState("");

  const [tooltip, setTooltip] = useState("Munich, Germany");

  const [detailsIP, setDetailsIP] = useState("101.33.11.255");
  const [locationDetails, setLocation] = useState("Munich, Bayern")
  const [timezone, setTimezone] = useState('UTC +02:00')
  const [currency, setCurrency] = useState('Euro')

  // run api call
  const callApi = (ip) => {
    const url = `https://freeipapi.com/api/json/${ip}`; // to get specific ip's info
    fetch(url).then(response => {
        if (response.ok) {
            return response.json();
        }
            throw response;
        })
        .then(data => {
            setCoords([data.latitude, data.longitude]);
            setDetailsIP(data.ipAddress)
            setTooltip(`${data.cityName}, ${data.countryName}`)
            setLocation(`${data.cityName}, ${data.regionName}`)
            setTimezone(`UTC ${data.timeZone}`)
            setCurrency(data.currency.name)
            if(coords[0] !== "") {
              console.log(data)
              return data;
            } else {
              console.error(err);
            }
        })
        .catch(error => {
          setErr(error)
            console.error(err);
    });
    return true;

  }


  const getIp = (e) => {
    setIpAddress(e.target.value);
  }


  const handleLocation = (ip) => {
    ip = ipAddress;
    callApi(ip);
    console.log(coords)
  }

  return (
    <div className='w-full h-full overflow-scroll'>
       <div className='flex flex-col'>
        <Input getIp={getIp} handleLocation={handleLocation} location={coords}/>
        <LocationDetails ipAddress={detailsIP} locationDetails={locationDetails} timezone={timezone} currency={currency}/>
        <Map position={coords.length > 1 ? coords : [
48.137428,11.57549]} details={tooltip} coords={coords.length > 1 ? coords : [
48.137428,11.57549]}/>
      </div>
    </div>
  )
}

export default App
