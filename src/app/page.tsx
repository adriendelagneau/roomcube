import Loader from "@/components/Loader";
import NavPad from "@/components/NavPad";
import Sidebar from "@/components/sidebar/Sidebar";
import Experience from "@/experience/Experience";

export default function Home() {
  return (
    <>
      <Loader />
      <Experience />
      <NavPad />
      <Sidebar />
    </>
  );
}
