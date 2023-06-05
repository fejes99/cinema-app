import React from 'react';

import './Button.scss';

type ButtonSizeType = 'small' | 'medium' | 'large';
type ButtonType = 'primary' | 'secondary' | 'success' | 'error' | 'disabled';

interface Props {
  size: ButtonSizeType;
  type: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ size, type, disabled, onClick, children }) => {
  const isDisabled: boolean = disabled || type === 'disabled';
  const buttonClass: string = `button button-${size} ${
    isDisabled ? 'button-disabled' : ''
  } button-${type}`;

  const handleClick = (): void => {
    !isDisabled && onClick && onClick();
  };

  return (
    <button className={buttonClass} disabled={isDisabled} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
