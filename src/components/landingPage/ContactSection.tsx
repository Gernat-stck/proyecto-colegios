"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
export default function ContactSection() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    toast(
      "Gracias por tu mensaje nos pondremos en contacto lo mas pronto posible",
      { duration: 5000, position: "top-center" }
    );
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <div className="container mx-auto px-4 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mapa y información de contacto */}
        <div>
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6167379590244!2d-3.7037974846009856!3d40.41694076330551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422997800a3c81%3A0xc436dec1618c2269!2sPuerta%20del%20Sol%2C%20Madrid%2C%20Spain!5e0!3m2!1sen!2s!4v1638123080320!5m2!1sen!2s"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg shadow-lg w-full"
            ></iframe>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-2" />
              <span>Puerta del Sol, Madrid, España</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-blue-500 mr-2" />
              <span>info@ejemplo.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-blue-500 mr-2" />
              <span>+34 123 456 789</span>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Textarea
            placeholder="Mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
            className="min-h-[150px]"
          />
          <Button type="submit" className="w-full">
            Enviar mensaje
          </Button>
        </form>
      </div>

      {/* Enlaces a redes sociales */}
      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">
          Síguenos en redes sociales
        </h3>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-pink-500 hover:text-pink-600">
            <Instagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
