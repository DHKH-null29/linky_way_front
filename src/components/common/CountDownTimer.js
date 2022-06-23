import { Colors } from '../../styles';
import { useCountdown } from '../../hooks/useCountDown';

const CountdownTimer = ({ targetDate }) => {
  const [hours, minutes, seconds] = useCountdown(targetDate);

  if (hours + minutes + seconds <= 0) {
    return <p style={{ color: Colors.warningFirst }}>시간 만료됨!</p>;
  } else {
    return (
      <p style={{ color: Colors.warningFirst }} hours={hours} minutes={minutes} seconds={seconds}>
        남은 시간: {hours !== 0 && getNumberWithZeroPrefix(hours) + ':'}
        {getNumberWithZeroPrefix(minutes) + ':'}
        {getNumberWithZeroPrefix(seconds)}
      </p>
    );
  }
};

const getNumberWithZeroPrefix = time => {
  if (time > 0 && time < 10) {
    return '0' + time;
  }
  if (time === 0) {
    return '00';
  }
  return time;
};

export default CountdownTimer;
