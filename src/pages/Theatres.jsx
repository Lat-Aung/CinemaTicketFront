import { ArrowRight, MapPin, Ticket, Calendar, Star } from "lucide-react";
import { useMemo } from "react";

export default function Theatres() {

    const theaters = useMemo(() => [
    {
        name: "Grand Cineplex 1",
        img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Skyline Cinema",
        img: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?auto=format&fit=crop&w=1400&q=80",
    },
    {
        name: "Royal Movie House",
        img: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2luZW1hfGVufDB8fDB8fHww",
    },
    {
        name: "Galaxy Theatre",
        img: "https://images.unsplash.com/photo-1485095329183-d0797cdc5676?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Nova Screens",
        img: "https://plus.unsplash.com/premium_photo-1664303124313-126bf7456982?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2luZW1hfGVufDB8fDB8fHww",
    },
    {
        name: "CineStar Deluxe",
        img: "https://images.unsplash.com/photo-1604975701397-6365ccbd028a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNpbmVtYXxlbnwwfHwwfHx8MA%3D%3D",
    },
    ], [])

  return (
    <div className="min-h-screen bg-mist-900 text-white">
      {/* HERO SECTION */}
      <div className="flex flex-col items-start justify-center gap-5 px-6 md:px-16 lg:px-36 bg-[url('/theatresHero.jpg')] bg-cover bg-center h-screen">
        <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-2xl">
          Experience Movies <br /> in Cinematic Theatres
        </h1>

        <p className="max-w-md text-gray-300">
          Step into a world where storytelling comes alive on the big screen. Discover premium theatres, immersive sound systems, and unforgettable viewing experiences.
        </p>

        <button className="flex items-center gap-2 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
          Explore Theatres
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* FEATURE SECTION */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Premium Theatre Experience
          </h2>
          <p className="text-gray-300">
            From luxury seating to Dolby surround sound, our partnered theatres redefine how movies should be experienced.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-primary/40 transition">
            <Ticket className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-400 text-sm">
              Book tickets instantly with a seamless experience across all devices.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-primary/40 transition">
            <Star className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-400 text-sm">
              Enjoy ultra-clear visuals, surround sound, and luxury seating.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-primary/40 transition">
            <MapPin className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wide Locations</h3>
            <p className="text-gray-400 text-sm">
              Find theatres near you with our expanding global network.
            </p>
          </div>
        </div>
      </div>

      {/* CINEMAS LIST SECTION */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 pb-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xl font-medium text-gray-300">Featured Theatres</h2>
          <button className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Static Theatre Cards */}
          {theaters.map((item, index) => (
            <div
              key={index}
              className="bg-[#121212] rounded-xl overflow-hidden border border-white/10 hover:border-primary/40 transition group"
            >
              <div className="h-44 relative overflow-hidden">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold">{item.name}</h3>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                  <MapPin className="w-4 h-4" /> Downtown District
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                  <Calendar className="w-4 h-4" /> Open Daily
                </div>

                <button className="mt-4 w-full py-2 bg-primary hover:bg-primary-dull rounded-md text-sm font-medium transition">
                  View Shows
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
