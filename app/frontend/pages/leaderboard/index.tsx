import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import LeaderboardSelect from '../../components/leaderboard/LeaderboardSelect'
import { getLeaderboard } from '../../services/requests'

const leaderboardTypes = [
  { name: 'Todos os times', path: '/' },
  { name: 'Times da casa', path: '/home' },
  { name: 'Times visitantes', path: '/away' },
]

type LeaderboardItem = {
  name: string
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([])
  const [leaderboardFilter, setLeaderboardFilter] = useState(
    leaderboardTypes[0]
  )

  useEffect(() => {
    getLeaderboard('/').then(({ data }: AxiosResponse<LeaderboardItem[]>) =>
      setLeaderboard(data)
    )
  }, [])

  useEffect(() => {
    const path = leaderboardFilter.path
    getLeaderboard(path).then(({ data }: AxiosResponse<LeaderboardItem[]>) =>
      setLeaderboard(data)
    )
  }, [leaderboardFilter])

  return (
    <div className="mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Classificação</h1>
          <p className="mt-2 text-sm text-gray-700">
            Classificação geral do campeonato, com times da casa e visitantes.
          </p>
        </div>
        <div className="mt-4 flex-none sm:mt-0 sm:ml-16">
          <LeaderboardSelect
            selected={leaderboardFilter}
            setSelected={setLeaderboardFilter}
            leaderboardTypes={leaderboardTypes}
          />
        </div>
      </div>

      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Classificação
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                Time
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                Pts
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                PJ
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                VIT
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                E
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                DER
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                GP
              </th>
              <th
                scope="col"
                className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                GC
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:pr-6"
              >
                SG
              </th>
              <th
                scope="col"
                className="hidden py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 md:table-cell md:pr-6"
              >
                Eficiência
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaderboard?.map((team, index) => (
              <tr key={team.name}>
                <td className="w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {index}
                </td>
                <td className="w-full max-w-0 px-3 py-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none">
                  {team.name}
                  <dl className="sm:hidden">
                    <dt className="sr-only">Vitórias</dt>
                    <dd className="inline text-gray-700">
                      {`${team.totalVictories}V`}
                    </dd>
                    <dt className="sr-only">Empates</dt>
                    <dd className="inline pl-3 text-gray-700">{`${team.totalDraws}E`}</dd>
                    <dt className="sr-only">Derrotas</dt>
                    <dd className="inline pl-3 text-gray-700">{`${team.totalLosses}D`}</dd>
                  </dl>
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalPoints}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.totalGames}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.totalVictories}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.totalDraws}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.totalLosses}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.goalsFavor}
                </td>
                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {team.goalsOwn}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500 sm:pr-6">
                  {team.goalsBalance}
                </td>
                <td className="hidden py-4 pl-3 pr-4 text-sm text-gray-500 md:table-cell md:pr-6">{`${team.efficiency}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
