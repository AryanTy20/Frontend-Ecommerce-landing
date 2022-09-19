type ImgControlProps = {
  imgIndex: number;
  images:
    | {
        poster: string;
        thumbnail: string;
      }[];
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
};

export const imgNext = ({ images, imgIndex, setImgIndex }: ImgControlProps) => {
  imgIndex < images.length - 1 ? setImgIndex(imgIndex + 1) : setImgIndex(0);
};
export const imgPrev = ({
  images,
  imgIndex,
  setImgIndex,
}: ImgControlProps): void => {
  imgIndex > 0 ? setImgIndex(imgIndex - 1) : setImgIndex(images.length - 1);
};
