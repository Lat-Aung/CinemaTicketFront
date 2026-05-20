import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export default function AppProvider({children}) {
    
    const [isAdmin, setIsAdmin] = useState(false)
    const [shows, setShows] = useState([])
    const [favMovies, setFavMovies] = useState([])
    const image_base_url = useMemo(() => import.meta.env.VITE_TMDB_IMAGE_BASE_URL, [])

    const [fetchingAdminInfo, setIfFetchingAdminInfo] = useState(false)

    const {user, isSignedIn, isLoaded} = useUser()
    const {getToken} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const fetchIsAdmin = async () =>  {
        try {
            setIfFetchingAdminInfo(true)
            const {data} = await axios.get('/api/admin/is-admin', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            })

            setIsAdmin(data.isAdmin)

            // for if initial page was set to admin page prior log out.
            if(!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('You are not Authroized to access admin dashboard')
            }
                

        } catch(err) {
            const {data} = err.response
            console.error('Fetch Is Admin: ', data)
        } finally {
            setIfFetchingAdminInfo(false)
        }
    }

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all')
            setShows(data.shows)
                
        } catch (err) {
            const {data} = err.response
            toast.error(data.message)
            console.error(err)
        }
    }

    const fetchFavoriteMovies = async () => {
        

        try {
            
            const { data } = await axios.get(
                '/api/user/favorites', 
                {headers:
                {Authorization: `Bearer ${await getToken()}`}
            })

            // console.log('Fetch Movies Data: ', data)

            if(data.success) {
                setFavMovies(data.movies)
            } else {
                toast.error('From Fetch Fav movies: Error.')
            }

        } catch (err) {
            console.error(err.response.data)
        } 
    }
    
    useEffect(() => {
        // console.log("User: " +user);
        // console.log("Is Admin: " +isAdmin)
        if(user) {
            fetchIsAdmin()
            fetchFavoriteMovies()
            fetchShows()
            // console.log('Fetch ran!')
        }
            
        
    }, [user])

    // useEffect(() => console.log('User Dedicated: ' +user), [user])

    const value = { 
        axios,
        fetchIsAdmin,
        user, isSignedIn, isLoaded, getToken, navigate, isAdmin, shows,
        fetchingAdminInfo,
        favMovies, fetchFavoriteMovies, image_base_url 
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)