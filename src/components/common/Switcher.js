import '../../styles/switcher.css';

import { Colors } from '../../styles';

const Switcher = ({ isOff, handleToggle, ...props }) => {
  return (
    <>
      <input
        style={{ position: 'absolute' }}
        readOnly
        checked={isOff}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        {...props}
      />
      <label
        style={{ background: isOff ? Colors.warningFirst : Colors.successFirst }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switcher;
