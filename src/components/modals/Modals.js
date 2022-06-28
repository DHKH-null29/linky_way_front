import { Colors, Media } from '../../styles';

import { Modal } from 'react-bulma-components';
import styled from '@emotion/styled';
import useClickAway from '../../hooks/useClickAway';

const Modals = ({ children, title, active, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });
  return (
    <StyledModal show={active} {...props}>
      <div className="modal-background" style={{ background: 'none' }} onClick={onClose} />
      <StyledCard ref={ref} className="modal-card">
        <header className="modal-card-head" style={{ backgroundColor: Colors.layout }}>
          <p className="modal-card-title">{title || ''}</p>
          <button onClick={onClose} className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">{children}</section>
      </StyledCard>
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  font-family: 'ImcreSoojin';
`;

const StyledCard = styled.div`
  @media ${Media.mobile} {
    max-width: 90%;
    margin-right: 10%;
  }
`;

export default Modals;
