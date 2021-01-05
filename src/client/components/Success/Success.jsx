import React, { useEffect, useRef, useState } from 'react';
import Checkmark from 'client/assets/icons/Checkmark';
import { useOutsideClick } from 'client/hooks';
import { Background, SuccessWrapper, Close } from './styles';

const Success = ({ hasCompleted }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(hasCompleted);
    }, 1000)
  }, [hasCompleted]);

  useOutsideClick(containerRef, () => {
    setIsOpen(false);
  });

  return (
    isOpen && (
      <>
        <SuccessWrapper ref={containerRef}>
          <div className="text">
            Congratulations! You have completed your objective!
          </div>
          <Close onClick={() => setIsOpen(false)}>&times;</Close>
          <Checkmark />
        </SuccessWrapper>
        <Background />
      </>
    )
  );
};

export default Success;
