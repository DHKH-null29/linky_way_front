import { useEffect, useRef, useState } from 'react';

const useMouseHover = (onMouseOver, onMouseOut) => {
  const [value, setValue] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = () => {
    setValue(true);
    onMouseOver && onMouseOver;
  };
  const handleMouseOut = () => {
    setValue(false);
    onMouseOut && onMouseOut();
  };

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);

  return [ref, value];
};

export default useMouseHover;
