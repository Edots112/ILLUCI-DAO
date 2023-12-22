import React from 'react';
import { Link } from 'react-router-dom';
import DaoLogo from '../assets/image/DAOLOGO.png';
import { AiFillHome } from 'react-icons/ai';
import { FaOptinMonster } from 'react-icons/fa6';
import { FaRegSave } from 'react-icons/fa';
import { BsCollection } from 'react-icons/bs';
import { IoIosSettings } from 'react-icons/io';

const Navbar = () => {
  return (
    <>
      <nav className="fixed left-0 top-0 flex h-screen  w-64 flex-col items-center bg-gray-800">
        <img src={DaoLogo} alt="logo" className="my-8 h-16 w-16" />
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-md font-bolda text-pink-500">ILLUCI Citizens </h3>
          <ul className=" ">
            <li className="">
              <Link
                to="/"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <AiFillHome className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3">Home</span>
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/citadel"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <FaOptinMonster className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3">Citadel</span>
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/staking"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <FaRegSave className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3">Staking</span>
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/dashboard"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <FaRegSave className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3"></span>
              </Link>
            </li>
          </ul>
          <h3 className="text-md font-bolda mt-6 text-pink-500">Account </h3>
          <ul className=" ">
            <li className="">
              <Link
                to="/"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <BsCollection className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3">My Collection</span>
              </Link>
            </li>
            <li className="mt-2">
              <Link
                to="/dashboard"
                className="flex h-10 items-center p-2 text-white transition-all duration-500 hover:scale-105 hover:bg-pink-400"
              >
                <div className="">
                  <IoIosSettings className="h-8 w-8 text-pink-500" />
                </div>
                <span className="ml-3">Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
