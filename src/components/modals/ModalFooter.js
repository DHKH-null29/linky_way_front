import Buttons from '../common/Buttons';
import { Colors } from '../../styles';
import styled from '@emotion/styled';

const ModalFooter = ({ confirm, onConfirm, onClose, cancel }) => {
  return (
    <Footer className="modal-card-foot">
      {confirm && (
        <Buttons type="submit" onClick={confirm && onConfirm}>
          {confirm}
        </Buttons>
      )}
      &nbsp;&nbsp;
      {cancel && (
        <Buttons type="button" className="is-light" onClick={onClose}>
          {cancel}
        </Buttons>
      )}
    </Footer>
  );
};

ModalFooter.defaultProps = {
  confirm: undefined,
  cancel: '닫기',
};

const Footer = styled.footer`
  button {
    font-size: 0.95rem;
  }

  background-color: white;
  border-top: 1px solid ${Colors.mainFirst};
`;

export default ModalFooter;
