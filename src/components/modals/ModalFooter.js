import Buttons from '../common/Buttons';
import { Colors } from '../../styles';
import styled from '@emotion/styled';

const ModalFooter = ({ confirm, onConfirm, onClose, cancel }) => {
  return (
    <Footer className="modal-card-foot">
      <Buttons type="submit" onClick={onConfirm}>
        {confirm}
      </Buttons>
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
  confirm: '확인',
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
