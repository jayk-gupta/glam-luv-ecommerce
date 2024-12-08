
import styles from "./tagUsBanner.module.css";

function TagUsBanner() {
  return (
    <div className={`${styles.bannerContainer} bg-black px-2 hidden md:block`}>
      <div className={`${styles.bannerText} text-white text-xl uppercase md:text-2xl`} >
        <span className="md:px-4 sm:text-sm sm:px-2 px-2 text-sm md:text-xl">Tag us @glamluvcostmetics to be featured!</span>
        <span className="md:px-4 sm:text-sm sm:px-2 px-2 text-sm  md:text-xl">Tag us @glamluvcostmetics to be featured!</span>
        <span className="md:px-4 sm:text-sm sm:px-2 px-2 text-sm md:text-xl">Tag us @glamluvcostmetics to be featured!</span>
        <span className="md:px-4 sm:text-sm sm:px-2 px-2 text-sm md:text-xl">Tag us @glamluvcostmetics to be featured!</span>
      </div>
    </div>
  );
}

export default TagUsBanner;
