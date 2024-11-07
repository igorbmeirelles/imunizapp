import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { HomeIcon } from "./components/icons/home";
import { LocationIcon } from "./components/icons/location";
import { SyringeIcon } from "./components/icons/syringe";
import { CalendarIcon } from "./components/icons/calendar";
import { PersonIcon } from "./components/icons/person";

function App() {
  return (
    <>
      <Outlet />
      <div className="mt-[120px]"></div>
      <div className="bottom-0 flex fixed w-full px-4 bg-gray-100">
        <Link to="/" className="p-4 flex-grow">
          <HomeIcon />
        </Link>
        <Link to="/" className="p-4 flex-grow">
          <LocationIcon />
        </Link>

        <Link
          to="/"
          className="bg-syringe-gradient rounded-full h-[72px] w-[72px] -mt-8 flex items-center justify-center shadow"
        >
          <SyringeIcon />
        </Link>

        <Link to="/" className="p-4 flex-grow">
          <CalendarIcon />
        </Link>
        <Link to="/" className="p-4 flex-grow">
          <PersonIcon />
        </Link>
      </div>
    </>
  );
}

export default App;
