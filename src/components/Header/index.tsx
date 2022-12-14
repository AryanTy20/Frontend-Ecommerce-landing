import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { remove } from "../../features/Cart";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import "./style.scss";
import {
  Logo,
  IconCart,
  IconClose,
  IconMenu,
  IconDelete,
  Avatar,
} from "../../assets";

const NavVariants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  hidden: {
    x: -100,
    opacity: 0,
  },
};

const item = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartSize = useAppSelector((state) => state.Cart.length);
  const NavLinks: string[] = ["Collection", "Men", "Women", "About", "Contact"];

  return (
    <>
      <header className="header">
        <div className="left">
          <div className="ham" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <IconClose /> : <IconMenu />}
          </div>
          <Link className="logo" to="/" aria-label="link to home">
            <Logo />
          </Link>

          <nav className="menu">
            <a href="#">Collection</a>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </nav>
        </div>
        <div className="right">
          <button
            aria-label="cart"
            className="cart"
            data-shownumber={cartSize > 0 ? "true" : "false"}
            data-value={cartSize}
            onClick={() => setShowCart(!showCart)}
          >
            <IconCart />
          </button>
          <div aria-label="profile picture" className="profile">
            <img src={Avatar} alt="profile picture" />
          </div>
        </div>
      </header>
      <div className="cartdisplay">{showCart && <Cart />}</div>
      {showMenu && (
        <motion.nav
          variants={NavVariants}
          initial="hidden"
          animate="visible"
          className="mobmenu"
        >
          <div className="links">
            {NavLinks.map((el, i) => (
              <motion.a variants={item} key={i}>
                {el}
              </motion.a>
            ))}
          </div>
        </motion.nav>
      )}
    </>
  );
};

const Cart: React.FC = () => {
  const data = useAppSelector((state) => state.Cart);
  const cartLength = data?.length;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
        },
      }}
      className="cart-out"
    >
      <div className="title">Cart</div>
      <div className={`cart-items ${cartLength < 1 ? "empty-cart" : ""}`}>
        {cartLength < 1 ? (
          <p>Your cart is empty</p>
        ) : (
          data?.map((item, i) => <CartItem data={item} key={i} />)
        )}
        {cartLength > 0 && (
          <button className="checkout" aria-label="checkout">
            Checkout
          </button>
        )}
      </div>
    </motion.div>
  );
};

interface listProps {
  data: {
    id: number;
    img: string;
    price: number;
    quantity: number;
    title: string;
  };
}

const CartItem: React.FC<listProps> = ({ data }) => {
  // const Price: string = new Intl.NumberFormat("us", {
  //   style: "currency",
  //   currency: "USD",
  // }).format(data?.price);
  // const Total: string = new Intl.NumberFormat("us", {
  //   style: "currency",
  //   currency: "USD",
  // }).format(data?.price * data?.quantity);
  const dispatch = useAppDispatch();
  const Total = data?.price * data?.quantity;

  return (
    <div className="item">
      <div className="thumbnail">
        <img src={data.img} alt="item-thumbnail" />
      </div>
      <div className="meta">
        <p>{data?.title}</p>
        <p>
          <span>${data?.price} </span>
          <span> x {data?.quantity} </span> <b>${Total}</b>
        </p>
      </div>
      <button
        aria-label="remove item from cart"
        className="remove"
        onClick={() => dispatch(remove(data.id))}
      >
        <IconDelete />
      </button>
    </div>
  );
};

export default Header;
