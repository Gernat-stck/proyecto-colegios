import { MousePointerClick } from "lucide-react";

export default function Home() {
  return (
    <section className="flex flex-wrap lg:flex-nowrap relative h-fit-content lg:h-custom-lg-vh bg-transparent pt-8">
      <div className="block lg:hidden relative w-full h-32">
        <div className="-z-10 absolute top-0 h-full aspect-square rounded-full bg-transparent custom-bubble-shadow-mobile"></div>
      </div>
      <div className="z-10 flex flex-col lg:w-2/4 m-auto">
        <h1 className="font-sans text-4xl md:text-7xl font-medium text-center lg:text-right">
          El mejor lugar <br /> Para
          <span className="text-teal-800 underline decoration-4 lg:decoration-8 pl-5">
             aprender
          </span>
        </h1>
        <p className="mx-6 md:mx-10 lg:ml-10 mt-4 text-sm md:text-base">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
          tempora assumenda recusandae possimus nobis explicabo sunt aliquam
          optio et beatae molestiae nulla dolorum voluptas deleniti saepe error
          architecto, excepturi illo.
        </p>
        <button
          className="mx-auto mt-12 md:mt-20 lg:mr-0 lg:ml-auto lg:mt-4 px-9 py-3 md:px-12 md:py-4 lg:px-9 lg:py-3 text-slate-100 text-lg md:text-2xl lg:text-xl font-semibold rounded-full bg-teal-700 shadow-lg hover:bg-teal-800 transition"
          type="button"
        >
          <span className="inline">Agenda Ahora</span>
          <MousePointerClick className="inline ml-3" />
        </button>
      </div>
      <div className="hidden lg:block w-2/4 h-full relative">
        <div className="absolute bottom-8 left-40 size-40 rounded-full overflow-hidden">
          <img
            src="https://neurodesarrollar.com/wp-content/uploads/2017/10/quienes-somos.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-8 left-16 size-80 rounded-full overflow-hidden">
          <img
            src="https://www.cein.eu/wp-content/uploads/2019/10/ingles-todo-el-a%C3%B1o.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-36 right-16 size-56 rounded-full overflow-hidden">
          <img
            src="https://images.indianexpress.com/2020/11/online-class-1200.jpg"
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="-z-10 absolute left-3 -bottom-32 w-[60rem] h-[60rem] rounded-full bg-[#c4dcdd]"></div>
        <div className="-z-10 absolute -left-16 bottom-10 size-16 rounded-full bg-[#c4dcdd]"></div>
        <div className="-z-10 absolute -left-[40rem] top-10 size-40 rounded-full bg-[#c4dcdd]"></div>
      </div>
    </section>
  );
}
