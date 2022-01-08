import React from 'react';
import { IconContext } from 'react-icons';

type Props = {
  title: string;
  btnContent: React.ReactNode;
  handleClick: () => void;
};

const Header = ({ title, btnContent, handleClick }: Props) => {
  return (
    <div className="flex flex-row items-center">
      <div className="flex flex-1 items-center">
        <p className="flex-grow text-2xl font-bold tracking-tight text-blue-400">
          {title}
        </p>
        <button
          type="button"
          onClick={handleClick}
          className="text-slate-400 transition duration-200 ease-in-out hover:stroke-current hover:text-blue-400 focus:outline-none active:text-blue-500 cursor-pointer"
        >
          <IconContext.Provider value={{ size: '1.5em' }}>
            {btnContent}
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default Header;
