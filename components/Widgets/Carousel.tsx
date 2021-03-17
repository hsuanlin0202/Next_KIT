import React, { useEffect } from "react";
import CarouselOrigin from "react-material-ui-carousel";
import autoBind from "auto-bind";
type Props = {
  title: string;
  price: string;
  img: string;
  link: string;
};
function Project({ title, price, img, link }: Props) {
  return (
    <a
      href={link}
      className="w-full h-full overflow-hidden rounded shadow-lg flex flex-nowrap"
    >
      <div
        className="w-2/5 p-2 flex flex-wrap content-between"
        style={{ height: "130px" }}
      >
        <p className="w-full font-bold">{title}</p>
        <div className="w-full">
          <p className="text-sm">
            行遍天下
            <br />
            精選行程
          </p>
          <p className="text-blue-400">{price}</p>
        </div>
      </div>
      <div
        className="w-3/5 flex items-stretch overflow-hidden"
        style={{ height: "130px" }}
      >
        <img className="cardImg" src={img} />
      </div>
    </a>
  );
}

const items = [
  {
    title: "暢遊中台灣",
    img:
      "https://wd.car-plus.com.tw/ImgAdmin/News/images/20210118131553(1).png",
    price: "$3,490 起",
    url: "https://twanga.mohist.com.tw/index_pc.php?pro=CPS&d=1748&c=3654",
  },
  {
    title: "暢遊南臺灣",
    img: "https://wd.car-plus.com.tw/ImgAdmin/News/images/20210118131553.png",
    price: "$3,490元 起",
    url: "https://twanga.mohist.com.tw/index_pc.php?pro=CPS&d=1748&c=3655",
  },
  {
    title: "暢遊東臺灣",
    img: "https://wd.car-plus.com.tw/ImgAdmin/News/images/20210118131552.png",
    price: "$4,690元 起",
    url: "https://twangastore.mohist.com.tw/index_pc.php?pro=CPS&d=1748&c=3657",
  },
  {
    title: "暢遊北臺灣",
    img:
      "https://wd.car-plus.com.tw/ImgAdmin/News/images/20210118131552(1).png",
    price: "$3,490元 起",
    url: "https://twangastore.mohist.com.tw/index_pc.php?pro=CPS&d=1748&c=3656",
  },
];

type CarouselProps = {
  textColor: string;
};
export default function TickerCarousel({ textColor }: CarouselProps) {
  useEffect(() => {
    autoBind(setup);
  }, []);

  const setup = {
    autoPlay: false,
    animation: "slide",
    indicators: false,
    timeout: 500,
    navButtonsAlwaysVisible: true,
  };

  return (
    <>
      <div className="mx-6 mt-6 text-xl font-bold" style={{ color: textColor }}>
        精緻套裝行程
      </div>
      <CarouselOrigin
        className="Cards w-full px-10 py-4 h-60"
        autoPlay={setup.autoPlay}
        animation="slide"
        indicators={setup.indicators}
        timeout={setup.timeout}
        navButtonsAlwaysVisible={setup.navButtonsAlwaysVisible}
      >
        {items.map((item, index) => {
          return (
            <Project
              title={item.title}
              price={item.price}
              img={item.img}
              link={item.url}
              key={index}
            ></Project>
          );
        })}
      </CarouselOrigin>
    </>
  );
}
