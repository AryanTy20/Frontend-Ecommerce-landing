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
    <>
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
          <div className="close" onClick={() => closePop((prev) => !prev)}>
            <IconClose />
          </div>
          <div className="image">
            <div
              className="control-left"
              onClick={() => imgPrev({ images, imgIndex, setImgIndex })}
            >
              <IconPrevious />
            </div>
            <div className="poster">
              <img src={images[imgIndex].poster} alt="" />
            </div>
            <div
              className="control-right"
              onClick={() => imgNext({ images, imgIndex, setImgIndex })}
            >
              <IconNext />
            </div>
            <div className="thumbnails">
              {images?.map((val, i) => (
                <div
                  className={`box ${imgIndex === i ? "active" : ""}`}
                  key={i}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={val.thumbnail} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PopImg;
