import { Colors, IconSize } from '../../styles';

import UseAnimations from 'react-useanimations';
import thumbUp from 'react-useanimations/lib/thumbUp';

const ThumbUp = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={thumbUp}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

ThumbUp.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default ThumbUp;
