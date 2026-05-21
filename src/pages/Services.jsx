import { Ticket, Popcorn, Star, ShieldCheck, Clock, Gift, Film, Headphones } from "lucide-react";

export default function Services() {
  return (
    <div className="min-h-screen bg-mist-900 text-white">
      {/* HERO */}
      <div className="relative flex flex-col items-start justify-center gap-5 px-6 md:px-16 lg:px-36 bg-[url('/servicesHero.jpg')] bg-cover bg-center h-screen">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 flex flex-col items-start gap-5">
          <h1 className="text-5xl md:text-[70px] md:leading-18 font-semibold max-w-2xl">
            Premium Services <br /> for Movie Lovers
          </h1>

          <p className="max-w-md text-gray-300">
            From luxury seating to exclusive perks, we deliver a cinema experience beyond just watching films.
          </p>

          <button className="flex items-center gap-2 px-6 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-full font-medium">
            Explore Services
          </button>
        </div>
      </div>

      {/* FEATURES GRID */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            What We Offer
          </h2>
          <p className="text-gray-300">
            A complete cinematic ecosystem designed to elevate every moment of your experience.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Ticket,
              title: "Instant Ticket Booking",
              desc: "Book your seats in seconds with a seamless, frictionless system."
            },
            {
              icon: Popcorn,
              title: "Food & Snacks Preorder",
              desc: "Order popcorn, drinks, and combos before you even enter the hall."
            },
            {
              icon: Star,
              title: "Premium Seating",
              desc: "Recliner seats, extra legroom, and VIP comfort tiers."
            },
            {
              icon: ShieldCheck,
              title: "Secure Payments",
              desc: "Fully encrypted transactions with trusted payment gateways."
            },
            {
              icon: Clock,
              title: "Real-Time Show Updates",
              desc: "Live show timings, delays, and availability tracking."
            },
            {
              icon: Gift,
              title: "Rewards & Offers",
              desc: "Earn points and unlock exclusive cinema discounts."
            },
            {
              icon: Film,
              title: "Exclusive Screenings",
              desc: "Access early premieres and special movie events."
            },
            {
              icon: Headphones,
              title: "Immersive Audio",
              desc: "Dolby Atmos level sound experience in select theatres."
            }
          ].map((service, i) => (
            <div
              key={i}
              className="bg-[#141414] p-6 rounded-xl border border-white/10 hover:border-primary/40 transition group"
            >
              <service.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div className="px-6 md:px-16 lg:px-24 xl:px-44 pb-24">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/filmTexture.jpg')] bg-cover" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-semibold mb-3">
              Ready for a Better Cinema Experience?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Join thousands of movie lovers enjoying premium theatre experiences every day.
            </p>

            <button className="px-8 py-3 bg-primary hover:bg-primary-dull rounded-full font-medium transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
