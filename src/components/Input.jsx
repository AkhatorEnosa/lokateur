/* eslint-disable react/prop-types */
import { FaAngleRight } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
    // const url = `https://freeipapi.com/api/json/`; // to get current request's ip info


const Input = (props) => {

  return (
    <div className="flex flex-col justify-center items-center w-full h-fit gap-6 p-10 pb-36 md:pb-10 text-sm bg-fixed bg-origin-border bg-left-top bg-no-repeat bg-cover bg-[url('../../bg_image.avif')]">
        <h1 className="flex justify-center items-center gap-3 text-white text-2xl font-bold tracking-wider"><FaLocationDot /> Lokateur</h1>
        <div className="grid grid-cols-8 p-5 items-center w-[70vw] md:w-[50%]">
            <div className="col-span-6 shadow-md"><input type="text" className="w-full border-4 border-white outline-none p-4 rounded-l-2xl" placeholder="Search for any IP address or domain" onChange={props.getIp}/></div>
            <button className="button flex justify-center items-center font-bold gap-2 md:gap-2 bg-black rounded-r-2xl text-white p-5 col-span-2 hover:font-bold shadow-md transition-all duration-200" onClick={props.handleLocation}><span className="hidden md:flex">Search</span><FaAngleRight className="arrow text-3xl md:text-md"/></button>
        </div>
        {props.err ? <p className="text-xs px-40 py-2 bg-red-100 border-[1px] border-red-600 text-red-600 font-bold rounded-2xl" >Please input a correct IP</p> : <p className="hidden"></p>}
    </div>
  )
}


export default Input

{/* <div className="flex flex-col justify-center items-center w-full h-fit gap-6 p-10 pb-36 md:pb-[0px] text-sm bg-fixed bg-origin-border bg-left-top bg-no-repeat bg-cover bg-[url('../../bg_image.png')]">
        <h1 className="flex justify-center items-center gap-3 text-white text-2xl font-bold tracking-wider"><FaLocationDot /> Lokateur</h1>
        <div className="grid grid-cols-8 p-0 md:p-5 items-center w-full md:w-[50%]">
            <div className="col-span-6 shadow-md"><input type="text" className="w-full border-4 border-white outline-none p-4 rounded-l-2xl" placeholder="Search for any IP address or domain" onChange={props.getIp}/></div>
            <button className="button flex justify-center items-center gap-5 bg-black rounded-r-2xl text-white p-5 col-span-2 hover:font-bold shadow-md transition-all duration-200" onClick={props.handleLocation}>Search<FaAngleRight className="arrow"/></button>
        </div>
        {props.location == ['', ''] ? <p className="text-xs px-40 py-2 bg-red-100 border-[1px] border-red-600 text-red-600 font-bold rounded-2xl" >Please input a correct IP</p> : <p className="hidden"></p>}
    </div> */}