import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

const Dropdown = ({ label, options, selected, setSelected }) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? options
      : options.filter((data) => {
          return data.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-col static">
      <label className="text-teal-400 text-md z-10 font-medium relative top-3 ml-[7px] px-[3px] bg-white w-fit capitalize">
        {label}
      </label>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative">
          <ComboboxInput
            className="rounded-md border py-2 pl-3 pr-10 border-teal-400 text-sm/6 text-gray-500 focus:outline-none w-full shrink-0"
            displayValue={(data) => data?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2.5">
            <ChevronDownIcon className="w-5 h-5 text-teal-400 hover:text-teal-500" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] rounded-md border bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden"
          >
            {filteredData.map((data) => (
              <ComboboxOption
                key={data.id}
                value={data}
                className="group flex cursor-default items-center gap-2 rounded-md py-1.5 px-3 select-none data-[focus]:bg-teal-100/75 "
              >
                <CheckIcon className="invisible size-6 fill-teal-500 group-data-[selected]:visible" />
                <div className="text-sm/6 text-gray-500">{data.name}</div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
};

export default Dropdown;
