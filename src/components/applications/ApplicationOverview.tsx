import React from 'react';
import { IData } from '@/types/ApplicationsType';
import { format } from 'date-fns';

interface IProps {
  info: IData;
  onClick: () => void;
}

export const ApplicationOverview = ({ info, onClick }: IProps): JSX.Element => {
  return (
    <div className='flex h-14 w-full items-center border-b border-gray3 p-3 text-sm'>
      <div className='basis-2/12 text-base'>{info.name}</div>
      <div className='basis-3/12 text-gray2'>{info.major}</div>
      <div className='basis-2/12 text-gray2'>{info.grade}학년</div>
      <div className='basis-2/12 text-gray2'>{info.part}</div>
      <div className='flex basis-3/12 justify-between'>
        <div className='text-gray2'>
          {format(new Date(info.createdDate), 'yyyy.MM.dd hh:mm:ss')}
        </div>
        <button className='text-blue1' onClick={onClick}>
          detail
        </button>
      </div>
    </div>
  );
};
