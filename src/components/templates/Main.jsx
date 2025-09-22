import { sp } from "../../services/replaceNumber";
import Styles from "./Main.module.css";

function Main({ posts }) {
  //   console.log(posts.posts[0].options.title);
  return (
    <div className={Styles.container}>
      {posts &&
        posts.posts.map((post) => (
          <div key={post._id} className={Styles.card}>
            <div className={Styles.info}>
              <p>{post.options?.title}</p>
              <div>
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options?.city}</span>
              </div>
            </div>
            <img src={`${import.meta.env.VITE_BASE_URL}public/${post.images[0]}`} />
          </div>
        ))}
    </div>
  );
}

export default Main;
