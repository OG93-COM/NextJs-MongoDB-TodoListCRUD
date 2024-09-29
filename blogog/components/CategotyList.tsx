import Link from "next/link";
import React from "react";

const categoryData = [
  {
    id: 1,
    name: "UX Design",
  },
  {
    id: 2,
    name: "FrontEnd",
  },
  {
    id: 3,
    name: "BackEnd",
  },
  {
    id: 4,
    name: "UI Design",
  },
];

const CategotyList = () => {
  return (
    <div className="flex justify-start items-center gap-2 flex-wrap">
      {categoryData.map((item) => (
        <Link key={item.id} className="category-btn" href={`/categories/${item.name}`}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default CategotyList;
