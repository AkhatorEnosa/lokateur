/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6"

const Navbar = (props) => {
  return (
    <div className="w-full flex justify-between mb-6 text-white">
      <h1 className="flex justify-center items-center gap-3 text-2xl font-bold tracking-wider"><FaLocationDot /> Lokateur</h1>
      <p className="underline cursor-pointer hover:no-underline" onClick={props.myLocation}>My Location</p>
    </div>
  )
}

export default Navbar