import pubMarketImage from "./../assets/origin/pubMarket.png";
import pubMarketImage2 from "./../assets/origin/pubMarket2.png";
import gate5Image from "./../assets/origin/gate5.png";
import gate5Image2 from "./../assets/origin/gate52ndpic.png";

const markers = [
  {
    id: 1,
    title: "Bacolor Public Market",
    description: "In front of Bacolor Public Marker",
    coordinate: {
      latitude: 14.9984169136795,
      longitude: 120.65271671807811,
    },
    image: pubMarketImage,
    image2: pubMarketImage2,
  },
  {
    id: 2,
    title: "Gate 5",
    description: " In front of Gate 5",
    coordinate: {
      latitude: 14.998387410303861,
      longitude: 120.65635562275381,
    },
    image: gate5Image,
    image2: gate5Image2,
  },
];

export { markers };
