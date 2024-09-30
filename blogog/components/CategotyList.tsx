import Link from "next/link";
import React from "react";
import {categoryData} from '../data'


const CategotyList = () => {
  return (
    <div className="flex justify-start items-center gap-2 flex-wrap mb-4">
      {categoryData.map((item) => (
        <Link key={item.id} className="category-btn" href={`/categories/${item.name}`}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default CategotyList;
