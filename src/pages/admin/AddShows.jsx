import { useEffect, useState } from "react"
import Loading from "../../components/Loading"
import Title from "../../components/admin/Title"
import { StarIcon, CheckIcon, Trash2Icon } from "lucide-react"
import { kConverter } from "../../lib/kConverter"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

export default function AddShows() {
    const { axios, getToken, user, image_base_url } = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY || "$"
    
    const [nowPlayingMovies, setNowPlayingMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [dateTimeSelection, setDateTimeSelection] = useState({})
    const [dateTimeInput, setDateTimeInput] = useState("")
    const [showPrice, setShowPrice] = useState("")
    const [addingShow, setAddingShow] = useState(false)

    const fetchNowPlayingMovies = async () => {
        try {
            const { data } = await axios.get('/api/show/now-playing', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })
            setNowPlayingMovies(data.movies)
        } catch (err) {
            console.error(err)
            toast.error("Failed to sync current cinema listings.")
        }
    }

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return
        const [date, time] = dateTimeInput.split("T")
        if (!date || !time) return

        setDateTimeSelection((prev) => {
            const times = prev[date] || []
            if (!times.includes(time)) {
                return { ...prev, [date]: [...times, time] }
            }
            return prev
        })
    }

    const handleRemoveTime = (date, time) => {
        setDateTimeSelection((prev) => {
            const filtered = prev[date].filter((t) => t !== time)
            if (filtered.length === 0) {
                const { [date]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [date]: filtered }
        })
    }

    const handleSubmit = async () => {
        try {
            setAddingShow(true)

            if (!selectedMovie || Object.keys(dateTimeSelection).length === 0 || !showPrice) {
                setAddingShow(false)
                return toast.error('Missing required fields')
            }

            const showInput = Object.entries(dateTimeSelection).map(([date, times]) => ({ date, times }))

            const { data } = await axios.post('/api/show/add', {
                movieId: selectedMovie,
                showInput,
                showPrice: Number(showPrice)
            }, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            toast.success(data.message || "Show added successfully")
            setSelectedMovie(null)
            setDateTimeSelection({})
            setShowPrice("")
            setDateTimeInput("")
        } catch (err) {
            console.error(err)
            toast.error('Error adding show')
        } finally {
            setAddingShow(false)
        }
    }

    useEffect(() => {
        if (user) fetchNowPlayingMovies()
    }, [user])

    if (nowPlayingMovies.length === 0) return <Loading />

    return (
        <div className="w-full pb-10 space-y-8">
            <Title text1="Add" text2="Shows" />

            {/* Movie Selection */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="mb-4">
                    <p className="text-lg font-medium text-white">Now Playing Movies</p>
                    <p className="text-xs text-gray-500">Select a movie to schedule shows</p>
                </div>

                <div className="overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-white/10">
                    <div className="flex gap-4 w-max">
                        {nowPlayingMovies.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => setSelectedMovie(movie.id)}
                                className={`relative w-[150px] flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shrink-0
                                    bg-gradient-to-b from-primary/10 to-black/30 border border-white/10
                                    ${selectedMovie === movie.id ? 'border-primary/40 ring-1 ring-primary/30 shadow-[0_0_25px_rgba(255,255,255,0.04)]' : 'hover:border-primary/30'}
                                `}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
                                    <img
                                        src={`${image_base_url}${movie.poster_path}`}
                                        className={`w-full h-full object-cover transition-opacity duration-300 ${selectedMovie && selectedMovie !== movie.id ? 'opacity-40' : 'opacity-100'}`}
                                    />

                                    <div className="absolute bottom-0 left-0 w-full flex justify-between px-2 py-1 text-[10px] bg-black/80">
                                        <span className="flex items-center gap-1 text-amber-400">
                                            <StarIcon className="w-3 h-3 fill-amber-400" />
                                            {movie.vote_average?.toFixed(1) || "0.0"}
                                        </span>
                                        <span className="text-gray-400">
                                            {kConverter(movie.vote_count)}
                                        </span>
                                    </div>

                                    {selectedMovie === movie.id && (
                                        <div className="absolute top-2 right-2 bg-primary rounded-md p-1">
                                            <CheckIcon className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-2">
                                    <p className="text-xs text-gray-200 truncate">{movie.title}</p>
                                    <p className="text-[11px] text-gray-500">{movie.release_date?.split('-')[0]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inputs */}
            <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm text-gray-300">Price</label>
                        <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-primary/40 focus-within:bg-white/[0.05]">
                            <span className="text-primary font-semibold">{currency}</span>
                            <input
                                type="number"
                                value={showPrice}
                                onChange={(e) => setShowPrice(e.target.value)}
                                className="bg-transparent w-full outline-none text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-gray-300">Schedule</label>
                        <div className="flex gap-2 mt-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] focus-within:border-primary/40 focus-within:bg-white/[0.05]">
                            <input
                                type="datetime-local"
                                value={dateTimeInput}
                                onChange={(e) => setDateTimeInput(e.target.value)}
                                className="bg-transparent w-full text-white outline-none"
                            />
                            <button
                                onClick={handleDateTimeAdd}
                                className="px-4 py-2 bg-primary hover:brightness-110 text-white rounded-lg text-xs"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Selected Slots */}
            {Object.keys(dateTimeSelection).length > 0 && (
                <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <p className="text-sm text-gray-400 mb-3">Selected Slots</p>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                        {Object.entries(dateTimeSelection).map(([date, times]) => (
                            <div key={date}>
                                <p className="text-xs text-primary mb-1">{date}</p>
                                <div className="flex flex-wrap gap-2">
                                    {times.map((time) => (
                                        <div
                                            key={time}
                                            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10"
                                        >
                                            <span className="text-xs text-gray-300">{time}</span>
                                            <button
                                                onClick={() => handleRemoveTime(date, time)}
                                                className="text-gray-500 hover:text-red-400"
                                            >
                                                <Trash2Icon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTA */}
            <button
                onClick={handleSubmit}
                disabled={addingShow}
                className="w-full xl:w-auto px-10 py-3 rounded-xl bg-primary hover:brightness-110 text-white font-semibold disabled:opacity-50"
            >
                {addingShow ? "Processing..." : "Publish Show"}
            </button>
        </div>
    )
}
