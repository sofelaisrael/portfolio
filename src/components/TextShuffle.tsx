import React, { useState, useCallback, useRef, useEffect } from 'react';

interface BlockTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3';
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

// Only replace letters that have a clear geometric equivalent
// A, O, I, V, X, T — the ones that naturally map to shapes
const SELECTIVE_MAP: Record<string, string> = {
  'A': '▲', 'O': '●', 'I': '▪', 'V': '▼', 'X': '✕', 'T': '▬',
};

const BlockText: React.FC<BlockTextProps> = ({
  children,
  className = '',
  style = {},
  as: Tag = 'span',
  onMouseEnter,
  onMouseLeave,
}) => {
  const [hovered, setHovered] = useState(false);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    onMouseEnter?.();
  }, [onMouseEnter]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    onMouseLeave?.();
  }, [onMouseLeave]);

  const renderText = () => {
    return children.split('').map((char, i) => {
      const symbol = SELECTIVE_MAP[char.toUpperCase()];
      const shouldReplace = hovered && symbol && char === char.toUpperCase() && char !== ' ';
      
      return (
        <span
          key={i}
          ref={(el) => { spanRefs.current[i] = el; }}
          style={{
            display: 'inline-block',
            transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.03}s`,
            ...(shouldReplace ? {
              opacity: 0.9,
              transform: 'scale(1.1)',
            } : {
              opacity: 1,
              transform: 'scale(1)',
            }),
          }}
        >
          {shouldReplace ? symbol : char}
        </span>
      );
    });
  };

  return (
    <Tag
      className={className}
      style={{ ...style, display: 'inline-block', cursor: 'none' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {renderText()}
    </Tag>
  );
};

export default BlockText;
