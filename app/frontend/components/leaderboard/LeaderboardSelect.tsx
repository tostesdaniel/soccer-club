import { Listbox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Dispatch, Fragment, SetStateAction } from 'react';

type LeaderboardTypes = { name: string; path: string }

type Props = {
  selected: LeaderboardTypes
  setSelected: Dispatch<SetStateAction<LeaderboardTypes>>
  leaderboardTypes: LeaderboardTypes[]
}

export default function LeaderboardSelect({
  selected,
  setSelected,
  leaderboardTypes,
}: Props) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Exibir times
          </Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {leaderboardTypes.map((leaderboardType) => (
                  <Listbox.Option
                    key={leaderboardType.name}
                    value={leaderboardType}
                    className={({ active }) =>
                      `${
                        active ? 'bg-indigo-500 text-white' : 'text-gray-900'
                      } cursor-default select-none py-2 px-3.5`
                    }
                  >
                    {({ selected }) => (
                      <span
                        className={`${
                          selected ? 'font-semibold' : 'font-normal'
                        } block truncate`}
                      >
                        {leaderboardType.name}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
