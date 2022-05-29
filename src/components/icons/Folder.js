import { Colors, IconSize } from '../../styles';

import UseAnimations from 'react-useanimations';
import folder from 'react-useanimations/lib/folder';
import styled from '@emotion/styled';

const Folder = ({ lineColor, size, ...props }) => {
  return (
    <StyledFolder
      animation={folder}
      size={size}
      strokeColor={lineColor}
      fillColor={Colors.mainSecond}
      {...props}
    />
  );
};

Folder.defaultProps = {
  size: IconSize.normal,
  lineColor: 'black',
};

const StyledFolder = styled(UseAnimations)`
  path {
    fill-opacity: 1;
  }
`;

export default Folder;
