import { Colors, IconSize } from '../../styles';

import UseAnimations from 'react-useanimations';
import checkmark from 'react-useanimations/lib/checkmark';

const CheckMark = ({ lineColor, size, auto, ...props }) => {
  return (
    <UseAnimations
      animation={checkmark}
      size={IconSize[size]}
      strokeColor={lineColor}
      autoplay={auto}
      loop={auto}
      speed={2}
      {...props}
    />
  );
};

CheckMark.defaultProps = {
  auto: true,
  size: IconSize.normal,
  lineColor: Colors.successFirst,
};

export default CheckMark;
