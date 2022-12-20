import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

const leaderboardTypes = [
  { name: 'Todos os times', path: '/' },
  { name: 'Times da casa', path: '/home' },
  { name: 'Times visitantes', path: '/away' },
]

export default function LeaderboardSelect() {
  const [selected, setSelected] = useState(leaderboardTypes[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            Exibir times
          </Listbox.Label>
          <div className="mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          </div>
        </>
      )}
    </Listbox>
  )
}
