import { Colors } from '../../styles';
import useClickAway from '../../hooks/useClickAway';

const Modals = ({ children, title, active, onClose, ...props }) => {
  const ref = useClickAway(() => {
    onClose && onClose();
  });
  return (
    <div style={{ zIndex: 999 }} className={`modal ${active ? 'is-active' : ''}`} {...props}>
      <div className="modal-background" />
      <div ref={ref} className="modal-card">
        <header className="modal-card-head" style={{ backgroundColor: Colors.layout }}>
          <p className="modal-card-title">{title || ''}</p>
          <button onClick={onClose} className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">{children}</section>
      </div>
    </div>
  );
};

Modals.defaultProps = {
  isForm: true,
};

export default Modals;
