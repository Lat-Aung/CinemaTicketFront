import { useState } from "react";
import { dummyShowsData } from "../assets/assets"
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";


function Favorites() {

    const {favMovies} = useAppContext()

    return favMovies.length > 0 ? 

    <div className='relative my-40 mb-60 px-6 md: px-16 1g:px-40 x1:px-44 overflow-hidden min-h-[80vh]'>
    <BlurCircle top="150px" left="0px"/>
    <BlurCircle bottom="50px" right="50px"/>
    <h1 className='text-lg font-medium my-4'> Your Favorite Movies </h1> 
    <div className='flex flex-wrap max-sm:justify-center gap-8'>
            {favMovies.map(movie => <MovieCard movie={movie} key={movie._id}/>)}
        </div>
    </div> :
    <div>
        
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3xl font-bold text-center'> You have not added any Favourite movies to the  list yet! </h1> 
        </div>
    </div>
}

export default Favorites;