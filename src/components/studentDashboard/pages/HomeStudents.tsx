import Header from "../../common/home/Header";
import AcademicResume from "../../common/home/AcademicResume";
import WidgetsComponent from "@/components/widgets/WidgetsComponent";

export default function HomeStudents() {
  return (
    <>
      <div className="w-full h-full flex flex-wrap lg:flex-nowrap">
        <div className="lg:w-2/3 w-full lg:mr-6">
          <article className="w-full h-1/3 mr-6 my-4 bg-gradient-to-br from-violet-900 to-violet-400 shadow rounded-3xl relative overflow-hidden flex justify-evenly">
            <Header />
          </article>
          <div className="w-full mt-8 p-5 custom-h-index-content shadow rounded-3xl bg-gradient-to-br from-violet-900 to-violet-400  overflow-hidden" >
            <AcademicResume />
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-10 custom-h-index-side">
          <WidgetsComponent />
        </div>
      </div>
    </>
  );
}
