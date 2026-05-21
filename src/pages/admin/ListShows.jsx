import Loading from "../../components/Loading"
import { useEffect, useState } from "react"
import { dummyShowsData } from "../../assets/assets"
import Title from "../../components/admin/Title"
import { dateFormat } from "../../lib/dateFormat"
import { useAppContext } from "../../context/AppContext"


export default function ListShows() {

    const {axios, getToken, user } = useAppContext()

    const currency = import.meta.env.VITE_CURRENCY
    const [shows, setShows] = useState([])
    const [loading, setLoading] = useState(true)

    /* const getAllShows = async () => {
        try {
            setShows([{
                movie: dummyShowsData[0],
                showDateTime: "2025-06-30T02:30:00.000Z",
                showPrice: 59,
                occupiedSeats: {
                    A1: "user_1",
                    B1: "user_2",
                    C1: "user_3"
                }
            }])

            setLoading(!loading)
        } catch (error) {
            console.error(error);
        }
    } */

    const getAllShows = async () => {
        try {
            const {data} = await axios.get('/api/admin/all-shows', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            setShows(data.shows)
            setLoading(false)
        } catch (err) {
            const {data} = err.response
            toast.error(data.message)
            console.error('Error Fetching Admin All Shows Data: ', data)
        }
    }
    

    useEffect(() => {
        if(user)
            getAllShows()
    }, [user])

    return !loading ? <>
        <Title text="List" text2="Shows"/> 
        {shows.length > 0 ? <div className="mt-6 w-full overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-[700px] w-full border-collapse">
                <thead>
                    <tr className="bg-primary/20 text-left text-white">
                        <th className="px-4 py-3 font-medium">Movie Name</th>
                        <th className="px-4 py-3 font-medium">Show Time</th>
                        <th className="px-4 py-3 font-medium">Bookings</th>
                        <th className="px-4 py-3 font-medium">Earnings</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-300">
                    {shows.map((show, index) => (
                        <tr
                            key={index}
                            className="
                                border-b border-white/5
                                bg-white/[0.02]
                                even:bg-white/[0.04]

                                hover:bg-primary/10
                                transition-colors
                            "
                        >
                            <td className="px-4 py-4 font-medium text-white">
                                <div className="truncate max-w-[220px]">
                                    {show.movie.title}
                                </div>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap">
                                {dateFormat(show.showDateTime)}
                            </td>

                            <td className="px-4 py-4">
                                {Object.keys(show.occupiedSeats).length}
                            </td>

                            <td className="px-4 py-4 font-semibold text-primary whitespace-nowrap">
                                {currency}
                                {Object.keys(show.occupiedSeats).length * show.showPrice}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : <h1 className="my-4 text-2xl"> No Shows Added yet! </h1>}
    </> : <Loading/>
}