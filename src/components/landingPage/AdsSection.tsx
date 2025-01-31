"use client";

import { useState, useEffect } from "react";
import { ArrowUpRightIcon } from "lucide-react";

export default function AdsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    //TODO: Ajustar este codigo para funcionar responsive con el servidor (Que estos datos los reciba del servidor)
    {
      id: "slider1",
      title: "¡Regreso a Clases!",
      image:
        "https://blog.up.edu.mx/hubfs/PrepaUP/PrepaUP-Varonil/Blog-Images/Blog-%C2%BFCo%CC%81mo%20es%20un%20alumno%20de%20la%20Preparatoria%20Panamericana%3F-V.png",
    },
    {
      id: "slider2",
      title: "¿Cómo funciona la academia?",
      image:
        "https://blogs.unib.org/wp-content/uploads/2021/12/unini-separar-clases.jpg",
    },
    {
      id: "slider3",
      title: "¡Ya somos mas de 100 alumnos!",
      image:
        "https://www.lucaedu.com/wp-content/uploads/2021/11/clases-virtuales-1-1.jpg",
    },
    {
      id: "slider4",
      title: "Reconocimiento a María por sus 10 años de servicio como maestra",
      image:
        "https://definicion.de/wp-content/uploads/2019/09/Profesora-facultad.jpg",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 z-10 flex flex-col justify-end bg-black bg-opacity-50 p-4 md:p-8 lg:p-12">
              <a
                href="#home"
                className="group mb-4 inline-flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:translate-x-1"
              >
                <h4 className="text-2xl font-bold text-white md:text-4xl lg:text-6xl">
                  {slide.title}
                </h4>
                <ArrowUpRightIcon className="h-6 w-6 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 md:h-8 md:w-8 lg:h-10 lg:w-10" />
              </a>
              <p className="mb-8 hidden text-sm text-white lg:block">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
                repudiandae quibusdam mollitia maiores aut velit amet nemo,
                ratione distinctio reprehenderit quisquam veniam dolor ad,
                impedit cumque consectetur soluta aperiam facilis?
              </p>
            </div>
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </article>
        ))}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
