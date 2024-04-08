import React from "react";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ children, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-blue-500 text-white font-medium py-2 px-4 rounded
        hover:bg-blue-600 
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
