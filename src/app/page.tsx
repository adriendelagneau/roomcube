import Loader from "@/components/Loader";
import NavPad from "@/components/NavPad";
import OrientationModal from "@/components/OrientationModal";
import ResponsiveHandler from "@/components/ResponsiveHandler";
import Sidebar from "@/components/sidebar/Sidebar";
import Experience from "@/experience/Experience";

export default function Home() {
  return (
    <>
      <Loader />
      <Experience />
      <NavPad />
      <Sidebar />
      <OrientationModal />
      <ResponsiveHandler />
    </>
  );
}
