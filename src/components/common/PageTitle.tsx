import { FC, PropsWithChildren } from 'react';

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h2 className='text-2xl font-bold leading-7 text-zinc-50 sm:truncate sm:text-3xl sm:tracking-tight'>
      {children}
    </h2>
  );
};
