import { deletePost, getPosts } from "../../services/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../modules/Loader";
import Styles from "./PostList.module.css";
import { sp } from "../../services/replaceNumber";
import { toast } from "react-toastify";

function PostList() {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { mutate } = useMutation({
    mutationFn: deletePost,
  });

  const queryClient = useQueryClient();

  const deleteHandler = (event) => {
    mutate(event.target.dataset.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        toast.success("حذف آگهی با موفقیت انجام شد");
      },
    });
  };

  if (isPending) return <Loader />;

  return (
    <div className={Styles.list}>
      <h3>آگهی های شما</h3>
      <>
        {data &&
          data.data.posts.map((post) => (
            <div key={post._id} className={Styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={Styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button data-id={post._id} onClick={deleteHandler}>
                حذف
              </button>
            </div>
          ))}
      </>
    </div>
  );
}

export default PostList;
