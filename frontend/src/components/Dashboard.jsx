import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar backgroundcolor={true} />
      <div className="flex items-center justify-center min-h-screen bg-priblack font-serif text-white">
        <span className="text-7xl p-10  rounded-xl text-primary font-sans text-white font-bold  mx-4">
          Welcome to
        </span>
        <h1
          onClick={() => {
            navigate("/problemset");
          }}
          className="text-7xl hover:cursor-pointer hover:shadow-black hover:shadow-lg duration-500 transition ease-out shadow-black shadow-md py-10 rounded-xl text-primary font-sans text-yellow-500 font-bold px-28"
        >
          AlgoChef <br />
        </h1>
        {/* <button
          className="text-xl m-2 font-extralight font-sans text-white mt-5 transition-all duration-300 ease-in-out transform hover:scale-105 hover:font-semibold"
          onClick={() => {
            navigate("/problemset");
          }}
        ></button> */}
      </div>
    </>
  );
};

export default Dashboard;
