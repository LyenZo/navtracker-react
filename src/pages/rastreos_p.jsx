import React, { useState, useEffect } from "react";
import N_global_m from "../components/recursos/n_global_m";
import R_rastreo from "../components/CRUDS/rastreo/list_rastreo";

const Rastreos = () => {
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
    const checkScreenSize = () => {
    setIsMobile(window.innerWidth <= 768); 
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
}, []);

return (
    <div>
        <R_rastreo/>
        {isMobile && <N_global_m />} 
    </div>
);
};

export default Rastreos;
