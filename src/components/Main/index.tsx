import React, { useState } from "react";
import { useAppDispatch } from "../../app/Hooks";
import { add } from "../../features/Cart";
import PopImg from "../PopImg";
import { imgNext, imgPrev } from "../../utils/imageControl";
import "./style.scss";

import {
  IconMinus,
  IconPlus,
  IconCart,
  IconNext,
  IconPrevious,
} from "../../assets";

export interface Images {
  poster: string;
  thumbnail: string;
}

interface IProps {
  data: {
    id: number;
    company: string;
    product: string;
    desc: string;
    discount: number;
    price: number;
    images: Images[];
  } | null;
}

const Main: React.FC<IProps> = ({ data }) => {
  const [count, setCount] = useState<number>(1);
  const [showPopImg, setShowPopImg] = useState<boolean>(false);
  const [posterIndex, setPosterIndex] = useState<number>(0);
  const dispatch = useAppDispatch();
  const discountPrice: number | undefined =
    data?.discount && (data.price * data.discount) / 100;

  const addToCart = () => {
    if (!data) return;
    dispatch(
      add({
        id: data.id,
        img: data.images[0].thumbnail,
        price: discountPrice as number,
        quantity: count,
        title: data.product,
      })
    );
  };

  return (
    <>
      <main className="main">
        <div className="image">
          <button
            aria-label="previous image"
            className="control-left"
            onClick={() =>
              data &&
              imgPrev({
                images: data?.images,
                imgIndex: posterIndex,
                setImgIndex: setPosterIndex,
              })
            }
          >
            <IconPrevious />
          </button>
          <div className="poster" onClick={() => setShowPopImg(!showPopImg)}>
            <img src={data?.images[posterIndex].poster} alt="" />
          </div>
          <button
            aria-label="next image"
            className="control-right"
            onClick={() =>
              data &&
              imgNext({
                images: data?.images,
                imgIndex: posterIndex,
                setImgIndex: setPosterIndex,
              })
            }
          >
            <IconNext />
          </button>
          <div className="thumbnails">
            {data?.images.map((val, i) => (
              <div
                className={`box ${posterIndex === i ? "active" : ""}`}
                key={i}
                onClick={() => setPosterIndex(i)}
              >
                <img src={val.thumbnail} alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="data">
          <p>{data?.company}</p>
          <h2>{data?.product}</h2>
          <p>{data?.desc}</p>
          <div className="price">
            {data?.discount && (
              <div className="discount">
                <h3>${discountPrice?.toFixed(2)}</h3>
                <span>{data.discount}%</span>
              </div>
            )}
            {
              <h3 className="discount-active">{`$${data?.price.toFixed(
                2
              )}`}</h3>
            }
          </div>
          <div className="controls">
            <div className="quantity-btns">
              <button
                aria-label="item decrement"
                onClick={() => count > 1 && setCount(count - 1)}
              >
                <IconMinus />
              </button>
              <h5>{count}</h5>
              <button
                aria-label="item increment"
                onClick={() => setCount(count + 1)}
              >
                <IconPlus />
              </button>
            </div>
            <button
              aria-label="add to cart"
              className="addcart-btn"
              onClick={addToCart}
            >
              <IconCart />
              Add to cart
            </button>
          </div>
        </div>
      </main>
      {showPopImg && data?.images && (
        <PopImg
          images={data.images}
          closePop={setShowPopImg}
          openedImgId={posterIndex}
        />
      )}
    </>
  );
};

export default Main;
