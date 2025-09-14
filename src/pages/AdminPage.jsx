import { useQuery } from "@tanstack/react-query";
import AddCategoryForm from "../components/templates/AddCategoryForm";
import CategoryList from "../components/templates/CategoryList";
import { getCategory } from "../services/admin";

function AdminPage() {
  return (
    <>
      <CategoryList />
      <AddCategoryForm />
    </>
  );
}

export default AdminPage;
