import React, { useEffect, useState } from "react";
import { IconClose, IconPrevious, IconNext } from "../../assets";
import { imgNext, imgPrev } from "../../utils/imageControl";
import { motion } from "framer-motion";
import "./style.scss";
import { Images } from "../Main";

interface IProp {
  images: Images[];
  closePop: React.Dispatch<React.SetStateAction<boolean>>;
  openedImgId: number;
}

const PopImg: React.FC<IProp> = ({ images, closePop, openedImgId }) => {
  const [imgIndex, setImgIndex] = useState<number>(openedImgId);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      className="pop-img"
    >
      <div className="container">
        <button
          aria-label="close"
          className="close"
          onClick={() => closePop((prev) => !prev)}
        >
          <IconClose />
        </button>
        <div className="image">
          <button
            aria-label="previous image"
            className="control-left"
            onClick={() => imgPrev({ images, imgIndex, setImgIndex })}
          >
            <IconPrevious />
          </button>
          <div className="poster">
            <img src={images[imgIndex].poster} alt="poster" />
          </div>
          <button
            aria-label="next image"
            className="control-right"
            onClick={() => imgNext({ images, imgIndex, setImgIndex })}
          >
            <IconNext />
          </button>
          <div className="thumbnails">
            {images?.map((val, i) => (
              <button
                className={`box ${imgIndex === i ? "active" : ""}`}
                key={i}
                onClick={() => setImgIndex(i)}
              >
                <img src={val.thumbnail} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PopImg;
