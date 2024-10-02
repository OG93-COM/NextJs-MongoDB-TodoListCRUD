
import Link from "next/link";
import React from "react";
import { TCategory } from "@/app/types";
import axios from "axios";

const getDataCat = async (): Promise<TCategory | null> => {
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/categories`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log("Erro Fetch DaTA Front ", error);
  }
  return null;
};

const CategotyList = async () => {
  const category = await getDataCat();

  return (
    <div className="flex justify-start items-center gap-2 flex-wrap mb-4">
      {category?.map((item: TCategory) => (
        <Link
          key={item.id}
          className="category-btn"
          href={`/categories/${item.catName}`}
        >
          {item.catName}
        </Link>
      ))}
    </div>
  );
};

export default CategotyList;
