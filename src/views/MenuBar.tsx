import React, { useState } from 'react';
import { Meeting } from 'data';
// import EmailService from '../email';

import { HiOutlineCog } from 'react-icons/hi';
import ListHeader from 'components/ListHeader';
import ListItem from 'components/ListItem';
import Search from 'components/Search';
import Header from '../components/Header';

interface Props {
  meetings: Meeting[];
}

const MenuBar = ({ meetings }: Props) => {
  const [input, setInput] = useState<string>('');

  const groupMeetingsByDate = (mtgs: Meeting[]) => {
    return mtgs.reduce((groups, mtg) => {
      const key = mtg.datetime.toDateString();
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(mtg);
      return groups;
    }, {} as Record<string, Meeting[]>);
  };

  const filterByCurrentInput = (mtgs: Meeting[]) => {
    const inputString = input.toLowerCase().trim();
    const filtered = mtgs.filter(
      (meeting) =>
        meeting.datetime
          .toLocaleDateString('en-US', { dateStyle: 'full' })
          .toLowerCase()
          .includes(inputString) ||
        meeting.subject.toLowerCase().includes(inputString)
    );
    return groupMeetingsByDate(filtered);
  };

  const groupedMeetings = filterByCurrentInput(meetings);

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
      {Object.keys(groupedMeetings).length > 0 ? (
        Object.entries(groupedMeetings).map(([k, v]) => (
          <React.Fragment key={k}>
            <ListHeader title={k} />
            {v.map((mtg) => (
              <ListItem key={mtg.datetime.getTime()} meeting={mtg} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <div className="flex flex-row p-28 justify-center content-center">
          <p className="text-slate-500 text-center">
            Hooray, no more upcoming meetings! 🎉
          </p>
        </div>
      )}
      {/* <ListHeader title="7 Jan 2022" />
      <ListItem />
      <ListItem />
      <ListHeader title="8 Jan 2022" />
      <ListItem /> */}
    </div>
  );
};

export default MenuBar;
