/* eslint-disable react/prop-types */
import { FaAngleRight } from 'react-icons/fa'

const Input = ({ getIpFunc, handleLocation, checkErr  }) => {
  return (
    <>
        <div className="grid grid-cols-8 p-5 items-center w-[70vw] md:w-[50%]">
            <div className="col-span-6 shadow-md"><input type="text" className="input w-full border-4 border-white outline-none p-4 rounded-l-2xl" placeholder="Search for any IP address or domain" onChange={getIpFunc}/></div>
            <button className="button flex justify-center items-center font-bold gap-2 md:gap-2 bg-black rounded-r-2xl text-white p-5 col-span-2 hover:font-bold shadow-md transition-all duration-200" onClick={handleLocation}><span className="hidden md:flex">Search</span><FaAngleRight className="arrow text-3xl md:text-md"/></button>
        </div>

       <p className={checkErr === true ? "text-[10px] w-[62vw] md:[w-40vw] text-center py-3 bg-red-100 text-red-600 font-bold rounded-2xl z-50" : "hidden"} >Please input a correct IP</p>
    </>
  )
}

export default Input