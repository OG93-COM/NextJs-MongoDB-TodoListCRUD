"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteBtn = ({id}:{id:string}) => {
  const router = useRouter()

  const removeImage = async (publicId:string) => {
    try {
      const res = await axios.post('api/removeImg', {publicId})
    } catch (error) {
      console.log("Image Cant be Rremoved ", error)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Are You Sure to Delete this Post")
    if(confirmed){
      try {
        const res = await axios.delete(`/api/posts/${id}`)
        if (res.status === 200){
          toast.success('Post removed')
          const post = res.data
          const {publicId} = post;
          await removeImage(publicId)
          console.log("post deleted 🚮")
          router.refresh()
        }
      } catch (error) {
        return null
      }
    }
  };

  return (
    <div onClick={handleDelete} className="text-red-500 flex items-center hover:scale-105 duration-300 cursor-pointer">
      <AiOutlineDelete size={18} color="tomato" /> Delete
    </div>
  );
};

export default DeleteBtn;
