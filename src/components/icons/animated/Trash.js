import { Colors, IconSize } from '../../../styles';

import UseAnimations from 'react-useanimations';
import trash from 'react-useanimations/lib//trash2';

const Trash = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={trash}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Trash.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Trash;
