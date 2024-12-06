
import styles from "./tagUsBanner.module.css";

function TagUsBanner() {
  return (
    <div className={`${styles.bannerContainer} bg-black`}>
      <div className={`${styles.bannerText} text-white text-xl uppercase`}>
        <span className="px-4">Tag us @glamluvcostmetics to be featured!</span>
        <span className="px-4">Tag us @glamluvcostmetics to be featured!</span>
        <span className="px-4">Tag us @glamluvcostmetics to be featured!</span>
        <span className="px-4">Tag us @glamluvcostmetics to be featured!</span>
      </div>
    </div>
  );
}

export default TagUsBanner;
