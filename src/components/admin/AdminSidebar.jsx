import { NavLink } from "react-router-dom";
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from "lucide-react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useMemo } from "react";

const AdminSidebar = () => {
    const { user } = useAppContext()
    let username = useMemo(() => user ? user.username : "Admin User", [user])

    const adminNavlinks = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: LayoutDashboardIcon,
        },
        {
            name: "Add Shows",
            path: "/admin/add-shows",
            icon: PlusSquareIcon,
        },
        {
            name: "List Shows",
            path: "/admin/list-shows",
            icon: ListIcon,
        },
        {
            name: "List Bookings",
            path: "/admin/list-bookings",
            icon: ListCollapseIcon,
        },
    ];

    return <div className='h-[calc(100vh-64px)] md: flex flex-col 
    items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
       <p className='mt-2 text-base max-md:hidden'> Welcome Admin<b className="text-xl text-red-400 capitalize underline"> {username} </b> </ p>
       <div className="w-full">
            {adminNavlinks.map((link, index) => 
                <NavLink key={index} to={link.path} className={({isActive }) => 
                `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 min-md: pl-10 first:mt-6 text-gray-400 ${isActive && 'bg-primary/15 text-primary group'}`}>
                    {({isActive}) => (
                        <>
                            <link.icon className="size-5"/>
                            <p className="max-md:hidden">{link.name}</p>
                            <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`}/>
                        </>
                    )}
                </NavLink>
            )}
       </div>
    </div>
}

export default AdminSidebar