export default function AboutUsSection() {
  return (
    <>
      <div className="flex w-full h-fit bg-transparent md:bg-slate-900 lg:block relative ">
        <h4 className="z-10 w-fit m-auto px-2 text-slate-900 bg-slate-100 text-2xl roboto-slab uppercase font-bold ubuntu -tracking-wider md:m-0 md:pl-0 md:pr-6 md:text-4xl">
          ¿Quienes somos?
        </h4>
        <div className="absolute top-1/2 -translate-y-1/2 h-0.5 left-0 w-full bg-slate-900 md:hidden"></div>
      </div>
      <div className="w-full lg:w-2/3 lg:h-102 m-0 lg:mt-6 px-2 lg:px-6 flex flex-col">
        <p className="my-4 text-center md:text-left leading-8">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          error quisquam asperiores cumque magnam quidem inventore, placeat illo
          impedit corporis exercitationem veniam alias, itaque tenetur nihil
          accusamus dolore iste repellat!
        </p>
        <p className="my-4 text-center md:text-left leading-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem
          reprehenderit ex repellendus dolores quasi, a tempore, doloremque
          ipsum nulla, nam voluptas quidem odio! In, officia nobis minima
          eveniet quod dolorum!
        </p>
        <p className="md:block hidden my-4 text-center md:text-left leading-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
          harum possimus nam magni, minus, dolores quam ipsam ducimus numquam
          ullam necessitatibus consequatur officia quidem illum.
        </p>
        <p className="lg:block hidden text-sm mt-auto">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita,
          sit totam dolorum quasi quod alias debitis voluptatum distinctio nisi
          placeat deserunt minus eligendi repellendus impedit natus accusantium
          laborum, praesentium est.
        </p>
      </div>
      <div className="w-full lg:w-1/3 lg:h-102 mt-3 lg:mt-6 px-4 lg:pl-0 lg:pr-2 flex flex-col md:flex-row lg:flex-col">
        <div className="relative p-2 bg-slate-50 shadow-md flex flex-col my-2 md:mx-12 md:w-2/5 lg:w-fit">
          <img
            src="https://images.adsttc.com/media/images/57ca/cf48/e58e/ce85/9a00/0058/large_jpg/14054355_10154288362800781_6007310381305214592_o.jpg?1472909123"
            alt="Instalaciones de la escuela"
            className="object-cover aspect-video"
            loading="lazy"
          />
          <p className="text-sm text-center">
            Instalaciones de la escuela, mas de 10 años en operaciones
          </p>
        </div>
        <div className="relative p-2 bg-slate-50 shadow-md flex flex-col my-4 md:mx-12 hidden md:block md:w-2/5 lg:w-fit">
          <img
            src="https://thorsmex.mx/wp-content/uploads/2015/11/render-escuela-nuevo.jpg"
            alt="Instalaciones de la escuela"
            className="object-cover aspect-video"
            loading="lazy"
          />
          <p className="text-sm text-center">Nuestros salones de clase</p>
        </div>
      </div>
      <div className="w-full h-fit flex justify-evenly flex-col md:flex-row mt-12">
        <article className="w-full md:w-2/5 lg:w-1/3 mb-6">
          <div className="flex w-full h-fit bg-transparent  relative mt-6">
            <h4 className="z-10 w-fit m-auto px-2 text-slate-900 bg-slate-100 text-2xl roboto-slab uppercase font-bold ubuntu -tracking-wider md:text-4xl">
              Misión
            </h4>
            <div className="absolute top-1/2 -translate-y-1/2 h-0.5 left-0 w-full bg-slate-900 md:block md:h-1"></div>
          </div>
          <p className="mt-8 px-4 text-center md:text-left md:text-base lg:text-lg leading-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Voluptatibus aut tempore dolore debitis quia cumque laborum veniam?
            Omnis fugit in dolorem delectus placeat sequi quos eos eum.
            Repellendus, maiores soluta.
          </p>
        </article>
        <article className="w-full md:w-2/5 lg:w-1/3 mb-6">
          <div className="flex w-full h-fit bg-transparent  relative mt-6">
            <h4 className="z-10 w-fit m-auto px-2 text-slate-900 bg-slate-100 text-2xl roboto-slab uppercase font-bold ubuntu -tracking-wider md:text-4xl">
              Vision
            </h4>
            <div className="absolute top-1/2 -translate-y-1/2 h-0.5 left-0 w-full bg-slate-900 md:block md:h-1"></div>
          </div>
          <p className="mt-8 px-4 text-center md:text-left md:text-base lg:text-lg leading-8">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            voluptatibus accusamus facere fugiat reprehenderit delectus
            molestiae aliquam aut, similique placeat tempore illum
            exercitationem? Esse, expedita tempora architecto enim beatae
            distinctio.
          </p>
        </article>
      </div>
    </>
  );
}
