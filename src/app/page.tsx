import Loader from "@/components/Loader";
import NavPad from "@/components/NavPad";
import OrientationModal from "@/components/OrientationModal";
import Sidebar from "@/components/Sidebar";
import Experience from "@/experience/Experience";

const Home = () => {
  return (
    <>
      <Loader />
      <NavPad />
      <Sidebar />
      <Experience />
      <OrientationModal />
    </>
  );
};

export default Home;
