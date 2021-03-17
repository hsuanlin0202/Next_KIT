import React from "react";
import Video from "../Widgets/Video";
import ArticleBox from "./DriverArticleBox";
import Divider from "./DriverDivider";
import DriverTitle from "./DriverTitle";

type Item = {
  title?: string;
  content?: string;
};
type Props = {
  video: string;
  title: string;
  content: {
    items: Item[];
  };
  color: string;
};
export default function DriverContent({ video, title, content, color }: Props) {
  const { items } = content;

  return (
    <div className="w-full flex justify-center flex-wrap">
      <Video url={video} />

      <DriverTitle title={title} color={color} />

      <Divider color={color} />

      {items.map(({ title, content }, idx) => (
        <ArticleBox
          key={String(idx)}
          title={title}
          content={content}
          color={color}
        />
      ))}

      <div className="w-full"></div>
    </div>
  );
}
