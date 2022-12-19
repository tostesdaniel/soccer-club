import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { getLeaderboard } from '../../services/requests'

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
  const [leaderboardFilter, setLeaderboardFilter] = useState('All')

  useEffect(() => {
    getLeaderboard().then(({ data }: AxiosResponse<LeaderboardItem[]>) =>
      setLeaderboard(data)
    )
  }, [])

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      <div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Classificação</h1>
          <p className="mt-2 text-sm text-gray-700">
            Classificação geral do campeonato, com times da casa e visitantes.
          </p>
        </div>
      </div>

      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900"
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
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                PJ
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                VIT
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                E
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                DER
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                GP
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                GC
              </th>
              <th
                scope="col"
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                SG
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900"
              >
                Eficiência
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaderboard?.map((team, index) => (
              <tr key={team.name}>
                <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {index}
                </td>
                <td className="px-3 py-4 text-sm font-medium text-gray-900">
                  {team.name}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalPoints}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalGames}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalVictories}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalDraws}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.totalLosses}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.goalsFavor}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.goalsOwn}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {team.goalsBalance}
                </td>
                <td className="py-4 pl-3 pr-4 text-sm text-gray-500">{`${team.efficiency}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
