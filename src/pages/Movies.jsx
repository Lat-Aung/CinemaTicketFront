import { useEffect, useState } from "react";
import { dummyShowsData } from "../assets/assets"
import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";


function Movies() {
    const {shows} = useAppContext()

    // useEffect(() => console.log(shows), [])

    return shows.length > 0 ? 

    <div className='relative mt-40 mb-60 px-2 md:px-16 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
        <BlurCircle top="150px" left="0px"/>
        <BlurCircle bottom="50px" right="50px"/>
        <h1 className='text-lg font-medium my-4 text-center'> Now Showing </h1> 
        <div className='flex flex-wrap gap-8 justify-center'>
            {shows.map(movie => <MovieCard movie={movie} key={movie._id}/>)}
        </div>
    </div> :
    <div>
        
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-3x1 font-bold text-center'>No movies currently added yet!</h1> 
        </div>
    </div>
}

export default Movies;