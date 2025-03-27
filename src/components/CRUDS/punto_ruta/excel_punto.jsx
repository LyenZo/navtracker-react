import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "bootstrap/dist/css/bootstrap.min.css";

const Excel_usuario = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Por favor selecciona un archivo');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      
      const rows = XLSX.utils.sheet_to_json(sheet);

      console.log(rows);

      try {
        for (const row of rows) {
          const { nombre, latitud, longitud, direccion } = row;

          if (!nombre || !latitud || !longitud || !direccion) {
            alert('Faltan datos en la fila');
            continue;
          }

          const puntoRuta = {
            nombre,
            latitud,
            longitud,
            direccion
          };

          // Enviar datos a la API
          await axios.post('http://18.118.253.191/api/punto_ruta', puntoRuta);
        }
        alert('Datos cargados correctamente');
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un error al cargar los datos');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cargar datos desde Excel</h2>

      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">Selecciona el archivo Excel</label>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          className="form-control" 
          onChange={handleFileChange} 
          id="fileInput"
        />
      </div>

      <div className="text-center">
        <button 
          onClick={handleUpload} 
          className="btn btn-primary btn-lg"
        >
          Subir
        </button>
      </div>
    </div>
  );
};

export default Excel_usuario;
