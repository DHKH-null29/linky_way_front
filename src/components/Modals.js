import Buttons from './Buttons';
import styled from '@emotion/styled';
import useClickAway from '../hooks/useClickAway';

const Modals = ({
  children,
  title,
  confirm,
  cancel = true,
  active,
  onConfirm,
  onClose,
  ...props
}) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });
  return (
    <>
      <div className={`modal ${active ? 'is-active' : ''}`} {...props}>
        <div className="modal-background" />
        <div className="modal-card">
          <header ref={ref} className="modal-card-head">
            <p className="modal-card-title">{title || ''}</p>
            <button onClick={onClose} className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">{children}</section>
          <ModalFooter className="modal-card-foot">
            <Buttons onClick={onConfirm}>{confirm}</Buttons>
            &nbsp;&nbsp;
            {cancel && (
              <Buttons className="is-light" onClick={onClose}>
                닫기
              </Buttons>
            )}
          </ModalFooter>
        </div>
      </div>
    </>
  );
};

const ModalFooter = styled.footer`
  button {
    font-size: 0.85rem;
  }
`;

export default Modals;
