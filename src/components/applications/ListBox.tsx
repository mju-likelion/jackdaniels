import React from 'react';

import { Listbox } from '@headlessui/react';

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

const ListBox = <T extends string>({
  label,
  stateData,
  state,
  setState,
}: Props<T>) => (
  <div className="flex">
    <div>{`${label}: `}</div>
    <Listbox value={state} onChange={setState}>
      <Listbox.Button className="relative h-7 w-36 bg-gray3">{`${state}`}</Listbox.Button>
      <Listbox.Options className="absolute w-36 bg-black">
        {stateData.map((data, i) => (
          <Listbox.Option key={i} value={data}>
            {`${data}`}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  </div>
);

export default ListBox;
