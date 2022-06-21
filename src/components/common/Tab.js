import { Colors, FontSize } from '../../styles';
import { useEffect, useState } from 'react';

import { Tabs } from 'react-bulma-components';
import styled from '@emotion/styled';

const Tab = ({ contents = [], onClickList = [] }) => {
  const [clickedList, setClickedList] = useState([]);

  useEffect(() => {
    setClickedList([true]);
    onClickList[0]();
  }, []);

  return (
    <Tabs className="tabs is-toggle is-toggle-rounded is-fullwidth pl-6 pr-6 pt-2">
      <ul className="pl-5 pr-5">
        {contents.map((value, index) => (
          <li key={index}>
            <StyledContent
              clicked={clickedList[index] ? 1 : 0}
              onClick={() => {
                const newClicked = [];
                newClicked[index] = true;
                setClickedList(newClicked);
                onClickList[index]();
              }}
            >
              {value}
            </StyledContent>
          </li>
        ))}
      </ul>
    </Tabs>
  );
};

const StyledContent = styled.a`
  min-width: 5rem;
  font-size: ${FontSize.small};
  :hover {
    cursor: pointer;
  }
  background-color: ${({ clicked }) => (clicked ? Colors.layout : 'none')};
`;

export default Tab;
