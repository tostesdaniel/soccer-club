import {
  ChevronRightIcon,
  GlobeAltIcon,
  HomeIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import MatchSelect from '../../components/matches/MatchesSelect'
import { getMatches } from '../../services/requests'

const matchTypes = [
  { name: 'Todas as partidas', filter: 'Todas' },
  { name: 'Partidas em andamento', filter: 'Em andamento' },
  { name: 'Partidas finalizadas', filter: 'Finalizadas' },
]

type Match = {
  id: number
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: boolean
  teamHome: { teamName: string }
  teamAway: { teamName: string }
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([])
  const [selected, setSelected] = useState(matchTypes[0])

  useEffect(() => {
    getMatches().then(({ data }: AxiosResponse<Match[]>) => setMatches(data))
  }, [])

  useEffect(() => {
    const inProgressMap: { [key: string]: string } = {
      'Em andamento': '?inProgress=true',
      Finalizadas: '?inProgress=false',
    }

    const inProgress = inProgressMap[selected.filter]
    getMatches(inProgress).then(({ data }) => {
      setMatches(data)
    })
  }, [selected])

  return (
    <>
      <div className="my-10 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Partidas</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16">
            <MatchSelect
              selected={selected}
              setSelected={setSelected}
              matchTypes={matchTypes}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {matches.map((match) => (
            <li key={match.id}>
              <div className="block hover:bg-gray-50">
                <div className="flex items-center py-4 pl-2 pr-2.5 sm:px-6">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div>
                      <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-y-1 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:gap-y-0">
                      <div className="flex items-center sm:block">
                        <p className="order-2 truncate text-sm font-medium text-indigo-600">
                          {match.teamHome.teamName}
                        </p>
                        <p className="order-3 grow text-right font-medium text-gray-600 sm:hidden">
                          {match.homeTeamGoals}
                        </p>
                        <p className="order-1 flex items-center text-sm text-gray-500 sm:mt-2">
                          <HomeIcon
                            className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="hidden sm:inline">Casa</span>
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <div className="sm:flex sm:items-center sm:gap-2">
                          <p className="text-5xl text-gray-500">
                            {match.homeTeamGoals}
                          </p>
                          <XMarkIcon
                            className="h-5 w-5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p className="text-5xl text-gray-500">
                            {match.awayTeamGoals}
                          </p>
                        </div>
                        <p className="sr-only">
                          {match.homeTeamGoals} a {match.awayTeamGoals}
                        </p>
                      </div>
                      <div className="flex items-center sm:block">
                        <div className="flex w-full items-center sm:block">
                          <p className="order-2 truncate text-sm font-medium text-indigo-600">
                            {match.teamAway.teamName}
                          </p>
                          <p className="order-3 grow text-right font-medium text-gray-600 sm:hidden">
                            {match.awayTeamGoals}
                          </p>
                          <p className="order-1 flex items-center text-sm text-gray-500 sm:mt-2">
                            <GlobeAltIcon
                              className="mr-1.5 h-5 w-5 shrink-0 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="hidden sm:inline">Visitante</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex shrink-0 sm:ml-6">
                      <p
                        className={`${
                          match.inProgress
                            ? 'bg-green-100 text-green-800 '
                            : 'bg-red-100 text-red-800'
                        } inline-flex rounded-full px-2 text-xs font-semibold leading-5`}
                      >
                        {match.inProgress ? 'Em progresso' : 'Finalizada'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
