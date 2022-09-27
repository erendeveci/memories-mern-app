import { useState } from "react";
import Navbar from "../Navbar";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";

import { GrAddCircle } from "react-icons/gr";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const showFormHandle = () => {
    setFormVisible(!formVisible);
  };
   
  return (
    <>
      <section>
        <Navbar />
      </section>
      <section>
        <div className="w-full flex flex-col   mb-1 justify-center items-center   ">
          <GrAddCircle
            className="w-6 h-10 cursor-pointer"
            onClick={showFormHandle}
          />
          {formVisible && (
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              setFormVisible={setFormVisible}
            />
          )}
        </div>
      </section>
      <section className="flex flex-col-reverse items-center  lg:flex lg:flex-row lg:items-start">
        <div className="h-max m-auto  flex">
          <Posts
            className="bg-orange-500 w-full"
            setCurrentId={setCurrentId}
            setFormVisible={setFormVisible}
          />
        </div>
      </section>
    </>
  );
};
export default Home;
