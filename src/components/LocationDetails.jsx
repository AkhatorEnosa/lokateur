/* eslint-disable react/prop-types */
const LocationDetails = (props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute w-[70vw] grid grid-cols-3 justify-center items-center bg-white top-52 py-8 rounded-xl shadow-lg z-30">
            <div className="flex flex-col gap-2 border-r-[1px] text-center px-5 bg-red">
                <p className="font-bold text-[10px] text-gray-500">IP ADDRESS</p>
                <h2 className="font-bold text-lg text-purple-800">{props.ipAddress}</h2>
            </div>
            <div className="flex flex-col gap-2 border-r-[1px] text-center border-l-[1px] border-gray-200 px-5">
                <p className="font-bold text-[10px] text-gray-500">LOCATION</p>
                <h2 className="font-bold text-lg text-purple-800">{props.locationDetails}</h2>
            </div>
            <div className="flex flex-col text-center gap-2">
                <p className="font-bold text-[10px] text-gray-500 px-5"> TIMEZONE</p>
                <h2 className="font-bold text-lg text-purple-800">{props.timezone}</h2>
            </div>
        </div>
    </div>
  )
}

export default LocationDetails