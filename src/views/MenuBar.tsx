import React, { useEffect, useState } from 'react';
import { Meeting, Meetings } from 'data';
// import EmailService from '../email';

import { HiOutlineCog } from 'react-icons/hi';
import ListHeader from 'components/ListHeader';
import ListItem from 'components/ListItem';
import Search from 'components/Search';
import Header from '../components/Header';

const MenuBar = ({}: {}) => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [groupedMeetings, setGroupedMeetings] = useState<
    Record<string, Meeting[]>
  >({});
  const [input, setInput] = useState<string>('');

  const isLoggedIn = window.electron.auth.login(
    'sumofabiatch45@gmail.com',
    'HackAndRoll2022'
  );
  console.log(isLoggedIn);
  const mtgs = window.electron.meetings.get();
  console.log(mtgs);

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
    // console.log('meetings:', mtgs);
    let filtered = mtgs.filter(
      (meeting) =>
        meeting.datetime
          .toLocaleDateString('en-US', { dateStyle: 'full' })
          .toLowerCase()
          .includes(inputString) ||
        meeting.subject.toLowerCase().includes(inputString)
    );
    return groupMeetingsByDate(filtered);
  };

  useEffect(() => {
    // The purpose of having this cancel variable is to prevent memory leaks
    // by using it in the callback and the cleanup function.
    // Ref: https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
    let cancel = false;

    if (!cancel) {
      setMeetings(mtgs);
      setGroupedMeetings(filterByCurrentInput(meetings));
    }

    return () => {
      cancel = true;
    };
  });

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
