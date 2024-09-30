import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
import { ReactComponent as VacuLogo } from '../assets/vacu.svg';

const productCategories = [
  {
    name: 'Vacuums',
    items: ['TurboSuck 3000', 'QuietClean Pro', 'UltraLight Stick']
  },
  { name: 'Steam Mops', items: ['SteamMaster X1'] },
  { name: 'Robotic', items: ['RoboVac AI'] },
  { name: 'Trash Management', items: ['SmartBin Pro'] },
  { name: 'Air Filters', items: ['PureAir 360'] }
];

// Function to generate SEO-friendly URLs
const generateProductUrl = (category, product) => {
  const formatForUrl = (str) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return `/products/${formatForUrl(category)}/${formatForUrl(product)}`;
};

const Header = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [marginLeft, setMarginLeft] = useState('0');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMarginLeft('calc(-65vw / 2)');
      } else {
        setMarginLeft('0');
      }
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <header className="bg-vacu relative">
      <div className="container mx-auto flex items-center justify-between h-16">
        <Link to="/" className="flex items-center h-full">
          <VacuLogo className="h-8 w-auto text-vacu-white hover:opacity-80 transition-opacity duration-300" />
        </Link>
        <div className="flex-grow flex justify-center h-full">
          <nav className="h-full">
            <ul className="flex h-full">
              {/* Dropdown menu item */}
              <li className="group h-full relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                {/* Dropdown trigger link */}
                <Link to="/products" 
                      className="inline-flex items-center px-4 h-full text-vacu-white hover:bg-vacu-grad hover:text-black transition-colors duration-300">
                  Products
                </Link>
                {/* Dropdown menu */}
                <div 
                  ref={dropdownRef}
                  className={`
                    absolute top-full left-0 bg-white rounded-b-md shadow-lg py-4 z-50 
                    transition-all duration-300 ease-in-out overflow-hidden
                    w-screen md:w-[65vw] md:left-1/2
                    ${isAnimating ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
                  `}
                  style={{ 
                    marginLeft,
                    visibility: isAnimating ? 'visible' : 'hidden',
                  }}
                >
                  {/* Dropdown content */}
                  <div className="flex flex-row p-4 justify-between">
                    {/* Map through product categories */}
                    {productCategories.map((category, index) => (
                      <div key={index} className="flex-grow px-4 border-r last:border-r-0">
                        <h3 className="font-semibold mb-2 text-lg">{category.name}</h3>
                        <ul>
                          {/* Map through items in each category */}
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="mb-1">
                              <Link 
                                to={generateProductUrl(category.name, item)}
                                className="block p-2 text-sm text-gray-700 hover:text-black hover:bg-gray-100 rounded transition-colors duration-200"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
              <li className="relative group h-full">
                <Link to="/about" className="inline-flex items-center px-4 h-full text-vacu-white hover:bg-vacu-grad hover:text-black transition-colors duration-300">
                  About
                </Link>
              </li>
              <li className="relative group h-full">
                <Link to="/hire-me" className="inline-flex items-center px-4 h-full text-vacu-white hover:bg-vacu-grad hover:text-black transition-colors duration-300">
                  Hire Me
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-8"></div> {/* Spacer to balance the logo */}
      </div>
    </header>
  );
};

export default Header;
