import React, { ReactNode } from "react";
type ButtonProps = {
  children: ReactNode;
  //  Extra styles to the button
  className?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  disabled?: boolean;
};
export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      className={`h-auto p-2 rounded-md ${props.className}`}
      style={{
        backgroundColor: props.bgColor ? props.bgColor : "blue",
        color: props.textColor ? props.textColor : "white",
      }}
    >
      {props.children}
    </button>
  );
};
