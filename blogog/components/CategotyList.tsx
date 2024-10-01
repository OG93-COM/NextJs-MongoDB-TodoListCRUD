import Link from "next/link";
import React from "react";
import {categoryData} from '../data'
import axios from "axios";

const getDataCat = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/categories")
    return res.data
  } catch (error) {
    console.log("Erro Fetch DaTA Front ", error)
  }

}


const CategotyList = async () => {

  const catName = await getDataCat()
  console.log(catName)

  return (
    <div className="flex justify-start items-center gap-2 flex-wrap mb-4">
      {catName.map((item:any) => (
        <Link key={item.id} className="category-btn" href={`/categories/${item.catName}`}>
          {item.catName}
        </Link>
      ))}
    </div>
  );
};

export default CategotyList;
