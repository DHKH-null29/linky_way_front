import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import info from 'react-useanimations/lib/info';

const CommonInput = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={info}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

CommonInput.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: 'red',
};

export default CommonInput;
