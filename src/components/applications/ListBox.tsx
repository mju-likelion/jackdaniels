import React, { Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';

interface Props<T> {
  label: string;
  stateData: T[];
  state: T;
  setState: React.Dispatch<T>;
}

/**
 * @param label
 * ListBox 데이터 종류
 * @param stateData
 * ListBox에 띄워줄 데이터값들
 * @param state
 * 선택된 데이터
 * @param setState
 * 데이터를 수정할 수 있는 함수
 * @returns
 */

export const ListBox = <T extends string>({
  label,
  stateData,
  state,
  setState,
}: Props<T>) => (
  <div className="flex items-center justify-center">
    <div className="whitespace-pre-wrap text-xl	">{`${label}: `}</div>
    <Listbox value={state} onChange={setState}>
      <div className="relative mt-1">
        <Listbox.Button className="focus-visible:ring-offset-orange-300 relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-black shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm">
          <span className="block truncate">{state}</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base text-gray2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {stateData.map((data, i) => (
              <Listbox.Option
                key={i}
                value={data}
                className={({ active }) =>
                  `relative cursor-default select-none p-2 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
              >
                {`${data}`}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  </div>
);
