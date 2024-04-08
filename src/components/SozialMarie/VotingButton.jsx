import { Box, Button, Tooltip } from '@mui/material';
import { SimpleCountDown } from 'components/Shared/CountDown';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import { getTimeDifference } from 'utils';

const VotingButton = function VotingButton({
  date,
  handleClick,
  isBeforeVoting,
  isVoting,
  isAfterVoting,
  time,
}) {
  const { days, hours, minutes, seconds } = getTimeDifference(time);

  const sozialMarieTranslations = t('sozialMarie', { returnObjects: true });

  return (
    <Tooltip
      title={
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
          <span>
            {isBeforeVoting ? `${sozialMarieTranslations.untilVotingStarts}:` : null}
            {isVoting ? `${sozialMarieTranslations.untilVotingEnds}:` : null}
            {isAfterVoting ? `${sozialMarieTranslations.votingHasEnded}!` : null}
          </span>

          {isAfterVoting ? null : (
            <SimpleCountDown
              date={date}
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          )}
        </Box>
      }
    >
      <Button type="button" aria-label="vote" onClick={handleClick} color="inherit">
        {sozialMarieTranslations.vote}!
      </Button>
    </Tooltip>
  );
};

VotingButton.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  handleClick: PropTypes.func.isRequired,
  isBeforeVoting: PropTypes.bool.isRequired,
  isVoting: PropTypes.bool.isRequired,
  isAfterVoting: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
};

export default VotingButton;
