import React, { FC } from 'react';
import { IData } from './applicationData';

interface IProps {
  info: IData;
  menu: string[];
  onClick: () => void;
}

const ApplicationOverview = ({ info, menu, onClick }: IProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="flex h-12 w-full items-center border-t border-y-gray3 bg-gray1 p-4 text-sm last:border-b"
    >
      {menu.map((menu, i) => (
        <div key={`menu${i}`} className="flex-1 text-gray2 ">
          {`${info[menu]}`}
        </div>
      ))}
    </div>
  );
};
export default ApplicationOverview;
