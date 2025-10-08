import Loader from "@/components/Loader";
import NavPad from "@/components/NavPad";
import Experience from "@/experience/Experience";

const Home = () => {
  return (
    <>
      <Loader />
      <NavPad/>
      <Experience />
    </>
  );
};

export default Home;
