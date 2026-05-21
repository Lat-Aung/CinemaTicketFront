import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import Title from "../../components/admin/Title"
import BlurCircle from "../../components/BlurCircle"
import { StarIcon, ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, UsersIcon } from "lucide-react"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

export default function Dashboard() {
    const { axios, getToken, isSignedIn, image_base_url } = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY || "$"

    const [dashboardData, setDashboardData] = useState({
        totalBookings: 0,
        totalRevenue: 0,
        activeShows: [],
        totalUser: 0
    })
    const [loading, setLoading] = useState(true)

    const dashboardCards = [
        { title: "Total Bookings", value: dashboardData.totalBookings?.toLocaleString() || "0", icon: ChartLineIcon },
        { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue?.toLocaleString() || "0"}`, icon: CircleDollarSignIcon },
        { title: "Active Shows", value: dashboardData.activeShows?.length || "0", icon: PlayCircleIcon },
        { title: "Total Users", value: dashboardData.totalUser?.toLocaleString() || "0", icon: UsersIcon }
    ]

    const fetchDashboardData = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/dashboard', {
                headers: { Authorization: `Bearer ${token}` }
            })

            const dat = data.dashboardData
            const filtered = dat.activeShows.filter((v, i, self) => 
                self.findIndex(m => m.movie._id == v.movie._id) === i
            )
            dat.activeShows = filtered

            console.log('Filtered: ', filtered)
            if (data?.dashboardData) setDashboardData(data.dashboardData)
            
        } catch (err) {
            const errorMessage = err?.response?.data?.message || "Failed to load dashboard data."
            // toast.error(errorMessage)
            console.error('Error Fetching Admin Dashboard Data: ', err)
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSignedIn) fetchDashboardData()
    }, [isSignedIn])

    if (loading) return <Loading />

    return (
        <div className="w-full space-y-8 pb-10">
            <Title text1="Admin" text2="Dashboard" />

            {/* --- STATS CARDS SECTION --- */}
            <div className="relative">
                <BlurCircle top="-60px" left="-20px" />
                
                {/* flex-col causes stacking on mobile; md:flex-row spreads them out on desktop */}
                <div className="flex flex-col md:flex-row flex-wrap gap-4 w-full relative z-10">
                    {dashboardCards.map((card, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between p-5 bg-primary/10 border border-primary/20 rounded-xl transition-all duration-300 shadow-sm
                            /* Mobile: full viewport width. Desktop: distributes space evenly */
                            w-full md:flex-1 md:min-w-[220px]"
                        >
                            <div>
                                <h1 className="text-xs uppercase tracking-wider text-gray-400 font-medium">{card.title}</h1>
                                <p className="text-2xl font-semibold mt-1.5 text-white">{card.value}</p>
                            </div>
                            <card.icon className="w-6 h-6 text-primary" />
                        </div>
                    ))}
                </div>
            </div>

            {/* --- ACTIVE SHOWS SECTION --- */}
            <div className="pt-4 border-t border-gray-300/10">
                <p className="text-xl font-semibold text-white">Active Shows</p>
            </div>

{/* --- ACTIVE SHOWS GRID ARRAY --- */}
            <div className="relative">
                <BlurCircle top="-40px" left="40%" className="opacity-30 pointer-events-none" />

                {dashboardData.activeShows?.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center p-12 border border-dashed border-gray-300/20 rounded-xl bg-black/20">
                        <PlayCircleIcon className="w-12 h-12 text-gray-500 mb-3" />
                        <p className="text-gray-400 text-sm">No live shows running.</p>
                    </div>
                ) : (
                    /* 
                       - Mobile: flex-col matches 100% block width for clean vertical scrolling
                       - Tablet/Desktop: flex-row + flex-wrap spreads them perfectly to edge boundaries
                    */
                    <div className="
                     grid gap-6 w-full relative z-10

                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    2xl:grid-cols-4">
                        {dashboardData.activeShows.map((show) => (
                            <div 
                                key={show._id} 
                                className="
                                    flex flex-col overflow-hidden
                                    rounded-2xl
                                    bg-gradient-to-b from-primary/10 to-black/30
                                    border border-white/10
                                    backdrop-blur-sm

                                    hover:-translate-y-1
                                    hover:border-primary/40
                                    hover:shadow-[0_0_25px_rgba(255,255,255,0.05)]

                                    transition-all duration-300
                                "
                            >
                                {/* Media Poster Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                                    <img
                                        src={`${image_base_url}${show.movie?.poster_path}`}
                                        alt=""
                                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-semibold text-amber-400">
                                        <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                        {show.movie?.vote_average ? show.movie.vote_average.toFixed(1) : "N/A"}
                                    </div>
                                </div>

                                {/* Details Fields */}
                                <div className="p-4 flex flex-col justify-between flex-grow">
                                    <p className="font-medium text-sm text-gray-100 truncate mb-2" title={show.movie?.title}>
                                        {show.movie?.title || "Untitled"}
                                    </p>
                                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                                        <span className="text-xs text-gray-400">Price</span>
                                        <p className="text-base font-bold text-primary">
                                            {currency}{show.showPrice?.toLocaleString() || "0"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}