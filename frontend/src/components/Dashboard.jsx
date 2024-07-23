import Navbar from "./Navbar";
const Dashboard = () => {
  return (
    <>
      <Navbar backgroundcolor={true} />
      <div className="flex items-center justify-center min-h-screen bg-priblack font-serif">
        <h1 className="text-7xl text-primary font-sans font-bold">Algo Chef</h1>
      </div>
    </>
  );
};

export default Dashboard;
