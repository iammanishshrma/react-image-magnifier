import React, { useRef, useState } from "react";
import classes from "./ImageMagnifier.module.css";

const ImageMagnifier = (props) => {
  const [showMagnifiedImg, setShowMagnifiedImg] = useState(false);

  const imageContainer = useRef();
  const image = useRef();
  const overlay = useRef();
  const mouseOverlay = useRef();

  const hideElements = () => {
    setShowMagnifiedImg(false);
  };
  const showElements = () => {
    setShowMagnifiedImg(true);
  };

  const mouseMoveHanlder = (e) => {
    //Try, catch to avoid any errors for touch screens
    try {
      //pageX and pageY return the position of client's cursor from top left pf screen
      var x = e.pageX ? e.pageX : e.touches[0].pageX;
      var y = e.pageY ? e.pageY : e.touches[0].pageY;
    } catch (e) {}
    //get image height and width

    let imageWidth = imageContainer.current.offsetWidth;
    let imageHeight = imageContainer.current.offsetHeight;

    //check if mouse goes out of image container
    if (
      imageWidth - (x - imageContainer.current.offsetLeft) < 15 ||
      x - imageContainer.current.offsetLeft < 15 ||
      imageHeight - (y - imageContainer.current.offsetTop) < 15 ||
      y - imageContainer.current.offsetTop < 15
    ) {
      hideElements();
    } else {
      showElements();
    }

    let posX =
      ((x - imageContainer.current.offsetLeft) / imageWidth).toFixed(4) * 100;
    let posY =
      ((y - imageContainer.current.offsetTop) / imageHeight).toFixed(4) * 100;

    if (showMagnifiedImg) {
      //set background position to above obtained values
      overlay.current.style.backgroundPosition = posX + "%" + posY + "%";
      //move the overlay with cursor
      mouseOverlay.current.style.top = y + "px";
      mouseOverlay.current.style.left = x + "px";
    }
  };

  return (
    <div className={classes.image_magnifier}>
      <div
        ref={imageContainer}
        className={classes.image_container}
        id="image-container"
        onMouseEnter={showElements}
        onMouseLeave={hideElements}
        onMouseMoveCapture={mouseMoveHanlder}
        onTouchMoveCapture={mouseMoveHanlder}
      >
        <img
          ref={image}
          src={props.src}
          id="product-image"
          alt={props.title ?? "image"}
        />
        {showMagnifiedImg && (
          <div
            ref={mouseOverlay}
            className={classes.mouse_overlay}
            id="mouse-overlay"
          ></div>
        )}
      </div>
      {showMagnifiedImg && (
        <>
          <div
            ref={overlay}
            className={classes.overlay}
            id="overlay"
            style={{
              background: `url("${props.src}")`,
            }}
          ></div>
        </>
      )}
    </div>
  );
};

export default ImageMagnifier;
