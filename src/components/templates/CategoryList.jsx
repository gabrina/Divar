import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../modules/Loader";
import Styles from "./CategoryList.module.css";
import { toast } from "react-toastify";

function CategoryList() {
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
  });

  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const queryClient = useQueryClient();

  const deleteHandler = (event) => {
    // console.log(event.target.dataset.id);
    mutate(event.target.dataset.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("حذف دسته بندی با موفقیت انجام شد");
      },
    });
  };

  if (isPending) return <Loader />;

  return (
    <>
      <h3 className={Styles.header}>دسته بندی های موجود</h3>{" "}
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
