import React from 'react';
import { IconContext } from 'react-icons';
import { CgSpinner } from 'react-icons/cg';

export type Props = {
  onClick: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
  title?: string;
  addStyleName?: string;
  addStyleNameLoading?: string;
};

const IconButton = ({
  onClick,
  isLoading = false,
  children,
  title,
  addStyleName = '',
  addStyleNameLoading = '',
}: Props) => {
  const styleName = isLoading
    ? `absolute flex flex-row inset-y-0 right-0 rounded-r-md w-24 h-full justify-center items-center gap-x-2 cursor-wait disabled:opacity-50 ${addStyleNameLoading}`
    : `absolute flex flex-row inset-y-0 right-0 rounded-r-md w-24 h-full justify-center items-center gap-x-2 focus:outline-none ${addStyleName}`;
  const btnContent = isLoading ? <CgSpinner /> : children;
  const iconCtx = {
    size: '1.25em',
    ...(isLoading && { className: 'animate-spin' }),
  };

  return (
    <button
      type="button"
      disabled={isLoading}
      title={title}
      onClick={onClick}
      className={styleName}
    >
      <IconContext.Provider value={iconCtx}>{btnContent}</IconContext.Provider>
    </button>
  );
};

export default IconButton;
