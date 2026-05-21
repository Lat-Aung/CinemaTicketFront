import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboardIcon, PlusSquareIcon, ListIcon, ListCollapseIcon } from 'lucide-react';
import { useAppContext } from '../../context/AppContext'; // Adjust path based on your architecture

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const { user } = useAppContext();
    let username = useMemo(() => user ? user.username : "Admin User", [user]);

    const adminNavlinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboardIcon },
        { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
        { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
        { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
    ];

    return (
        <div className={`
            h-[calc(100vh-64px)] flex flex-col items-center border-r border-gray-300/30 text-md
            transition-[width] duration-300 overflow-hidden backdrop-blur-2xl z-50
            
            /* Mobile Viewport Drawer Setup - Center Everything Vertically */
            max-md:fixed max-md:top-16 max-md:left-0 max-md:h-[calc(100vh-64px)] max-md:justify-center
            ${isSidebarOpen ? 'max-md:w-full' : 'max-md:w-0 border-none'}
            
            /* Desktop Viewport Configuration */
            md:pt-8 md:max-w-60 md:w-full md:sticky md:top-16
        `}>
            
            {/* Admin Greeting Hidden on Mobile to maximize breathing space for the centered links */}
            <p className='mt-2 text-base max-md:hidden mb-6'> 
                Welcome Admin<b className="text-xl text-red-400 capitalize underline"> <br/> {username} </b> 
            </p>

            {/* Links Container */}
            <div className="w-full flex flex-col max-md:gap-6 max-md:items-center">
                {adminNavlinks.map((link, index) => (
                    <NavLink 
                        key={index} 
                        to={link.path} 
                        onClick={() => setIsSidebarOpen(false)} // Auto-closes mobile drawer on navigation click
                        className={({ isActive }) => `
                            relative flex items-center gap-3 w-full py-2.5 transition-all
                            
                            /* Mobile Styles: Big, Bold, and Centered Text Links */
                            max-md:justify-center max-md:text-xl max-md:font-medium max-md:py-4
                            
                            /* Desktop Layout Styles */
                            md:pl-10 md:first:mt-6 text-gray-400 
                            ${isActive && 'bg-primary/15 text-primary group'}
                        `}
                    >
                        {({ isActive }) => (
                            <>
                                {/* Scales icons up dynamically on mobile viewports */}
                                <link.icon className="size-5 max-md:size-6 shrink-0" />
                                
                                <p className="max-md:block md:block">{link.name}</p>
                                
                                {/* Right-side border marker indicator */}
                                <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default AdminSidebar;