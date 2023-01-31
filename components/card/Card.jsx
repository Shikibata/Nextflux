import Image from "next/image";
import styles from "./Card.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import cls from "classnames";
export default function Card(props) {
  const { imgUrl = "/assets/hero-img.jpg", size = "medium", id } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.largeItem,
    medium: styles.mediumItem,
    small: styles.smallItem,
  };

  const handleError = () => {
    setImgSrc("/assets/placeholder-image.webp");
  };
  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.cardHover, classMap[size])}
        whileHover={{ scale: 1.07 }}
      >
        <Image
          src={imgSrc}
          alt="image"
          fill
          sizes="auto"
          onError={handleError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
}
