import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import BlurCircle from "../components/BlurCircle";
import { dummyBookingData } from "../assets/assets"
import timeFormat from "../lib/timeFromat";
import { dateFormat } from "../lib/dateFormat";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Mybookings() {
    const {shows, getToken, user, image_base_url, axios} = useAppContext()

    const currency = import.meta.env.VITE_CURRENCY

    const [bookings, setBookings] = useState([]) 
    const [isLoading, setIsLoading] = useState(true)

    // dummy
/*     const getMyBookings = async () => {
        setBookings(dummyBookingData) 
        setIsLoading(false)
    } */

    const getMyBookings = async () => {
        try {
            const { data } = await axios.get(
                `/api/user/bookings`, 
                {headers: {Authorization: `Bearer ${await getToken()}`}}
            )

            setBookings(data.bookings)
        } catch(err) {
            const {data} = err.response
            // toast.error(data.message)
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }
    

    useEffect(()=>{
    if(user)
        getMyBookings()
    },[user])

    return !isLoading ? 
    <div className="relative px-4 sm:px-6 md:px-16 lg:px-40 pt-24 md:pt-40 min-h-[80vh] flex flex-col items-center">

        <BlurCircle top="100px" left="100px" />

        <div>
        <BlurCircle bottom="600px" left="0" />
        </div>

        <h1 className="text-xl sm:text-lg font-semibold mb-6 text-center">My Bookings</h1>

        {bookings.length == 0 ? (
        <h2 className="text-gray-300 text-base sm:text-sm text-center">
            You have not added any bookings yet!
        </h2>
        ) : (
        <div className="w-full flex flex-col items-center gap-6">
            {bookings.map((item, index) => (
            <div
                key={index}
                className="w-full max-w-4xl flex flex-col sm:flex-row justify-between 
                bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-4 md:p-5
                hover:border-primary/40 transition"
            >
                {/* LEFT SIDE */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                <img
                    src={image_base_url + item.show.movie.poster_path}
                    alt=""
                    className="w-full sm:w-40 md:w-44 aspect-video object-cover object-bottom rounded-lg"
                />

                <div className="flex flex-col justify-between w-full">
                    <div>
                    <p className="text-lg sm:text-lg font-semibold leading-tight">
                        {item.show.movie.title}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-sm">
                        {timeFormat(item.show.movie.runtime)}
                    </p>
                    </div>

                    <p className="text-gray-300 text-sm sm:text-sm mt-2 sm:mt-0">
                    {dateFormat(item.show.showDateTime)}
                    </p>
                </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-col sm:items-end sm:text-right justify-between mt-5 sm:mt-0 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 sm:justify-end">
                    <p className="text-2xl sm:text-2xl font-semibold">
                    {currency}
                    {item.amount}
                    </p>

                    {!item.isPaid ? (
                    <Link
                        to={item.paymentLink}
                        className="bg-primary px-5 py-2 text-sm sm:text-sm rounded-full font-medium hover:bg-primary-dull transition w-fit"
                    >
                        Pay Now
                    </Link>
                    ) : (
                    <div className="bg-lime-600 px-5 py-2 text-sm sm:text-sm rounded-full font-medium w-fit">
                        Paid
                    </div>
                    )}
                </div>

                <div className="text-sm sm:text-sm mt-5 space-y-1">
                    <p>
                    <span className="text-gray-300">Total Tickets: </span>
                    {item.bookedSeats.length}
                    </p>

                    <p>
                    <span className="text-gray-300">Seat Number: </span>
                    {item.bookedSeats.join(", ")}
                    </p>
                </div>
                </div>
            </div>
            ))}
        </div>
        )}
    </div>
    : <Loading />;

}

export default Mybookings;