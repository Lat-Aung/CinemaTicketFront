import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from 'lucide-react'; // Or your custom icon library asset


const AdminNavbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30 backdrop-blur-sm">
      <Link to="/" className="max-md:flex-1 text-2xl">
          ShowTimeX
      </Link>

      {/* Hamburger menu visible only on mobile viewports */}
      <div className="max-md:ml-4 md:hidden cursor-pointer text-white">
        {isSidebarOpen ? <XIcon 
        className='size-8'
        onClick={() => setIsSidebarOpen(false)}/> : <MenuIcon 
        className='size-8'
        onClick={() => setIsSidebarOpen(true)}
      />}
      </div>
    </div>
  );
};

export default AdminNavbar;