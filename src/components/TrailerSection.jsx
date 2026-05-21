import {useState} from "react";
import { dummyTrailers } from "../assets/assets";
import BlurCircle from "./BlurCircle";
import ReactPlayer from "react-player/youtube";
import { PlayCircleIcon } from "lucide-react";


const TrailerSection = () => {
  const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 py-20 overflow-hidden">
      <p className="text-gray-300 font-medium text-lg max-w-5xl mx-auto">
        Trailers
      </p>

      {/* VIDEO PLAYER */}
      <div className="relative mt-6 max-w-5xl mx-auto w-full">
        <BlurCircle top="-100px" right="-100px" />

        <div className="w-full aspect-video">
          <ReactPlayer
            url={currentTrailer.videoUrl}
            controls={false}
            width="100%"
            height="100%"
            className="rounded-lg overflow-hidden"
          />
        </div>
      </div>

      {/* TRAILER THUMBNAILS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mt-8 max-w-5xl mx-auto">
        {dummyTrailers.map((trailer) => (
          <div
            key={trailer.image}
            onClick={() => setCurrentTrailer(trailer)}
            className="relative cursor-pointer group rounded-lg overflow-hidden h-32 sm:h-36 md:h-44 lg:h-48 transition-transform hover:-translate-y-1"
          >
            <img
              src={trailer.image}
              alt="trailer"
              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition"
            />

            <PlayCircleIcon
              strokeWidth={1.6}
              className="absolute top-1/2 left-1/2 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrailerSection