import { IconSize } from '../../styles';
import Skipforward from 'react-useanimations/lib/skipForward';
import UseAnimations from 'react-useanimations';

const SkipForward = ({ lineColor, fillColor, size, autoplay, ...props }) => {
  return (
    <UseAnimations
      animation={Skipforward}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      autoplay={autoplay}
      {...props}
    />
  );
};

SkipForward.defaultProps = {
  size: IconSize.large,
  lineColor: 'black',
  fillColor: '',
  autoplay: true,
};

export default SkipForward;
