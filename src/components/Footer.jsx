import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { assets } from "../assets/assets";
const Footer = () => {
  return (
    <footer className="px-6 mt-40 md:px-16 lg:px-36 w-full text-gray-300 border-t border-white/10 py-8">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 pb-14">
        {/* BRAND */}
        <div className="md:max-w-96">
          <h3 className="text-4xl text-white">ShowTimeX</h3>

          <p className="mt-6 text-sm text-gray-400">
            Experience movies like never before with premium theatres, seamless booking, and immersive trailers.
          </p>

          <div className="flex items-center gap-2 mt-5 flex-wrap">
            <img
              src={assets.googlePlay}
              alt="google play"
              className="h-10 w-auto"
            />
            <img
              src={assets.appStore}
              alt="app store"
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* LINKS */}
        <div className="flex-1 flex flex-col sm:flex-row md:justify-end gap-16">
          <div>
            <h2 className="font-semibold mb-5 text-white">Company</h2>
            <ul className="text-sm space-y-2">
              {["Home", "Movies", "Theatres", "Services", "Contact"].map((item) => (
                <li key={item} className="hover:text-white transition">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-5 text-white">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +1-234-567-890
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@showtimex.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                21 Cinema Avenue, Downtown
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="pt-4 text-center text-sm pb-5 text-gray-500 border-t border-white/10">
        Copyright {new Date().getFullYear()} © Lat Aung. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;