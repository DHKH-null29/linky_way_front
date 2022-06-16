import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import arrowdown from 'react-useanimations/lib/arrowDown';

const ArrowDown = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={arrowdown}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

ArrowDown.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default ArrowDown;
