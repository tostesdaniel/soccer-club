import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './TeamModel';

class Match extends Model {
  id!: number;
  homeTeam!: number;
  homeTeamGoals!: number;
  awayTeam!: number;
  awayTeamGoals!: number;
  inProgress!: boolean;
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

Match.belongsTo(Team, { as: 'teamHome', foreignKey: 'team_name' });
Match.belongsTo(Team, { as: 'teamAway', foreignKey: 'team_name' });

export default Match;