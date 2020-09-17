import React, { useRef } from 'react';
import { useCycle } from 'framer-motion';
import { Gear } from 'client/assets/icons';
import { useOutsideClick } from 'client/hooks';
import Navigation from './Navigation/Navigation';
import { Nav, MenuBackground, MenuButton, QuitButton } from './styles';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 25px 25px)',
    transition: {
      delay: 0.3,
      type: 'spring',
      stiffness: 380,
      damping: 40,
    },
  },
};

const variants = {
  hover: {
    scale: 1.1,
    rotateZ: 10,
    opacity: 0.7,
  },
  transition: {
    duration: 0.2,
  },
};

const quitVariants = {
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      delay: 0.2,
    },
  },
};

const MenuNav = ({ handleQuit }) => {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useCycle(false, true);

  useOutsideClick(containerRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  return (
    <>
      <Nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        ref={containerRef}
        open={isOpen}
      >
        <MenuBackground className="background" variants={sidebar} />
        <MenuButton
          whileHover="hover"
          variants={variants}
          type="button"
          onClick={setIsOpen}
        >
          <Gear />
        </MenuButton>
        <QuitButton onClick={handleQuit} variants={quitVariants}>
          Quit app
        </QuitButton>
        <Navigation setIsOpen={setIsOpen} />
      </Nav>
    </>
  );
};

export default MenuNav;
