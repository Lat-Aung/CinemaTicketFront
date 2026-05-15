import { Link, useNavigate } from "react-router-dom";
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPercent, TicketPlus, XIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { useAppContext } from "../context/AppContext";



const Navbar = () => {

    const linkArray = useMemo(() => [
        ['/', 'Home'],
        ['/movies', 'Movies'],
        ['/', 'Theaters'],
        ['/', 'Releases'],
        ['/favorites', 'Favorite']
    ], []);

    const {user, isLoaded, isSignedIn} = useUser()
    const {openSignIn} = useClerk()
    const navigate = useNavigate()

    const {favMovies} = useAppContext()


    const [isOpen, setIsOpen] = useState(false)

    return <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6
    md:px-16 lg:px-36 py-5">
        
        <Link to="/" className="max-md:flex-1">
            <img src={assets.logo} alt="" className="w-36 h-auto"/>
        </Link>
        
        <div className={`
        max-md:absolute 
        max-md:top-0 
        max-md:left-0 
        max-md:font-medium 
        max-md:text-lg z-50 
        max-md:justify-center 
        max-md:h-screen 
        md:px-8 py-3
        md:rounded-full 
        md:bg-white/10 flex flex-col md:flex-row items-center gap-8 backdrop-blu bg-black/70 
        md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 
        ${isOpen ? 'max-md:w-full':'max-md:w-0'}
        `} onClick={() => setIsOpen(!isOpen)}>
            <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"/>

            {linkArray.map(([path, label], index) => (
                index < linkArray.length - 1 ?
                    <Link 
                    key={index} 
                    to={path} 
                    onClick={() => {
                    window.scrollTo(0, 0); 
                    setIsOpen(!isOpen);
                    }}
                >
                    {label}
                </Link> : favMovies.length > 0 && <Link 
                    key={index} 
                    to={path} 
                    onClick={() => {
                    window.scrollTo(0, 0); 
                    setIsOpen(!isOpen);
                    }}
                >
                    {label}
                </Link>
                    
                
            ))}
        </div>

        <div className="flex items-center gap-8">
            <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer"/>
            {
                !isSignedIn ? (
                    <button 
                    onClick={openSignIn}
                    className="px-4 py-1 sm:px-7 sm:py-2 bg-primary
                    hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
                        Login
                    </button>
                ) : (
                    <UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action 
                            label="My Bookings" 
                            labelIcon={<TicketPlus width={15}/>}
                            onClick={() => navigate('/my-bookings')}/>
                        </UserButton.MenuItems>
                    </UserButton>
                )
            }
            
        </div>

        <MenuIcon className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
         onClick={() => setIsOpen(!isOpen)}/>
    </div>
}

export default Navbar;