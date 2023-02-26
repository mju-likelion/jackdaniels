import React from 'react';

import { Listbox } from '@headlessui/react';

interface Props<T> {
  stateData: T[];
  state: T;
  setState: React.Dispatch<T>;
}

/**
 *
 * @param stateData
 * ListBox에 띄워줄 데이터값들
 * @param state
 * 선택된 데이터
 * @param setState
 * 데이터를 수정할 수 있는 함수
 * @returns
 */

const ListBox = <T extends string>({
  stateData,
  state,
  setState,
}: Props<T>) => (
  <Listbox value={state} onChange={setState}>
    <Listbox.Button className="h-7 w-16 bg-gray3">{`${state}`}</Listbox.Button>
    <Listbox.Options className="absolute w-16 bg-black">
      {stateData.map((data, i) => (
        <Listbox.Option key={i} value={data}>
          {`${data}`}
        </Listbox.Option>
      ))}
    </Listbox.Options>
  </Listbox>
);

export default ListBox;
