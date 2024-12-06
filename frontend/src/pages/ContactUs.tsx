
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CiLocationArrow1 } from "react-icons/ci";
import { FaRegQuestionCircle } from "react-icons/fa";
import styles from "../styles/contactUs.module.css"
function ContactUs() {
  return (
    <div className={styles.container}>
      <h2 className="text-4xl my-6">Contact Us</h2>
      <div className={styles.contactContainer}>
        {/* Phone */}
        <div className={styles.contactBox}>
          <CiPhone className={styles.icon} />
          <div className={styles.content}>
            <h4>By Phone</h4>
            <p>1-909-945-2220 </p>
            <p>1-800-776-2221</p>
            <p>1-909-945-2262 Fax</p>
          </div>
        </div>
        <div className={styles.contactBox}>
          <CiLocationArrow1  className={styles.icon}/>
          <div className={styles.content}>
            <h4>By Mail</h4>
            <p className="font-bold">Glam Luv Costmetics </p>
            <p>2021 S Archibald Ave </p>
            <p>Ontario, CA 91761 USA</p>
          </div>
        </div>
        <div className={styles.contactBox}>
          <FaRegQuestionCircle  className={styles.icon}/>
          <div className={styles.content}>
            <h4 className="uppercase font-bold">FAQ</h4>
            <p className="">Find the answer to your questions.</p>
            <p>Visit FAQ page</p>
          </div>
        </div>
        <div className={styles.contactBox}>
          <MdOutlineEmail className={styles.icon} />
          <div className={styles.content}>
            <h4>By Mail</h4>
            <p className="font-bold">Have a question?</p>
            <p>Email us</p>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

export default ContactUs;
