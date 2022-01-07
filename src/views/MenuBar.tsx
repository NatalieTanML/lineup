import React, { useState } from 'react';

import { HiOutlineCog } from 'react-icons/hi';
import ListHeader from 'components/ListHeader';
import ListItem from 'components/ListItem';
import Search from 'components/Search';
import Header from '../components/Header';

const MenuBar = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="container mx-auto px-4 my-3 w-full">
      <Header
        title="Lineup"
        btnContent={<HiOutlineCog />}
        handleClick={() => ''}
      />
      <div className="flex flex-row mt-4 gap-x-3 items-center">
        <Search
          keyword={input}
          setKeyword={setInput}
          title="Search for a meeting"
          placeholder="Search"
        />
      </div>
      <ListHeader title="7 Jan 2022" />
      <ListItem />
      <ListItem />
      <ListHeader title="8 Jan 2022" />
      <ListItem />
    </div>
  );
};

export default MenuBar;
