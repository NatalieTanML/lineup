import React from 'react';

const ListHeader = (prop: { title: string }) => {
  return (
    <div className="block mt-4 mb-2 text-xl font-bold text-slate-50">
      {prop.title}
    </div>
  );
};

export default ListHeader;
