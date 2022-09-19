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

interface IProps {
  data: {
    id: number;
    company: string;
    product: string;
    desc: string;
    discount: number;
    price: number;
    images: {
      poster: string;
      thumbnail: string;
    }[];
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
      <div className="main">
        <div className="image">
          <div
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
          </div>
          <div className="poster" onClick={() => setShowPopImg(!showPopImg)}>
            <img src={data?.images[posterIndex].poster} alt="" />
          </div>
          <div
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
          </div>
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
                onClick={() => count > 1 && setCount(count - 1)}
                tabIndex={0}
              >
                <IconMinus />
              </button>
              <p>{count}</p>
              <button onClick={() => setCount(count + 1)} tabIndex={0}>
                <IconPlus />
              </button>
            </div>
            <button tabIndex={0} className="addcart-btn" onClick={addToCart}>
              <IconCart />
              Add to cart
            </button>
          </div>
        </div>
      </div>
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
