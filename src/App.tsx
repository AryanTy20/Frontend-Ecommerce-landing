import React from "react";

import { Header, Main, Footer } from "./components";
const App: React.FC = () => {
  const Data = {
    id: 1,
    company: "Sneaker Company",
    product: "Fall Limited Edition Sneakers",
    desc: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
    discount: 50,
    price: 250.0,
    images: [
      {
        poster: "/image-product-1.jpg",
        thumbnail: "/image-product-1-thumbnail.jpg",
      },
      {
        poster: "/image-product-2.jpg",
        thumbnail: "/image-product-2-thumbnail.jpg",
      },
      {
        poster: "/image-product-3.jpg",
        thumbnail: "/image-product-3-thumbnail.jpg",
      },
      {
        poster: "/image-product-4.jpg",
        thumbnail: "/image-product-4-thumbnail.jpg",
      },
    ],
  };

  return (
    <>
      <Header />
      <Main data={Data} />
      <Footer />
    </>
  );
};

export default App;

// interface Image {
//   poster: string;
//   thumbnail: string;
// }
