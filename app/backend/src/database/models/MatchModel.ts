import { DataTypes, Model } from 'sequelize';
import ITeam from '../../interfaces/Team.interface';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
  teamHome?: ITeam;
  teamAway?: ITeam;
}

Match.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    homeTeam: {
      allowNull: false,
      field: 'home_team',
      type: DataTypes.INTEGER,
    },
    homeTeamGoals: {
      allowNull: false,
      field: 'home_team_goals',
      type: DataTypes.INTEGER,
    },
    awayTeam: {
      allowNull: false,
      field: 'away_team',
      type: DataTypes.INTEGER,
    },
    awayTeamGoals: {
      allowNull: false,
      field: 'away_team_goals',
      type: DataTypes.INTEGER,
    },
    inProgress: {
      allowNull: false,
      field: 'in_progress',
      type: DataTypes.BOOLEAN,
    },
  },
  {
    modelName: 'matches',
    underscored: true,
    sequelize: db,
    timestamps: false,
  },
);

Match.belongsTo(Team, { as: 'teamHome', foreignKey: 'homeTeam' });
Match.belongsTo(Team, { as: 'teamAway', foreignKey: 'awayTeam' });

export default Match;
