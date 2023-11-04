import React, { PropsWithChildren } from "react";

interface Props {
  logo: React.ReactNode;
  main: React.ReactNode[];
  footer: React.ReactNode[];
}

export const SideIconMenu: React.FC<Props> = ({ main, logo, footer }) => {
  return (
    <div className="bg-slate-900 h-full flex flex-col w-[80px] shadow-lg items-center grow-0 shrink-0 space-y-2 p-2">
      <div className="grow-0">{logo}</div>
      <div className="grow shrink overflow-scroll space-y-2 inner-shadow">
        {main}
      </div>
      <div className="grow-0">{footer}</div>
    </div>
  );
};

type SideMenuButtonProps = {
  onClick?: () => void;
};

export const SideMenuButton = ({
  children,
  onClick,
}: PropsWithChildren<SideMenuButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className="w-16 h-16 flex items-center justify-center rounded-lg rouded text-slate-300 hover:text-slate-100 hover:bg-slate-700 hover:border-4 border-slate-700  transition-all duration-200 ease-in-out"
    >
      {children}
    </button>
  );
};
