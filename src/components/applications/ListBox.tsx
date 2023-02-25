import React, { useState, Dispatch, SetStateAction } from 'react';
import { Parts } from '@/types/ApplicationsType';
import { Listbox } from '@headlessui/react';

interface Props {
  part: Parts;
  setPart: Dispatch<SetStateAction<Parts>>;
}

const PARTS: Parts[] = [Parts.all, Parts.web, Parts.server, Parts.design];

const ListBox = ({ part, setPart }: Props) => {
  return (
    <Listbox value={part} onChange={setPart}>
      <Listbox.Button className="h-7 w-16 bg-gray3">{part}</Listbox.Button>
      <Listbox.Options className="absolute w-16 bg-black">
        {PARTS.map((part, i) => (
          <Listbox.Option key={i} value={part}>
            {part}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};

export default ListBox;
