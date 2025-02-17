import AcademicResume from "../component/AcademicResume";
import StudentOverview from "../component/StudentOverview";
import WidgetsComponent from "../../widgets/WidgetsComponent";
export default function HomeParents() {
  return (
    <div className="grid grid-cols-3 gap-1 ">
      <section className="max-h-[90svh] w-full">
        <StudentOverview />
      </section>
      <section className="max-h-[90svh] w-full">
        <AcademicResume />
      </section>
      <section className="max-h-full w-full mt-10">
        <WidgetsComponent />
      </section>
    </div>
  );
}
