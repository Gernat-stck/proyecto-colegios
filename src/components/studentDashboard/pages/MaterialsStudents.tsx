export default function MaterialStudent() {
  return (
    <div className="w-full h-full flex relative">
      <div className="absolute right-0 top-0 overflow-hidden w-0 text-nowrap justify-start transition-all duration-300 ease-in"></div>
      <div className="w-full mt-12">
        <div className="w-full h-full p-4 bg-slate-50 shadow rounded-3xl">
          <form
            action=""
            className="p-4 flex flex-wrap justify-between items-end mx-2 text-sm"
          >
            <div>
              <label htmlFor="" className="inline-flex flex-col">
                <span className="text-xs pl-2">Buscar:</span>
                <input
                  type="text"
                  placeholder="Nombre..."
                  className="bg-slate-200 rounded-3xl px-4 py-2 border border-slate-300"
                />
              </label>
              <label htmlFor="" className="inline-flex flex-col ml-2">
                <span className="text-xs pl-2">Materia:</span>
                <select
                  name=""
                  id=""
                  className="bg-slate-200 rounded-3xl px-4 py-2 border border-slate-300"
                >
                  <option value="cualquiera">Cualquiera</option>
                </select>
              </label>
            </div>
            <div className="text-base h-full items-end mb-0.5">
              <button
                className="bg-green-500/80 text-slate-50 px-2 py-1 rounded-md ml-2 hover:bg-green-500/50"
                type="button"
              >
                Agregar
              </button>
              <button
                className="bg-amber-500/80 hover:bg-amber-500/50 text-slate-50 px-2 py-1 rounded-md ml-2 transition-all duration-200"
                type="button"
              >
                Editar
              </button>
            </div>
          </form>
          <div className="custom-material-height grid grid-cols-1 lg:grid-cols-4 gap-2 lg:grid-flow-row lg:[grid-auto-rows:48%] overflow-auto custom-scroll p-4 pb-0"></div>
        </div>
      </div>
    </div>
  );
}
