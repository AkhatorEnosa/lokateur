import { useEffect, useState } from 'react';
import Map from './components/Map'
import LocationDetails from './components/LocationDetails';
import { FaAngleRight } from 'react-icons/fa';
import Navbar from './components/Navbar';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';

function App() {

  const [ipAddress, setIpAddress] = useState("");
  const [coords, setCoords] = useState([]);
  const [inputErr, setInputErr] = useState(false);
  const [err, setErr] = useState(false);

  const [tooltip, setTooltip] = useState("");

  const [detailsIP, setDetailsIP] = useState("");
  const [locationDetails, setLocation] = useState("")
  const [timezone, setTimezone] = useState('')
  const [currency, setCurrency] = useState('')

  const [expandMap, setExpandMap] = useState(false);

  // run api call
  const callApi = async (ip) => {
    const url = `/api-ip/${ip}`; // to get specific ip's info
    setErr(false)

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`)
      }

      const data = await response.json();

      // destructure data so that instead of data.latitude we can just use latitude
      const { latitude, longitude, ipAddress, cityName, countryName, regionName, timeZones, currencies } = data;

      setCoords([latitude, longitude]);
      setDetailsIP(ipAddress);
      setTooltip(`${cityName}, ${countryName}`);
      setLocation(`${cityName}, ${regionName}`);
      setTimezone(`UTC ${timeZones[0]}`);
      setCurrency(`${currencies[0]}`);
      return data;

    } catch (error) {
      setErr(true);
    }
  }

  const handleIpChange = (e) => {
    setIpAddress(e.target.value);

    setInputErr(false);
  }

 const handleLocation = () => {
  // Clean the input (remove spaces)
  const sanitizedInput = ipAddress.trim().replace(/\s/g, "");

  // Checks for 4 groups of digits separated by dots, where each group is between 0 and 255
  const ipv4RegExp = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/;

  if (sanitizedInput && ipv4RegExp.test(sanitizedInput)) {
    setInputErr(false);
    callApi(sanitizedInput);
  } else {
    setInputErr(true);
    setDetailsIP("");
    console.error("Invalid IP Address format entered.");
  }
};

  const getMyLocation = () => {
    callApi('');
  }

  useEffect(() => {
    callApi(ipAddress)
  }, [])

  return (
    <div className='w-full h-full overflow-scroll'>
       <div className='relative flex flex-col'>
          {!expandMap &&<div className="flex flex-col justify-center items-center w-full h-fit p-10 pb-24 md:pb-10 text-sm bg-fixed bg-origin-border bg-left-top bg-no-repeat bg-cover bg-[url('../../bg_image.avif')]">
            <Navbar myLocation={getMyLocation} />
            <div className={`relative w-full flex flex-col justify-center items-center z-[70]`}>
                <div className="grid grid-cols-8 p-5 items-center w-[70vw] md:w-[50%]">
                    <div className="col-span-6 shadow-md">
                        <input type="text" className="input w-full border-4 border-white outline-none p-4 rounded-l-2xl" placeholder="Search for any IP address or domain" onChange={handleIpChange}/>
                      </div>
                    <button className="button flex justify-center items-center font-bold gap-2 md:gap-2 bg-black rounded-r-2xl text-white p-5 col-span-2 hover:font-bold shadow-md transition-all duration-200" onClick={handleLocation}><span className="hidden md:flex">Search</span><FaAngleRight className="arrow text-3xl md:text-md"/></button>
                </div>
        
                <p className={`${inputErr ? "scale-100" : "scale-0"} text-[10px] w-[62vw] md:[w-40vw] text-center py-3 bg-red-100 text-red-600 font-bold rounded-2xl transition-all duration-150 z-50`} >Please input a correct IP</p>
            </div>
          </div>}

          {!expandMap && <LocationDetails ipAddress={detailsIP} err={err} locationDetails={locationDetails} timezone={timezone} currency={currency} />}

          <div className={`relative w-full ${expandMap ? "h-[100vh]" : "h-[50vh] md:h-[70vh]"} overflow-clip transition-all duration-300 z-20`}>
          <span
            className={`absolute left-10 bottom-10 p-5 rounded-full bg-purple-800 text-white cursor pointer z-40`}
            onClick={() => setExpandMap(!expandMap)}>{expandMap ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}</span>
            <Map
              position={coords.length === 0 || err ? [48.137428, 11.57549] : coords}
              details={tooltip}
              expand={expandMap}
            />
          </div>
      </div>
    </div>
  )
}

export default App
