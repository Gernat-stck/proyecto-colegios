import { CourseEnrollmentChart } from "./CourseEnrollmentChart";
import { RevenueUserCard } from "./RevenueUserCard";

export default function HomePartners() {
  return (
    <div className="mt-12 flex-auto ">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <div className="col-span-4">
          <CourseEnrollmentChart />
        </div>
        <RevenueUserCard />
      </div>
    </div>
  );
}
