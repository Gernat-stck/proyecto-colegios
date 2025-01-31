import Header from "../../common/home/Header";
import ResourcesComponent from "../../common/home/ResourcesComponent";
import TasksWidget from "../../common/task/TasksWidget";
import ChatsWidget from "../../common/chat/ChatsWidget";

export default function HomeCourses({
  onSelect,
}: {
  onSelect: (component: string) => void;
}) {
  return (
    <>
      <div className="w-full h-full flex flex-wrap lg:flex-nowrap">
        <div className="lg:w-2/3 w-full lg:mr-6">
          <article className="w-full h-48 mr-6 bg-gradient-to-br from-violet-900 to-violet-400 shadow rounded-3xl relative overflow-hidden flex justify-evenly">
            <Header
              average={25}
              tasksDone={15}
              totalTasks={20}
              examsDone={3}
              totalExams={5}
              onSelect={onSelect}
            />
          </article>
          <div className="w-full mt-4 p-4 custom-h-index-content shadow rounded-3xl bg-slate-50">
            <ResourcesComponent />
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-10 custom-h-index-side">
          <TasksWidget />
          <ChatsWidget />
        </div>
      </div>
    </>
  );
}
