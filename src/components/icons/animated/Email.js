import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import mail from 'react-useanimations/lib/mail';

const Email = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={mail}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Email.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Email;
