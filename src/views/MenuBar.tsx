import React from 'react';
import {
  HiOutlineCog
} from 'react-icons/hi';
import Header from '../components/Header';


const MenuBar = () => {
  return (
    <div className="container mx-auto px-4 my-3 w-full bg-white">
      <Header
        title="Lineup"
        btnContent={<HiOutlineCog />}
        handleClick={() => ""}
      />
      <div className="flex flex-row mt-4 gap-x-3 items-center">
        <div className="flex flex-row p-20 justify-center content-center">
          <p className="text-gray-400 text-center">
            No upcoming meetings!
          </p>
        </div>
      </div>
    </div>
  )
};

export default MenuBar;
