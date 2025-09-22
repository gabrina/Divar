import Styles from "./Sidebar.module.css";

function Sidebar({ data }) {
  return (
    <div className={Styles.sidebar}>
      <h6>دسته ها</h6>
      <ul>
        {data &&
          data.data.map((category) => (
            <li key={category._id}>
              <a>
                <img src={`${category.icon}.svg`} />
                {category.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Sidebar;
