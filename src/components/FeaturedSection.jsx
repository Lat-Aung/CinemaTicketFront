import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueCircle from "./BlurCircle";
import MovieCard from "./MovieCard";
import { dummyShowsData } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import Loading from "./Loading";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { shows } = useAppContext();

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 overflow-hidden">
      {shows.length > 0 && <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="relative flex items-center justify-between pt-16 md:pt-20 pb-8 md:pb-10">
          <BlueCircle top="0" right="-80px" />

          <p className="text-gray-300 font-medium text-lg">
            Now Showing
          </p>

          <button
            onClick={() => navigate("/movies")}
            className="group flex items-center gap-2 text-sm text-gray-300 cursor-pointer"
          >
            View All
            <ArrowRight className="group-hover:translate-x-0.5 transition w-4 h-4" />
          </button>
        </div>

        {/* MOVIE GRID - FIXED RESPONSIVENESS */}
        <div className="flex flex-wrap gap-8 justify-center">
          {shows ? (
            shows.slice(0, 4).map((show) => (
              <MovieCard key={show._id} movie={show} />
            ))
          ) : (
            <div className="col-span-full flex justify-center">
              <Loading />
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14 md:mt-20">
          <button
            onClick={() => {
              navigate("/movies");
              scrollTo(0, 0);
            }}
            className="px-8 md:px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer"
          >
            Show more
          </button>
        </div>
      </div>}
    </div>
  );
};

export default FeaturedSection