import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  color: string;
  onClick: Function;
};
export default function Button({ children, color, onClick }: Props) {
  function handleClick() {
    onClick();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={
          "w-full py-4 text-white text-lg tracking-wider rounded border hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 shadow"
        }
      >
        {children}
      </button>
      <style jsx>
        {`
          button {
            background-color: ${color};
            border: 1px solid ${color};
            color: white;
          }
          button:hover {
            background-color: white;
            color: ${color};
          }
        `}
      </style>
    </>
  );
}
