import { Colors, IconSize } from '../../styles';

import UseAnimations from 'react-useanimations';
import search from 'react-useanimations/lib/searchToX';

const Search = ({ lineColor, fillColor, size, ...props }) => {
  return (
    <UseAnimations
      animation={search}
      size={IconSize[size]}
      strokeColor={lineColor}
      fillColor={fillColor}
      {...props}
    />
  );
};

Search.defaultProps = {
  size: IconSize.normal,
  lineColor: Colors.formIconFirst,
  fillColor: '',
};

export default Search;
