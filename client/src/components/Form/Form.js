import React, { useEffect, useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { addPost, update } from "../../reducers/postsSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const addPostHandler = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        update({
          currentId: currentId,
          updatedData: { ...postData, name: user?.result?.name },
        })
      );
    } else {
      dispatch(addPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = (e) => {
    if (e) e.preventDefault();

    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    // ? : if this  have property
    return (
      <div className="  shadow-md p-6  h-auto  mb-6 w-full text-center   relative">
        <p>
          Please
          <Link
            to="/auth"
            className="text-base font-semibold  mx-3 hover:text-gray-400"
          >
            sign in
          </Link>
          for create memories
        </p>
      </div>
    );
  }
  return (
    <div className="drop-shadow-lg rounded-2xl p-4  max-w-[95rem]    mb-6  w-full text-sm relative">
      <form method="POST" className="mb-6  ">
        <div className="text-center mb-4 text-lg   ">
          {currentId ? "Edit" : "Create"} a memory
        </div>

        <input
          className="w-full p-3  mb-2 border-[1px] text-base border-gray-400  rounded-md"
          type="text"
          placeholder="Title"
          name="title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <div className="flex justify-between">
          <input
            className="w-[60%] p-3   mb-2 border-[1px] border-gray-400  rounded-md"
            type="text"
            placeholder="Message"
            name="message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <input
            className="w-[38%] p-2  mb-2 border-[1px] border-gray-400  rounded-md"
            type="text"
            placeholder="Tags"
            name="tags"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
        </div>
        <div className="sm:flex  justify-between">
          <div className="fileBase mt-6">
            <FileBase
              className="bg-slate-400 "
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
          <div className="flex justify-end ">
            <button
              className=" w-20 bg-red-600 text-white   border-[1px] border-white rounded-md  p-3 mt-4    hover:bg-white hover:text-red-600 hover:border-red-500 "
              onClick={clear}
            >
              Clear
            </button>
            <button
              className="bg-black w-40 ml-4 text-white border-[1px] border-black    p-3 mt-4 rounded-md   hover:bg-white hover:text-black "
              onClick={addPostHandler}
            >
              {currentId ? "Edit" : "Share"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
