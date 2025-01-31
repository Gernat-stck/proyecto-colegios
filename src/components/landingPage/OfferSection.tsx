import { BookOpenCheck, Check, Plus } from "lucide-react";

export default function OfferSection() {
  return (
    <>
      <h4
        id="titleOfertaEducativa"
        className="relative hidden lg:block mx-auto w-fit text-8xl text-center font-bold tracking-wide outline-text"
        data-aos="fade-in"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-text="Oferta Educativa"
      >
        Oferta Educativa
      </h4>

      <article className="w-fit h-fit lg:px-16 my-16 flex flex-col lg:flex-row lg:justify-between lg:h-auto lg:gap-4">
        {/* Jardín de niños */}
        <article className="aspect-square bg-slate-100 custom-card-shadow border-2 border-slate-900 text-slate-600 rounded-3xl flex flex-wrap my-4 lg:my-0 lg:w-[31%] w-card md:mx-auto">
          <h4 className="w-full text-3xl mt-2 p-2 text-center font-bold text-slate-900">
            Jardín de niños
          </h4>
          <div className="px-6 text-lg">
            <p className="my-2 flex items-center">
              <Plus className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>3 años en adelante</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Profesores especializados</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Material Gratis</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Monitoreo Continuo</span>
            </p>
          </div>
          <button
            className="ml-auto mr-4 mt-auto mb-4 bg-teal-700/90 rounded-md text-xl text-slate-100 py-2 px-4 font-semibold custom-btn-shadow-reverse border-2 border-slate-900 flex items-center hover:translate-x-2px hover:translate-y-2px"
            type="button"
          >
            <BookOpenCheck className="w-6 h-6 mr-2" />
            <span>Plan de Estudios</span>
          </button>
        </article>
        {/* Primaria */}
        <article className="aspect-square custom-card-shadow border-2 bg-slate-100 border-slate-900 text-slate-600 rounded-3xl flex flex-wrap my-4 lg:my-0 lg:w-[31%] w-card md:mx-auto">
          <h4 className="w-full text-3xl mt-2 p-2 text-center font-bold text-slate-900">
            Primaria
          </h4>
          <div className="px-6 text-lg">
            <p className="my-2 flex items-center">
              <Plus className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>6 años en adelante</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Actividades de Formación</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Descuentos especiales</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Monitoreo Continuo</span>
            </p>
          </div>
          <button
            className="ml-auto mr-4 mt-auto mb-4 bg-teal-700/90 rounded-md text-xl text-slate-100 py-2 px-4 font-semibold custom-btn-shadow-reverse border-2 border-slate-900 flex items-center hover:translate-x-2px hover:translate-y-2px"
            type="button"
          >
            <BookOpenCheck className="w-6 h-6 mr-2" />
            <span>Plan de Estudios</span>
          </button>
        </article>
        {/* Secundaria */}
        <article className="aspect-square custom-card-shadow border-2 border-slate-900 bg-slate-100 text-slate-600 rounded-3xl flex flex-wrap my-4 lg:my-0 lg:w-[31%] w-card md:mx-auto">
          <h4 className="w-full text-3xl mt-2 p-2 text-center font-bold text-slate-900">
            Secundaria
          </h4>
          <div className="px-6 text-lg">
            <p className="my-2 flex items-center">
              <Plus className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>12 años en adelante</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Practica real</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Apoyo en vocación</span>
            </p>
            <p className="my-2 flex items-center">
              <Check className="w-5 h-5 mr-1 text-teal-600/50" />
              <span>Monitoreo Continuo</span>
            </p>
          </div>
          <button
            className="ml-auto mr-4 mt-auto mb-4 bg-teal-700/90 rounded-md text-xl text-slate-100 py-2 px-4 font-semibold custom-btn-shadow-reverse border-2 border-slate-900 flex items-center hover:translate-x-2px hover:translate-y-2px"
            type="button"
          >
            <BookOpenCheck className="w-6 h-6 mr-2" />
            <span>Plan de Estudios</span>
          </button>
        </article>
      </article>
    </>
  );
}
