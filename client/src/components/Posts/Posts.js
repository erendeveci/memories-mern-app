import React, { useEffect } from "react";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "../../UI/LoadingSpinner";
import { fetchPosts } from "../../reducers/postsSlice";
const Posts = ({ setCurrentId, setFormVisible }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts); //current id degistigi icin reducers'den secim yapılıyor

  useEffect(() => {
    dispatch(fetchPosts()); //fetch islemi bir kere yapılır
  }, [dispatch]);

  return (
    <>
      {!posts.length ? (
        <section className="flex justify-center items-center  h-[30rem]">
          <LoadingSpinner />
        </section>
      ) : (
        <div className="  grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4      m-auto  ">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              setCurrentId={setCurrentId}
              setFormVisible={setFormVisible}
            />
          ))}
        </div>
      )}
      <section></section>
    </>
  );
};

export default Posts;
