import styles from "./SearchCard.module.css";
import { SearchCardType } from "./types";

function SearchCard({
  payload: {
    image,
    category_fa,
    title_fa,
    product_id,
    // title_en, price
  },
}: SearchCardType) {
  return (
    // <a
    //   href={`https://dartil.com/product/${product_id}`}
    //   className={styles.card}
    // ></a>
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img className={styles.cardImage} src={image} alt="result item" />
      </div>
      <div className={styles.cardDivider} />
      <section className={styles.cardData}>
        <h6 className={styles.cardCategory}>{category_fa}</h6>
        <p>{title_fa}</p>
        {/* <p>{title_fa}</p> */}
      </section>
    </div>
  );
}

export default SearchCard;
