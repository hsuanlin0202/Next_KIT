import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  color: string;
  href: string;
};
export default function Button({ children, color, href }: Props) {
  return (
    <>
      <a href={href}>
        <div className="fixed border-none bottom-0 force-m w-full bg-white h-auto py-3 flex justify-center">
          <button className="w-11/12 py-4 text-white text-lg tracking-wider font-bold rounded-lg border hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2">
            {children}
          </button>
        </div>
      </a>
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
