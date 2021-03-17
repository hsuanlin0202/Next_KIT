import React from "react";
type Props = {
  url?: string;
};
export default function Video({ url }: Props) {
  return (
    <div className="w-full h-64">
      <iframe
        className="w-full h-full"
        src={url}
        allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
}
