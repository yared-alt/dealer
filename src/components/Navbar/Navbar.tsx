"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [prevScroll, setPrevScroll] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const CurrrentScroll = window.scrollY;
      const scrollUp = CurrrentScroll < (prevScroll);

      if (scrollUp) {
        setIsScrolled(false);
      } else if (CurrrentScroll > 100) {
        setIsScrolled(true);
      }
      setPrevScroll(CurrrentScroll)
    };
    setPrevScroll(window.scrollY)

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <header
      className={`fixed  w-full z-50 transition-all  duration-1000 h-auto  ${isScrolled ? "translate-y-0 bg-yellow-100 backdrop-blur-md shadow-sm text-amber-950" : "bg-yellow-50 "
        }`}
    >
      <div className="container  mx-auto ">

      <div className="flex md:px-9 pt-6 md:pt-3 pb-1 md:flex-col justify-between bg-white  sm:bg-transparent align-middle  lg:flex-row ">
          <div className="flex-shrink-0  w-auto my-auto ">
            <Link href="/" className="text-2xl font-bold">
              <Image
              src={"/Wolisohotellogo.svg"}
              alt="Amanuel dealer"
              width={200}
              height={50}
            />
          </Link>
        </div>

          <nav className="hidden md:flex w-[100%] lg:pl-5 justify-between items-center space-x-8 sm:space-x-4">
            <div className={`space-x-8 md:space-x-4 lg:space-x-8 border-1 border-transparent pb-2 flex md:justify-self-start  justify-center w-[80%] ${isScrolled ? "" : "border-b-amber-400"
              }`}>

            <Link href="/" className={` hover:text-amber-400 transition-colors ${isScrolled ? " text-amber-950" : "text-cyan-950"
              }`}>
              Home
            </Link>

            <Link href="/collection" className={`hover:text-amber-400 transition-colors ${isScrolled ? " text-amber-950" : "text-cyan-950"
              }`}>
              Collections
            </Link>
            <Link href="/contact" className={`hover:text-amber-400 transition-colors ${isScrolled ? " text-amber-950" : "text-cyan-950"
              }`}>
              Contact-us
            </Link>
            <Link href="/aboutus" className={`hover:text-amber-400 transition-colors ${isScrolled ? " text-amber-950" : "text-cyan-950"
              }`}>
              About-us
            </Link>
          </div>
          <div className="hidden md:flex sm:ml-6  md:ml-6 lg:ml-10 items-center space-x-3">

            <Link
              href="/signup"
              className="px-4 py-2 rounded-md bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors"
            >
              Signup
            </Link>
          </div>
        </nav>

        </div>
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            className="p-2 rounded-md text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-black" />
            ) : (
              <Menu className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden h-screen flex flex-col justify-between  bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 text-center space-y-1 sm:px-3">
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/"
              className="block px-3 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-500">
              Home
            </Link>

            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/collection" className="block px-3 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-500">
              Collections
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/contact" className="block px-3 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-500">
              Contact-us
            </Link>
            <Link href="/aboutus" className="block px-3 py-2 text-gray-800 hover:bg-amber-50 hover:text-amber-500">
              About-us
            </Link>
            <Link
              onClick={() => setIsMobileMenuOpen(false)}
              href="/signup"
              className="block px-3 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md"
            >
              Signup
            </Link>
          </div>
          <div className="border-t-2 h-32 text-center border-black">
            <p className="items-baseline">designedby yared</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
