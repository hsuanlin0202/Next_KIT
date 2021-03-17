import React from "react";
type Item = {
  title?: string;
  content?: string;
  color: string;
};
export default function ArticleBox({ title, content, color }: Item) {
  return (
    <div className="w-full px-6 my-2">
      <div className={"text-lg font-bold mb-1"} style={{ color: color }}>
        {title}
      </div>
      <p className="text-justify text-gray-800">{content}</p>
    </div>
  );
}
