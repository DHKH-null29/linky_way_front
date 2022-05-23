import 'bulma/css/bulma.min.css';

import { Button } from 'react-bulma-components';
import styled from '@emotion/styled';

const Buttons = () => {
  return (
    <div>
      <StyledButton>My Bulma button</StyledButton>
    </div>
  );
};

export default Buttons;

const StyledButton = styled(Button)`
  background-color: #ffe259;
`;
