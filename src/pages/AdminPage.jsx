import { useQuery } from "@tanstack/react-query";
import AddCategoryForm from "../components/templates/AddCategoryForm";
import CategoryList from "../components/templates/CategoryList";
import { getCategory } from "../services/admin";

function AdminPage() {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  return (
    <>
      <CategoryList refetch={refetch} data={data} isPending={isPending} />
      <AddCategoryForm refetch={refetch} />
    </>
  );
}

export default AdminPage;
