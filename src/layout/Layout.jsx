import Header from "./Header";
import Footer from "./Footer";
import Styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className={Styles.main}>{children}</div>
      <Footer />
    </>
  );
}

export default Layout;
