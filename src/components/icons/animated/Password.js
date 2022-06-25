import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import lock from 'react-useanimations/lib/lock';

const Password = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={lock}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Password.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Password;
