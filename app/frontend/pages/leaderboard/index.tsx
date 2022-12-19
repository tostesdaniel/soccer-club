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
    <div className="px-4 sm:px-6 lg:px-8">
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
                className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
              >
                Eficiência
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {leaderboard?.map((team, index) => (
              <tr key={team.name}>
                <td>{index}</td>
                <td>{team.name}</td>
                <td>{team.totalPoints}</td>
                <td>{team.totalGames}</td>
                <td>{team.totalVictories}</td>
                <td>{team.totalDraws}</td>
                <td>{team.totalLosses}</td>
                <td>{team.goalsFavor}</td>
                <td>{team.goalsOwn}</td>
                <td>{team.goalsBalance}</td>
                <td>{`${team.efficiency}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
