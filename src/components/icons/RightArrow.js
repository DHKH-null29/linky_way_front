import { IconSize } from '../../styles';
import UseAnimations from 'react-useanimations';
import arrowRightCircle from 'react-useanimations/lib/arrowRightCircle';

const RightArrow = ({ lineColor, fillColor, size, autoplay, ...props }) => {
  return (
    <UseAnimations
      animation={arrowRightCircle}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      autoplay={autoplay}
      {...props}
    />
  );
};

RightArrow.defaultProps = {
  size: IconSize.large,
  lineColor: 'black',
  fillColor: '',
  autoplay: true,
};

export default RightArrow;
