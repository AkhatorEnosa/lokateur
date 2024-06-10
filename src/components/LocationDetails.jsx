/* eslint-disable react/prop-types */
const LocationDetails = (props) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
        <div className="absolute w-[64vw] md:w-[70vw] grid grid-rows gap-6 md:gap-0 md:grid-cols-4 lg:grid-cols-4 justify-center items-center bg-white top-52 py-6 md:py-8 rounded-xl shadow-lg z-30">
            <div className="flex flex-col gap-2 text-center px-5 bg-red">
                <p className="font-bold text-[10px] text-gray-500">IP ADDRESS</p>
                <h2 className="font-bold text-sm md:text-lg text-purple-800">{props.ipAddress}</h2>
            </div>
            <div className="flex flex-col gap-2 md:border-r-[1px] text-center md:border-l-[1px] md:border-gray-200 px-5">
                <p className="font-bold text-[10px] text-gray-500">LOCATION</p>
                <h2 className="font-bold text-sm md:text-lg text-purple-800">{props.locationDetails}</h2>
            </div>
            <div className="flex flex-col text-center md:border-r-[1px] gap-2">
                <p className="font-bold text-[10px] text-gray-500 px-5"> TIMEZONE</p>
                <h2 className="font-bold text-sm md:text-lg text-purple-800">{props.timezone}</h2>
            </div>
            <div className="flex flex-col text-center gap-2">
                <p className="font-bold text-[10px] text-gray-500 px-5"> CURRENCY</p>
                <h2 className="font-bold text-sm md:text-lg text-purple-800">{props.currency}</h2>
            </div>
        </div>
    </div>
  )
}

export default LocationDetails