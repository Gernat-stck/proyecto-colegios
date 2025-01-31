export default function ChatsWidget() {
  return (
    <>
      <div className="hidden lg:block w-full bg-slate-50 shadow rounded-3xl mb-4 custom-h-inner-side overflow-auto">
        <h4 className="px-8 pt-4 font-semibold text-slate-400 text-xl">
          Chats
        </h4>
        <article className="mx-4 flex flex-col gap-1 custom-h-index-chat overflow-auto custom-scroll">
          <div className="p-2 rounded-lg flex items-center cursor-pointer hover:bg-slate-900/10">
            <div className="w-8 aspect-square rounded-full relative">
              <div className="absolute bottom-0 right-0 w-2 aspect-square rounded-full bg-green-500"></div>
              <img
                src="https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611750.jpg?w=740&amp;t=st=1722632367~exp=1722632967~hmac=348a4608bf0005c9ceecb59a81d0650d56221a63969a642143ad88b4da24c58f"
                alt="Imagen de perfil 3d genérica"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <div className="text-xs ml-2 text-slate-900">
              <p className="font-semibold">Alex Sánchez</p>
              <p className="ubuntu text-slate-400">Amigo</p>
            </div>
          </div>
          <div className="p-2 rounded-lg flex items-center cursor-pointer hover:bg-slate-900/10">
            <div className="w-8 aspect-square rounded-full relative">
              <div className="absolute bottom-0 right-0 w-2 aspect-square rounded-full bg-green-500"></div>
              <img
                src="https://img.freepik.com/psd-gratis/render-3d-personaje-avatar_23-2150611725.jpg?w=740&amp;t=st=1722632418~exp=1722633018~hmac=6a568d4a53fd872534f9c2c0bdb6593f059c9fd96965a287b5e012f4491b0c05"
                alt="Imagen de perfil 3d genérica"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <div className="text-xs ml-2 text-slate-900">
              <p className="font-semibold">Mariel Salazar</p>
              <p className="ubuntu text-slate-400">Amigo</p>
            </div>
          </div>
          <div className="p-2 rounded-lg flex items-center cursor-pointer hover:bg-slate-900/10">
            <div className="w-8 aspect-square rounded-full relative">
              <div className="absolute bottom-0 right-0 w-2 aspect-square rounded-full bg-green-500"></div>
              <img
                src="https://img.freepik.com/psd-gratis/representacion-3d-avatar_23-2150833538.jpg?w=740&amp;t=st=1722632467~exp=1722633067~hmac=cab5f86b7394be91a7127289e0bf00a2af2de744b5101856391381b66f7be069"
                alt="Imagen de perfil 3d genérica"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <div className="text-xs ml-2 text-slate-900">
              <p className="font-semibold">Monserat Rodríguez</p>
              <p className="ubuntu text-slate-400">Profesor</p>
            </div>
          </div>
          <div className="p-2 rounded-lg flex items-center cursor-pointer hover:bg-slate-900/10">
            <div className="w-8 aspect-square rounded-full relative">
              <div className="absolute bottom-0 right-0 w-2 aspect-square rounded-full bg-green-500"></div>
              <img
                src="https://netrinoimages.s3.eu-west-2.amazonaws.com/2011/07/29/80422/37456/open_book_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_241913.jpg"
                alt="Imagen de perfil 3d genérica"
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <div className="text-xs ml-2 text-slate-900">
              <p className="font-semibold">Español Equipo 03</p>
              <p className="ubuntu text-slate-400">Grupo</p>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
