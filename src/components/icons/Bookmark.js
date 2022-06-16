import { Colors, IconSize } from '../../styles';

import UseAnimations from 'react-useanimations';
import bookmark from 'react-useanimations/lib/bookmark';

const Bookmark = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={bookmark}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Bookmark.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Bookmark;
