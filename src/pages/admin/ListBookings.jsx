import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/Title";
import { dummyBookingData } from "../../assets/assets";
import { dateFormat } from "../../lib/dateFormat";
import { useAppContext } from "../../context/AppContext";

export default function ListBookings() {

    const {axios, getToken, user } = useAppContext()

    const currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    /* const getAllBookings = async () => {
        setBookings(dummyBookingData)
        setIsLoading(false);
    }; */


    const getAllBookings = async () => {
        try {
            const {data} = await axios.get('/api/admin/all-bookings', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            setBookings(data.bookings)
            setIsLoading(false)
        } catch(err) {
            const {data} = err.response
            toast.error(data.message)
            console.error('Error Fetching Admin All Bookings Data: ', data)
        }
    };

    useEffect(() => {
        if(user) 
            getAllBookings();
    }, [user]);

    return !isLoading ? <>
        <Title text1="List" text2="Bookings" />
        {bookings.length > 0 ? <div className="mt-6 w-full overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-[850px] w-full border-collapse">
                <thead>
                    <tr className="bg-primary/20 text-left text-white">
                        <th className="px-4 py-3 font-medium">User Name</th>
                        <th className="px-4 py-3 font-medium">Movie Name</th>
                        <th className="px-4 py-3 font-medium">Show Time</th>
                        <th className="px-4 py-3 font-medium">Seats</th>
                        <th className="px-4 py-3 font-medium">Amount</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-300">
                    {bookings.map((item, index) => (
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
                            <td className="px-4 py-4 font-medium text-white whitespace-nowrap">
                                {item.user.name}
                            </td>

                            <td className="px-4 py-4">
                                <div className="truncate max-w-[220px]">
                                    {item.show.movie.title}
                                </div>
                            </td>

                            <td className="px-4 py-4 whitespace-nowrap">
                                {dateFormat(item.show.showDateTime)}
                            </td>

                            <td className="px-4 py-4">
                                <div className="max-w-[200px] truncate">
                                    {Object.keys(item.bookedSeats)
                                        .map(seat => item.bookedSeats[seat])
                                        .join(", ")}
                                </div>
                            </td>

                            <td className="px-4 py-4 font-semibold text-primary whitespace-nowrap">
                                {currency} {item.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div> : <h1 className="my-4 text-2xl"> No Bookings yet! </h1>}
    </> : <Loading/>
}