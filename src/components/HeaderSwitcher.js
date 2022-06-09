import { FontSize, Media } from '../styles';

import { Button } from 'react-bulma-components';
import CrowdIcon from './icons/CrowdIcon';
import UserIcon from './icons/UserIcon';
import { headerClickState } from '../state/headerState';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

const HeaderSwitcher = ({ colors }) => {
  const navigate = useNavigate();
  const [clicked, setClicked] = useRecoilState(headerClickState);

  const handleSwitchClick = path => {
    navigate(path);
  };

  return (
    <SwitchContainer className="buttons has-addons ">
      <LeftSwitch
        bg={clicked ? colors : 'none'}
        onClick={() => {
          setClicked(true);
          handleSwitchClick('/card');
        }}
      >
        <UserIcon></UserIcon>
      </LeftSwitch>
      <RightSwitch
        bg={clicked === false ? colors : 'none'}
        onClick={() => {
          setClicked(false);
          handleSwitchClick('/social');
        }}
      >
        <CrowdIcon></CrowdIcon>
      </RightSwitch>
    </SwitchContainer>
  );
};

HeaderSwitcher.defaultProps = {
  colors: '#F5EEDA',
};

const SwitchContainer = styled.div`
  button {
    margin: 0 !important;
    @media ${Media.desktop} {
      font-size: ${FontSize.large};
    }
    @media ${Media.tablet} {
      font-size: ${FontSize.medium};
    }
    @media ${Media.mobile} {
      font-size: ${FontSize.small};
    }
  }
`;

const LeftSwitch = styled(Button)`
  border-radius: 20px 0 0 20px;
  background: linear-gradient(to left, ${({ bg }) => bg} 50%, white 50%) right;
  background-size: 200%;
  transition: 0.1s ease-out;
`;

const RightSwitch = styled(Button)`
  border-radius: 0 20px 20px 0;
  background: linear-gradient(to left, ${({ bg }) => bg} 50%, white 50%) right;
  background-size: 200%;
  transition: 0.1s ease-out;
`;

export default HeaderSwitcher;
