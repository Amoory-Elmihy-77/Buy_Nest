import Logo from "@assets/svg/wishlist.svg?react";
import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { container, totalNum, pumpQuantity, iconWrapper } = styles;

export default function HeaderWishlist() {
  const navigate = useNavigate();
  const totalQuantity = useAppSelector((state) => state.wishlistSlice.itemsId);
  const [isAnimate, setIsAnimate] = useState(false);
  const quantityStyle = `${totalNum} ${isAnimate ? pumpQuantity : ""}`;
  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={container} onClick={() => navigate("/wishlist")}>
      <div className={iconWrapper}>
        <Logo title="wishlist logo" />
        {totalQuantity.length > 0 && (
          <div className={quantityStyle}>{totalQuantity.length}</div>
        )}
      </div>
      <h3>Wishlist</h3>
    </div>
  );
}
