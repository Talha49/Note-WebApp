import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcCalendar, FcClock } from 'react-icons/fc';
import { FaSearch, FaPlusCircle } from 'react-icons/fa';
import { showUser } from '../features/userDataslice';
import { searchUsers } from '../features/userDataslice';
import { useDispatch, useSelector } from 'react-redux';
import { deletUser } from '../features/userDataslice';

import './Togle.css';

const AddNote = () => {
  const { users, loading, searchData } = useSelector((state) => state.app);
  console.log(users, loading);

  const [tDate, setTDate] = useState('');
  const [clientTime, setClientTime] = useState('');
  const [day, setDay] = useState('');
  const [search, setSearch] = useState('');
  const [dark, setDark] = useState(true);
  const [sortOrder, setSortOrder] = useState('newest');
  const [displayMode, setDisplayMode] = useState('new');
  const [displayAll, setDisplayAll] = useState(true);


  const darkmode = () => {
    setDark((prevMode) => !prevMode);
  };

  const dispatch = useDispatch();

  const getServerTime = () => {
    const now = new Date();
    setTDate(now.toLocaleDateString());
    setClientTime(now.toLocaleTimeString());

    const day = now.getDay();
    // Update the day on the server
    setDay(day);
  };

  useEffect(() => {
    getServerTime();
    dispatch(showUser());
    dispatch(searchUsers(search));
  }, [dark, dispatch, search]);

  const DaytoString = () => {
    if (day === 0) return 'Sunday';
    else if (day === 1) return 'Monday';
    else if (day === 2) return 'Tuesday';
    else if (day === 3) return 'Wednesday';
    else if (day === 4) return 'Thursday';
    else if (day === 5) return 'Friday';
    return 'Saturday';
  };

  const AlphabetLoader = () => {
    const alphabet = 'Loading...';
    const [loadedText, setLoadedText] = useState('');

    useEffect(() => {
      const loadText = async () => {
        for (let i = 0; i < alphabet.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 20)); // Adjust the delay as needed
          setLoadedText((prevText) => prevText + alphabet[i]);
        }
      };
      loadText();
    }, []);

    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-black mx-4"></div>
        <div className="text-4xl font-bold text-gradient-gradient-silver">{loadedText}</div>
      </div>
    );
  };
  if(loading){
    return <AlphabetLoader />
  }

  return (
    <div className={` ${dark ? 'light-mode' : 'dark'}`}>
      <div className="shadow-lg p-6 rounded-md md:h-[30vh] lg:h-[30vh] xl:h-[30vh] flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg font-bold text-blue-700 mb-4 md:mb-0">
          <p>
            Today is <b className="text-red-500 font-semibold">{DaytoString()}</b>
          </p>
          <h2>
            Your Tasks For today is{' '}
            {users.length}
            <b className="text-green-700">.</b>
          </h2>
        </div>
        <div className="ml-4">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="flex items-center gap-2">
              <FcCalendar className="text-xl" /> <p>{tDate}</p>
            </div>
            <div className="flex items-center gap-2">
              <FcClock className="text-xl" />
              <p>{clientTime}</p>
            </div>
            <button onClick={darkmode}>
              <svg
                width="50"
                height="25"
                viewBox="0 0 50 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="25" height="25" rx="12.5" fill="#333333" />
                <circle cx="37.5" cy="12.5" r="8" fill="#ffffff" />
                <rect x="25" width="25" height="25" rx="12.5" fill="#ffffff" />
                <circle cx="12.5" cy="12.5" r="8" fill="#333333" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Create and Search bar */}
      <div className="px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/create" className="text-blue-500 hover:text-blue-700 mb-4 md:mb-0 md:mr-4">
            <FaPlusCircle className="mr-2" />
            Create
          </Link>
       

          <div className="flex flex-row">
  <button
    onClick={() => {
      setDisplayMode('new');
      setDisplayAll(false);
    }}
    className={`mr-2 ${displayMode === 'new' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
  >
    New
  </button>
  <button
    onClick={() => {
      setDisplayMode('old');
      setDisplayAll(false);
    }}
    className={`mr-2 ${displayMode === 'old' ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
  >
    Old
  </button>
  <button
    onClick={() => {
      setDisplayAll(true);
      setDisplayMode('');
    }}
    className={`mr-2 ${displayAll ? 'text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
  >
    All
  </button>
</div>


          <div className="relative  mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>

      <div
        className={`flex py-9 flex-col h-full justify-center  items-center gap-8 ${
          dark ? 'dark' : 'bg-gradient-to-r from-emerald-700 to-emerald-900'
        } `}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 py-8 gap-8">
        {users &&
  users
    .filter((user) => {
      if (searchData.length === 0) {
        return displayAll || (displayMode === 'new' && user.id % 2 === 0) || (displayMode === 'old' && user.id % 2 !== 0);
      } else {
        return (
          user.title.toLowerCase().includes(searchData.toLowerCase()) &&
          (displayAll || (displayMode === 'new' && user.id % 2 === 0) || (displayMode === 'old' && user.id % 2 !== 0))
        );
      }
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    })
              .map((user) => (
                <div key={user.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                  <div className="mt-4 flex justify-end gap-2">
                    <Link to={`/update/${user.id}`} className="text-gray-500 hover:text-gray-700">
                      {/* ... */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M20.71 4.63l-1.34-1.34a1 1 0 0 0-1.42 0L13 10.59 3.74 1.34a1 1 0 0 0-1.42 0l-1.34 1.34a1 1 0 0 0 0 1.42l10.59 10.59-6.36 6.36a1 1 0 0 0-.29.71v3a1 1 0 0 0 1 1h3a1 1 0 0 0 .71-.29l6.36-6.36 10.59 10.59a1 1 0 0 0 1.42 0l1.34-1.34a1 1 0 0 0 0-1.42z" />
                      </svg>
                    </Link>
                    <button onClick={() => dispatch(deletUser(user.id))} className="text-red-500 hover:text-red-700">
                      {/* ... */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M18 4h-1V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1H6a1 1 0 0 0-1 1v1H4a1 1 0 0 0 0 2h1v11a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V7h1a1 1 0 0 0 0-2zM9 4h6v1H9V4zm9 14a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3V7h12z" />
                      </svg>
                    </button>
                   
                  </div>
                  <div className="text-xl font-semibold">{user.title}</div>
                  <div className="text-gray-600 max-h-32 overflow-y-auto">{user.description}</div>
                  <h1>{tDate}</h1>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AddNote;




//MockAPI : mehiso1493@mkurg.com // 