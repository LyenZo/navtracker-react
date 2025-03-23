import React, { useState, useEffect } from "react";
import N_global from "../components/recursos/n_global";
import N_global_m from "../components/recursos/n_global_m";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Función para actualizar el estado según el tamaño de la ventana
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Consideramos móvil cuando el ancho es <= 768px
    };

    // Comprobamos el tamaño de la pantalla al cargar el componente
    checkScreenSize();

    // Añadimos el event listener para el redimensionamiento de la ventana
    window.addEventListener("resize", checkScreenSize);

    // Limpiamos el event listener cuando el componente se desmonta
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div>
      {!isMobile && <N_global />}
      {isMobile && <N_global_m />} {/* Solo mostrar N_global_m si es móvil */}
    </div>
  );
};

export default Home;
