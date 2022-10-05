import ITeam from '../interfaces/Team.interface';
import ILeaderBoard from '../interfaces/Leaderboard.interface';
import Match from '../database/models/MatchModel';
import Team from '../database/models/TeamModel';

export default class LeaderboardService {
  constructor(
    private _matchModel: typeof Match,
    private _teamModel: typeof Team,
  ) {}

  static filterMatchesByHomeTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.homeTeam === id);
  }

  static filterMatchesByAwayTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.awayTeam === id);
  }

  static calcTotalPoints(victories: number, draws: number) {
    return victories * 3 + draws;
  }

  static calcNumberOfGames(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) return acc + 1;
      if (curr.awayTeam === id) return acc + 1;

      return acc;
    }, 0);
  }

  static calcVictories(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) {
        return curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeam === id) {
        return curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static calcDraws(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) {
        return curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeam === id) {
        return curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static calcLosses(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) {
        return curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeam === id) {
        return curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static calcGoalsMade(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) return acc + curr.homeTeamGoals;
      if (curr.awayTeam === id) return acc + curr.awayTeamGoals;

      return acc;
    }, 0);
  }

  static calcGoalsTaken(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeam === id) return acc + curr.awayTeamGoals;
      if (curr.awayTeam === id) return acc + curr.homeTeamGoals;

      return acc;
    }, 0);
  }

  static calcGoalBalance(goalsMade: number, goalsTaken: number) {
    return goalsMade - goalsTaken;
  }

  static calcEfficiency(totalPoints: number, numberOfGames: number) {
    return Number((totalPoints / (numberOfGames * 3)) * 100).toFixed(2) || null;
  }

  static assembleLeaderboard(teams: ITeam[], matches: Match[]): ILeaderBoard[] {
    const summary = teams.map(({ id, teamName: name }: ITeam) =>
      this.leaderboardItem(id, name, matches)) as ILeaderBoard[];

    return this.sortLeaderboard(summary);
  }

  static leaderboardItem(id: number, name: string, matches: Match[]) {
    const victories = this.calcVictories(id, matches);
    const draws = this.calcDraws(id, matches);
    const games = this.calcNumberOfGames(id, matches);
    // const points = this.calcTotalPoints(victories, draws);

    return {
      name,
      totalPoints: victories * 3 + draws,
      totalGames: games,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: this.calcLosses(id, matches),
      goalsFavor: this.calcGoalsMade(id, matches),
      goalsOwn: this.calcGoalsTaken(id, matches),
      goalsBalance: this.calcGoalBalance(
        this.calcGoalsMade(id, matches),
        this.calcGoalsTaken(id, matches),
      ),
      efficiency: this.calcEfficiency(victories * 3 + draws, games),
    };
  }

  static sortLeaderboard(leaderboard: ILeaderBoard[]) {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;

      return 0;
    });
  }

  async getMatches(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: false },
    });

    return matches;
  }

  async getTeams() {
    const teams = await this._teamModel.findAll();

    return teams;
  }

  async getGeneralLeaderboard() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    return LeaderboardService.assembleLeaderboard(teams, matches);
  }

  async getHomeTeamLeaderboard() {
    const teams = await this.getTeams();
    const allMatches = await this.getMatches();
    const leaderboard = teams.map(({ id, teamName }) =>
      LeaderboardService.leaderboardItem(
        id,
        teamName,
        LeaderboardService.filterMatchesByHomeTeam(id, allMatches),
      )) as ILeaderBoard[];
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }

  async getAwayTeamLeaderboard() {
    const teams = await this.getTeams();
    const allMatches = await this.getMatches();
    const leaderboard = teams.map(({ id, teamName }) =>
      LeaderboardService.leaderboardItem(
        id,
        teamName,
        LeaderboardService.filterMatchesByAwayTeam(id, allMatches),
      )) as ILeaderBoard[];
    const sortedLeaderboard = LeaderboardService.sortLeaderboard(leaderboard);

    return sortedLeaderboard;
  }
}
