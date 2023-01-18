import React from "react";
import ImageMagnifier from "./components/ImageMagnifier";
import image from "./assets/images/shoe-img.jpg";

const App = () => {
  return <ImageMagnifier src={image} title={"shoe"} />;
};

export default App;
