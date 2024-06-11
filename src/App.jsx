import { useState } from 'react';
import Input from './components/Input'
import Map from './components/Map'
import LocationDetails from './components/LocationDetails';

function App() {

  const [ipAddress, setIpAddress] = useState("");
  const [coords, setCoords] = useState([]);
  const [err, setErr] = useState(false);

  const [tooltip, setTooltip] = useState("");

  const [detailsIP, setDetailsIP] = useState("");
  const [locationDetails, setLocation] = useState("")
  const [timezone, setTimezone] = useState('')
  const [currency, setCurrency] = useState('')

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
            setCurrency(`${data.currency.name} (${data.currency.code})`)
            // console.log(data);
              return data;
        })
        .catch(error => {
          setErr(!err)
            console.error(error);
    });
    return true;

  }


  const getIp = (e) => {
    setIpAddress(e.target.value);
  }


  const handleLocation = (ip) => {
    ip = ipAddress;
    const sanitizedInput = ip.replace(/\s/g, "");
    // callApi(ip)
    const regExp = /^[0-9.]*$/;

  // console.log(regExp.test(sanitizedInput));

      if(regExp.test(sanitizedInput) && sanitizedInput !== ""){
          callApi(sanitizedInput);
          setErr(false)
          err;
      } else {
        setErr(true);
        err;
      }
  }

  const getMyLocation = () => {
    callApi('');
    coords;
    tooltip;
    locationDetails;
    timezone;
    currency;
  }

  return (
    <div className='w-full h-full overflow-scroll'>
       <div className='flex flex-col'>
        <Input myLocation={getMyLocation} getIp={getIp} handleLocation={handleLocation} location={coords} checkErr={err}/>
        <LocationDetails ipAddress={detailsIP} err={err} locationDetails={locationDetails} timezone={timezone} currency={currency}/>
        <Map position={coords.length > 1 ? coords : [
48.137428,11.57549]} details={tooltip} coords={coords.length > 1 ? coords : [
48.137428,11.57549]}/>
      </div>
    </div>
  )
}

export default App
