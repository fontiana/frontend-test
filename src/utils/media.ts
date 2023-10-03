import { generateMedia } from "styled-media-query";

const screens = {
  mobile: "360px",
  mobileMax: "767px",
  tablet: "768px",
  tabletMax: "991px",
  desktop: "992px",
  desktopMax: "1279px",
  desktopL: "1280px",
};

const media = generateMedia(screens);

export default media;
