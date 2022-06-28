import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import calendar from 'react-useanimations/lib/calendar';

const Calendar = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={calendar}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Calendar.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Calendar;
