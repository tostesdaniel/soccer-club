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
    <div>
      <div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Classificação</h1>
          <p className="mt-2 text-sm text-gray-700">
            Classificação geral do campeonato, com times da casa e visitantes.
          </p>
        </div>
      </div>

      <div>
        <table>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col">Classificação</th>
              <th scope="col">Time</th>
              <th scope="col">Pts</th>
              <th scope="col">PJ</th>
              <th scope="col">VIT</th>
              <th scope="col">E</th>
              <th scope="col">DER</th>
              <th scope="col">GP</th>
              <th scope="col">GC</th>
              <th scope="col">SG</th>
              <th scope="col">Eficiência</th>
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
