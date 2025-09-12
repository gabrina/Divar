import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import Styles from "./CategoryList.module.css";
import { toast } from "react-toastify";

function CategoryList({ data, refetch, isPending }) {
  const { mutate, data: deleteMessage } = useMutation({
    mutationFn: deleteCategory,
  });

  const deleteHandler = (event) => {
    // console.log(event.target.dataset.id);
    mutate(event.target.dataset.id);
    if (deleteMessage) toast.success("حذف دسته بندی با موفقیت انجام شد");
    refetch();
  };

  if (isPending) return <Loader />;

  return (
    <>
      <h3>دسته بندی های موجود</h3>{" "}
      <div className={Styles.list}>
        {data &&
          data.data.map((category) => (
            <div key={category._id}>
              <img src={`${category.icon}.svg`} />
              <h5>{category.name}</h5>
              <p>Slug: {category.slug}</p>
              <button onClick={deleteHandler} data-id={category._id}>
                حذف
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default CategoryList;
