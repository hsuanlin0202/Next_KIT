import React from "react";
type Props = {
  color: string;
};
export default function Divider({ color }: Props) {
  return (
    <div className="w-full px-6">
      <div
        className="divider"
        style={{ backgroundColor: color, height: "0.15rem", width: "3rem" }}
      ></div>
      <div className="w-full h-1"></div>
    </div>
  );
}
