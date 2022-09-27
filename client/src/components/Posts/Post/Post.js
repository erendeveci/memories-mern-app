import React from "react";

import { BsThreeDots } from "react-icons/bs";
import { AiOutlineHeart, AiOutlineDelete } from "react-icons/ai";
import { RiUser6Fill } from "react-icons/ri";
import moment from "moment";

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../reducers/postsSlice";

const Post = ({ post, setCurrentId, setFormVisible }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length >= 0) {
      return post.likes.find(
        (like) => like === (user?.result?.sub || user?.result?._id)
      ) ? (
        <>
          <button
            onClick={() => dispatch(likePost(post._id))}
            disabled={!user?.result}
            className="border-[1px]   bg-[#ff4425] justify-center items-center   p-1 flex  rounded-xl   text-black text-base       hover:border-white"
          >
            <div className=" flex w-10 justify-center">
              <AiOutlineHeart className="self-center   w-7 h-5 text-white " />
              <p className="text-white w-7">{post.likes.length}</p>
            </div>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => dispatch(likePost(post._id))}
            disabled={!user?.result}
            className="border-[1px]   border-black     bg-white justify-center items-center   p-1 flex  rounded-xl   text-black text-base  "
          >
            <div className=" flex w-10 justify-center">
              <AiOutlineHeart className="self-center   w-7 h-5 text-black " />
              <p className="text-black w-7">{post.likes.length}</p>
            </div>
          </button>
        </>
      );
    }

    return <>Like</>;
  };

  return (
    <div className="w-[330px]  sm:w-[350px]  h-max  m-2 mb-2   border-[1px] border-gray-300 relative mx-[15px] text-sm rounded-2xl ">
      <div className="text-black  w-full mb-4 p-3   mt-2">
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div>
              <div className="flex">
                <p className="text-sm font-bold">{post.name}</p>
                <RiUser6Fill className="h-auto mx-2" />
              </div>
              <p className="text-xs">{moment(post.createdAt).fromNow()}</p>
            </div>
            <div>
              {(user?.result?.sub === post.creator ||
                user?.result?._id === post.creator) && (
                <div className="  text-xs   w-6 text-right">
                  <button
                    onClick={() => {
                      setCurrentId(post._id);
                      setFormVisible(true);
                    }}
                  >
                    <BsThreeDots className="w-6 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <img
        src={post.selectedFile}
        className="w-full h-[300px] p-3"
        alt={post._id}
      />
      <div className="  h-auto p-3  flex flex-col ">
        <div className="text-xl font-semibold ">{post.title}</div>

        <div className="text-l">{post.message}</div>
        <div className="text-slate-500  w-full mt-2">
          <p className="  w-full  h-auto break-words ">
            {post.tags.map((tag) => `#${tag}`)}
          </p>
        </div>
        <div className="text-lg text-blue-700  flex justify-between mt-2  ">
          <Likes />

          {(user?.result?.sub === post.creator ||
            user?.result?._id === post.creator) && (
            <button
              onClick={() => dispatch(deletePost(post._id))}
              className="border-[1px] border-black w-12   p-1 flex justify-center rounded-xl text-black   hover:bg-black hover:text-white   hover:border-none "
            >
              <AiOutlineDelete className="self-center   " />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
