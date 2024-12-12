
import styles from "./tagUsBanner.module.css";
const bannerTitle = "Tag us @glamluvcostmetics to be featured!";
function TagUsBanner() {
  return (
    <div className={`${styles.bannerContainer} bg-black px-2 hidden md:block`}>
      <div className={`${styles.bannerText} text-white text-xl uppercase md:text-2xl`} >
        <span className={styles.text}>{bannerTitle}</span>
        <span className={styles.text}>{bannerTitle}</span>
        <span className={styles.text}>{bannerTitle}</span>
        <span className={styles.text}>{bannerTitle}</span>
      </div>
    </div>
  );
}

export default TagUsBanner;
