import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib//heart';

const Heart = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={heart}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Heart.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Heart;
