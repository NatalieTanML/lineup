import React, { useEffect, useState } from 'react';
import { HiVideoCamera } from 'react-icons/hi';

import IconButton from '../IconButton';

const ListItem = () => {
  const styleName =
    'text-slate-50 bg-blue-500 transition duration-200 ease-in-out hover:text-white hover:bg-blue-400 active:bg-blue-600 hover:stroke-current hover:border-transparent';
  const styleNameLoading = 'text-slate-50 bg-blue-600';

  return (
    <div className="flex flex-row relative block bg-slate-750 transition duration-200 ease-in-out hover:bg-slate-700 rounded-md p-3 mb-3">
      <div className="flex flex-1 items-center gap-x-3">
        <p className="flex-grow font-semibold text-lg text-white">
          Daily standup
        </p>
        <div className="w-48 tracking-wide">
          <p className="font-medium text-xs text-slate-200 uppercase">
            Zoom.us Meeting
          </p>
          <p className="font-semibold text-sm text-slate-50">
            9.30 AM to 10 AM
          </p>
        </div>
        <div className="w-24"></div>
        <IconButton
          onClick={async () => {}}
          isLoading={false}
          title="Join"
          addStyleName={styleName}
          addStyleNameLoading={styleNameLoading}
        >
          <HiVideoCamera />
          <span className="font-medium text-sm">Join</span>
        </IconButton>
      </div>
    </div>
  );
};

export default ListItem;
