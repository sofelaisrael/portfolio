import React from 'react';

interface CustomCursorProps {
  cursorPos: { x: number; y: number };
  cursorHovered: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorPos, cursorHovered }) => {
  return (
    <div
      className='max-md:hidden mix-blend-difference'
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: cursorHovered ? 60 : 12,
        height: cursorHovered ? 60 : 12,
        backgroundColor: cursorHovered ? 'transparent' : 'white',
        border: cursorHovered ? '2px solid white' : 'none',      
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: `translate(${cursorPos.x - (cursorHovered ? 30 : 6)}px, ${cursorPos.y - (cursorHovered ? 30 : 6)}px)`,
        transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border 0.3s ease',
      }}
    />
  );
};

export default CustomCursor;
