import { useEffect, useState } from 'react';
import Map from './components/Map'
import LocationDetails from './components/LocationDetails';
import Navbar from './components/Navbar';
import { BsArrowsAngleContract, BsArrowsAngleExpand } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa6';

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

  // call api on first render to get user's location
  useEffect(() => {
    callApi(ipAddress)
  }, [])

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

  return (
    <div className='w-full h-screen overflow-scroll'>
       <div className='relative flex flex-col'>
          {
            !expandMap &&
            <div className="flex flex-col justify-center items-center w-full h-fit px-5 md:p-10 pb-24 md:pb-10 text-sm bg-fixed bg-origin-border bg-left-top bg-no-repeat bg-cover bg-[url('../../bg_image.avif')]">

              {/* navbar  */}
              <Navbar myLocation={getMyLocation} />
              
              {/* search input  */}
              <div className={`relative w-full flex flex-col justify-center items-center z-[70]`}>
                  <div className="grid grid-cols-8 p-5 items-center w-[75vw] md:w-[90vw] lg:w-[50%]">
                      <div className="col-span-6 shadow-md">
                        <input type="text" className="input w-full border-4 border-white text-purple-800 outline-none focus:bg-purple-100 focus:border-transparent font-bold p-4 rounded-l-2xl" placeholder="Search for any IP address or domain" onChange={handleIpChange}/>
                      </div>
                      <button className="button flex justify-center items-center font-bold gap-2 md:gap-2 bg-black rounded-r-2xl text-white p-5 col-span-2 hover:font-bold shadow-md transition-all duration-200" onClick={handleLocation}><span className="hidden md:flex">Search</span><FaAngleRight className="font-bold text-xl"/></button>
                  </div>
          
                  <p className={`${inputErr ? "scale-100" : "scale-0"} text-[10px] w-[62vw] md:[w-40vw] text-center py-3 bg-red-100 text-red-600 font-bold rounded-2xl transition-all duration-150 z-50`} >Please input a correct IP</p>
              </div>
            </div>
          }

          {/* location details  */}
          {!expandMap && <LocationDetails ipAddress={detailsIP} err={err} locationDetails={locationDetails} timezone={timezone} currency={currency} />}

          <div className={`relative w-full ${expandMap ? "h-[100vh]" : "h-[70vh]"} overflow-clip transition-all duration-300 z-20`}>
            {/* expand map button  */}
            <span
              className={`absolute ${expandMap ? "right-2 md:right-10 bottom-20" : "right-2 top-5 md:right-10 md:bottom-20"} p-3 md:p-5 hover:scale-105 h-fit w-fit rounded-full bg-purple-800 text-white shadow duration-150 transition-all cursor-pointer z-40`}
              onClick={() => setExpandMap(!expandMap)}>
                {expandMap ? <BsArrowsAngleContract /> : <BsArrowsAngleExpand />}
            </span>
            
            {/* map component  */}
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
