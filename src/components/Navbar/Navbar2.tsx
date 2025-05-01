import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto  ">
      
        <div className="hidden bg-red-400 lg:flex justify-between items-center py-2 px-2 border-b border-gray-200 text-sm">
          <div className="flex items-center">
            <a href="mailto:info@classiccars.com" className="text-gray-600 mr-4 hover:text-primary">info@amanualdealer.com</a>
          </div>
          <div className="flex items-center">
            <a href="tel:+251911204530" className="flex items-center text-primary font-semibold">
              <Phone size={16} className="mr-1" />
              <span>0911-204-530</span>
            </a>
          </div>
        </div>
        <div className="flex px-4 lg:px-8 justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/a01f5908-0857-4f3d-be32-01b586d14214.png" alt="Classic Cars Logo" className="h-10 mr-2" />
              <div className="font-bold text-xl">AMANUAL CARS</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-6 uppercase text-sm font-medium">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary">About</Link></li>
              <li><Link href="/collection" className="hover:text-primary">Our Collection</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/signin" className="hover:text-yellow tracking-wider bg-amber-900 py-2 text-white px-2 rounded-sm">SignIn</Link></li>
            </ul>
          </nav>

          {/* Mobile Navigation Button */}
          <button className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white w-full">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-3 uppercase text-sm font-medium">
              <li><Link href="/" className="block py-2 hover:text-primary">Home</Link></li>
              <li><Link href="/about" className="block py-2 hover:text-primary">About</Link></li>
              <li><Link href="/collection" className="block py-2 hover:text-primary">Our Collection</Link></li>
              <li><Link href="/contact" className="block py-2 hover:text-primary">Contact</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <a href="mailto:info@amanual.com" className="block py-2 text-gray-600">info@classiccars.com</a>
              <a href="tel:+251911204530" className="flex items-center py-2 text-primary font-semibold">
                <Phone size={16} className="mr-1" />
                <span>0911-204-530</span>
              </a>
              <p><Link href="/auth/signin" className="block py-2 hover:text-yellow tracking-wider bg-amber-900 text-center">SignIn</Link></p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
