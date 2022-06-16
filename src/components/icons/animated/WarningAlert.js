import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import alertTriangle from 'react-useanimations/lib/alertTriangle';

const WarningAlert = ({ lineColor, size, auto, ...props }) => {
  return (
    <UseAnimations
      animation={alertTriangle}
      size={IconSize[size]}
      strokeColor={lineColor}
      autoplay={auto}
      loop={auto}
      {...props}
    />
  );
};

WarningAlert.defaultProps = {
  auto: true,
  size: IconSize.normal,
  lineColor: Colors.warningFirst,
};

export default WarningAlert;
