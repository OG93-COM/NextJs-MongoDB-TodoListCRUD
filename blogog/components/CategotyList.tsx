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
        <Link href={`/categories/${item.name}`}>
          <div className="category-btn">{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default CategotyList;
