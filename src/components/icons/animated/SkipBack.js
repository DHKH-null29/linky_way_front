import { IconSize } from '../../../styles';
import Skipback from 'react-useanimations/lib/skipBack';
import UseAnimations from 'react-useanimations';

const SkipBack = ({ lineColor, fillColor, size, autoplay, ...props }) => {
  return (
    <UseAnimations
      animation={Skipback}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      autoplay={autoplay}
      {...props}
    />
  );
};

SkipBack.defaultProps = {
  size: IconSize.large,
  lineColor: 'black',
  fillColor: '',
  autoplay: true,
};

export default SkipBack;
