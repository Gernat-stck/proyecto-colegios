
export default function TasksWidget() {
  return (
    <>
      <div className="w-full bg-slate-50 shadow rounded-3xl mb-4 h-full custom-h-inner-side overflow-auto">
        <ul className="border-b border-slate-300 flex mx-4 pt-2 justify-evenly text-slate-700 text-lg lg:text-base">
          <li className="relative">
            <button
              className="px-2 py-1 text-slate-900 font-semibold transition-all duration-100"
              type="button"
            >
              Tareas
            </button>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900 transition-all duration-100"></span>
          </li>
          <li className="relative">
            <button
              className="px-2 py-1  transition-all duration-100"
              type="button"
            >
              Exámenes
            </button>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent transition-all duration-100"></span>
          </li>
          <li className="relative">
            <button
              className="px-2 py-1  transition-all duration-100"
              type="button"
            >
              Eventos 
            </button>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-transparent transition-all duration-100"></span>
          </li>
        </ul>
        <div className="px-4 block overflow-auto custom-h-events">
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                28
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Sep
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Español</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59pm
                </span>
              </div>
              <p className="font-light text-xs">
                Reseña del cuento leído en clase
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                3
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Biología</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder cuestionario de la etapa 3
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                7
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Matemáticas</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder el laboratorio de problemas de la etapa 2
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                16
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Matemáticas</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder el laboratorio de problemas de la etapa 3
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                4
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Nov
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Historia</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Línea del tiempo de los presidentes del País
              </p>
            </div>
          </article>
        </div>
        <div className="px-4 hidden overflow-auto custom-h-events">
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                10
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Nov
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Física</h4>
                <span className="text-sm font-semibold text-slate-500">
                  1:00pm
                </span>
              </div>
              <p className="font-light text-xs">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                22
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Nov
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Matemáticas</h4>
                <span className="text-sm font-semibold text-slate-500">
                  10:00am
                </span>
              </div>
              <p className="font-light text-xs">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
        </div>
        <div className="px-4 hidden overflow-auto custom-h-events">
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                27
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Sep
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Español</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59pm
                </span>
              </div>
              <p className="font-light text-xs">
                Reseña del cuento leído en clase
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                3
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Biología</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder cuestionario de la etapa 3
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                7
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Matemáticas</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder el laboratorio de problemas de la etapa 2
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                16
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Oct
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Matemáticas</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Responder el laboratorio de problemas de la etapa 3
              </p>
            </div>
          </article>
          <article className="h-14 mt-2 mb-6 flex overflow-hidden rounded-md">
            <div className="aspect-square h-full rounded-xl bg-gradient-to-br from-violet-900 to-violet-400 flex flex-col justify-center items-center">
              <span className="text-2xl font-semibold text-slate-50 w-fit mx-auto">
                4
              </span>
              <span className="text-xs text-slate-50 w-fit mx-auto -mt-2">
                Nov
              </span>
            </div>
            <div className="flex flex-col w-full px-2 text-slate-700">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-900">Historia</h4>
                <span className="text-sm font-semibold text-slate-500">
                  11:59am
                </span>
              </div>
              <p className="font-light text-xs">
                Línea del tiempo de los presidentes del País
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
