import Sidebar from "../components/templates/Sidebar";
import Main from "../components/templates/main";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/Loader";
import { getCategory } from "../services/admin";

function HomePage() {
  const { data: categories, isPending: isCtegoriesPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategory,
  });

  const { data: posts, isPending: isPostsPending } = useQuery({
    queryKey: ["allPosts"],
    queryFn: getAllPosts,
  });

  if (isCtegoriesPending || isPostsPending) return <Loader />;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar data={categories} />
      <Main posts={posts.data} />
    </div>
  );
}

export default HomePage;
