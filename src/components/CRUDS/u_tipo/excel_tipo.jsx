import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const Excel_usuario = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();  // Inicializa useNavigate

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
          const { tipo } = row;  

          const tipoData = {
            tipo 
          };

          await axios.post('http://18.118.253.191/api/u_tipo', tipoData);
        }
        alert('Datos cargados correctamente');
        navigate('/crud_tipo');  // Redirige a "crud_tipo"
        window.location.reload();  // Refresca la página "crud_tipo"
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        alert('Hubo un error al cargar los datos');
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="container custom-container">
      <h2 className="text-center mb-4">Cargar datos desde Excel</h2>

      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">Selecciona el archivo Excel</label>
        <input 
          type="file" 
          accept=".xlsx, .xls" 
          className="form-control custom-input" 
          onChange={handleFileChange} 
          id="fileInput"
        />
      </div>

      <div className="text-center">
        <button 
          onClick={handleUpload} 
          className="btn btn-primary btn-lg custom-button"
        >
          Subir
        </button>
      </div>

      {/* Estilos añadidos */}
      <style jsx>{`
        .custom-container {
          max-width: 600px;
          margin: auto;
          padding-top: 50px;
          padding-bottom: 50px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          background-color: #f9f9f9;
        }

        h2 {
          color: #4CAF50;
          font-size: 2rem;
          font-weight: bold;
        }

        .custom-input {
          border-radius: 5px;
          padding: 10px;
          font-size: 16px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .custom-button {
          margin-top: 20px;
          padding: 12px 30px;
          font-size: 16px;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          border: none;
          transition: background-color 0.3s ease;
        }

        .custom-button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default Excel_usuario;
