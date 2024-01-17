import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DaoLogo from '../assets/image/DAOLOGO.png';
import { AiFillHome } from 'react-icons/ai';
import { FaOptinMonster } from 'react-icons/fa6';
import { FaRegSave } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa6';
import useMetamask from '../services/useMetaMask';

const Navbar = ({ sticky }) => {
  const { hasNft } = useMetamask();
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (sticky) {
      setIsNavOpen(true);
    }
  }, [sticky]);

  const navItems = [
    { name: 'Home', to: '/', icon: AiFillHome },
    { name: 'Citadel', to: '/citadel', icon: FaOptinMonster },
    { name: 'Dashboard', to: '/dashboard', icon: FaRegSave },
    { name: 'User Profile', to: '/userprofile', icon: FaUser },
  ];

  return (
    <>
      <div className="fixed left-[4rem] top-0 z-20 mt-2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-pink-500">
        <img
          src={DaoLogo}
          alt="logo"
          className=" h-12 w-12 transform cursor-pointer transition-all duration-300 ease-in-out hover:scale-105"
          onClick={() => setIsNavOpen(!isNavOpen)}
          disable={!hasNft}
        />
      </div>

      <nav
        className={`${isNavOpen ? 'translate-x-0' : '-translate-x-full'} ${
          sticky ? 'sticky top-0 z-20' : 'fixed left-0'
        } flex h-screen w-36 flex-col items-center bg-gray-800 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-col items-center justify-center pt-28">
          <h3 className="text-md mb-6 font-bold text-pink-500">ILLUCI Citizens</h3>
          <ul className=" ">
            {navItems.map(({ name, to, icon: IconComponent }) => (
              <li key={name} className=" mt-2">
                <Link
                  to={to}
                  className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
                >
                  <IconComponent className="h-8 w-8 text-pink-500" />
                  <p className="ml-3">{name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
