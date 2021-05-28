import { Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { GameStatus } from '../../game/types';
import { PrimaryButton } from '../Button/Button';
import GameParticipantList from '../GameParticipantList/GameParticipantList';
import TurnSummary from '../TurnSummary';

import useStyles from './GameCard.styles';
import { GameCardComponentProps } from './GameCard.types';

const GameCard: React.FC<GameCardComponentProps> = ({
  game,
  joinGame,
  leaveGame,
}) => {
  const {
    joinable,
    name,
    participants,
    rules,
    slug,
    status,
    userIsParticipant,
    turn,
    variant,
  } = game;
  const bull = <span>•</span>;
  const classes = useStyles();
  const getHeader = () => {
    const title = (
      <Typography gutterBottom variant="h3">
        {name}
      </Typography>
    );
    return status === 'active' ? (
      <Link className={classes.link} to={`/game/${slug}`} title={name}>
        {title}
      </Link>
    ) : (
      title
    );
  };
  return (
    <Card square>
      <CardContent className={classes.content}>
        {getHeader()}
        {turn && <TurnSummary turn={turn} />}
        <Typography variant="body2" className={classes.rules}>
          {variant} {bull} Orders {rules.orderDeadline} {bull} Retreat{' '}
          {rules.retreatDeadline} {bull} Build {rules.buildDeadline}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <GameParticipantList participants={participants} joinable={joinable} />
        <div>
          {joinable && (
            <PrimaryButton onClick={() => joinGame(slug)}>Join</PrimaryButton>
          )}
          {status === GameStatus.PENDING && userIsParticipant && (
            <PrimaryButton onClick={() => leaveGame(slug)}>Leave</PrimaryButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

export default GameCard;
