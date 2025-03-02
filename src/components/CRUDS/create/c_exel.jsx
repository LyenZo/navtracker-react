import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

const C_exel = () => {
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
          const { nombre, ap_pat, ap_mat, fn, email, password } = row;

          const n_tel = '1234567890'; // Número de teléfono, puedes personalizarlo
          const id_tipo = '1'; // Valor por defecto para el tipo
          const id_vehiculo = '2'; // Valor por defecto para el vehículo

          const usuario = {
            nombre,
            ap_pat,
            ap_mat,
            email,
            password,
            n_tel,
            id_tipo,
            id_vehiculo
          };

          await axios.post('http://localhost:3001/api/usuario', usuario);
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
    <div>
      <h2>Cargar datos desde Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>
    </div>
  );
};

export default C_exel;
