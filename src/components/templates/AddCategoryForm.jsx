import { useState } from "react";
import Styles from "./CategoryForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategory } from "../../services/admin";
import { toast } from "react-toastify";

function AddCategoryForm() {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const { mutate, error, isPending, data, isError } = useMutation({
    mutationFn: addCategory,
  });
  const queryClient = useQueryClient();

  const submitHandler = (event) => {
    event.preventDefault();
    // const { response, error } = await checkOTP({ mobile, code });

    if (!form.name || !form.slug || !form.icon) {
      toast.warn("لطفا اطلاعات درخواستی را وارد کنید");
      return;
    }

    mutate(form, {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"]);
        toast.success("دسته بندی با موفقیت اضافه شد");
      },
    });
  };

  const changeHandler = (event) => {
    //get the value out of event.target.value so we can use it as a key
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  console.log({ isPending, error, data, isError });
  if (error) toast.error("مشکلی پیش آمده است");

  if (data && data.status === 201) {
  }
  // if (error && error.status === 409)
  //   toast.error("دسته بندی وارد شده تکراری است");

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={Styles.form}
    >
      <h3>دسته بندی جدید</h3>
      <label htmlFor="name">اسم دسته بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکن</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default AddCategoryForm;
