import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getCategory } from "../../services/admin";
import Styles from "./AddPost.module.css";
import { getCookie } from "../../utils/cookie";
import { toast } from "react-toastify";
import axios from "axios";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: null,
    city: "",
    category: "",
    picture: null,
  });

  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const queryClient = useQueryClient();

  const changeHandler = (event) => {
    const name = event.target.name;
    if (name !== "picture") {
      setForm({ ...form, [name]: event.target.value });
    } else {
      setForm({ ...form, [name]: event.target.files[0] });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);

    // for (let i in form) {
    //   formData.append(i, form[i]);
    // }

    const token = getCookie("accessToken");

    //we need to use another form of request other than predefined api,so:
    axios
      .post(`${import.meta.env.VITE_BASE_URL}post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast.success("آگهی شما ثبت شد");
        queryClient.invalidateQueries(["posts"]);
      })
      .catch(() => toast.error("مشکلی پیش آمده، مجددا تلاش کنید"));
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={Styles.form}
    >
      <h3>افزودن آگهی</h3>
      <label htmlFor="title">عنوان آگهی</label>
      <input id="title" type="text" name="title" placeholder="عنوان آگهی" />
      <label htmlFor="description">توضیحات</label>
      <textarea
        id="description"
        type="text"
        name="description"
        placeholder="توضیحات"
      />
      <label htmlFor="price">قیمت</label>
      <input id="price" type="number" name="price" placeholder="قیمت" />
      <label htmlFor="city">شهر</label>
      <input id="city" type="text" name="city" placeholder="شهر" />
      <label htmlFor="categories">دسته بندی</label>
      <select id="categories" name="category">
        {data?.data.map((category) => (
          <option key={category._id}>{category.name}</option>
        ))}
      </select>
      <label htmlFor="picture">عکس</label>
      <input id="picture" type="file" name="picture" placeholder="عکس" />
      <button type="submit" disabled={isPending}>
        ثبت آگهی
      </button>
    </form>
  );
}

export default AddPost;
