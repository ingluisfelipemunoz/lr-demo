import React, { useRef, useState } from "react";
import Input from "../tags/Input";
import Fieldset from "../tags/Fieldset";
// Importar supabase client para interactuar con Supabase

export default function LoanRequest() {
  const frm = useRef();
  const [vivienda, setVivienda] = useState("vivienda_propia");
  const values = () => {
    return new FormData(frm.current);
  };
  const [formData, setFormData] = useState({
    oficina: "",
    fecha: "",
    oficialCredito: "",
    montoSolicitado: "",
    proposito: "",
    nombresApellidos: "",
    apodo: "",
    sexo: "",
    cedulaPasaporte: "",
    nacionalidad: "",
    estadoCivil: "",
    edad: "",
    profesionOcupacion: "",
    gradoEducacion: "",
    numeroDependientes: "",
    ingresosMensuales: "",
    pagoMensual: "",
    vivienda: "",
    direccion: "",
    referenciasParaLlegar: "",
    telefonoVivienda: "",
    celular: "",
    email: "",
    vehiculoPropio: "",
    cuentaCorrienteBanco: "",
    cuentaAhorrosBanco: "",
    nombreConyuge: "",
    cedulaConyuge: "",
    ocupacionConyuge: "",
    ingresoConyuge: "",
    lugarTrabajoConyuge: "",
    telefonoTrabajoConyuge: "",
    // Continúa agregando todos los campos necesarios
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("frm", values().get("vivienda"));
    // Aquí manejarías el envío del formulario a Supabase
  };

  return (
    <form
      ref={frm}
      onSubmit={handleSubmit}
      className="space-y-4 mx-4 my-4 bg-stone-100 p-4"
    >
      <Fieldset text="Datos Basicos">
        <div className="flex flex-row">
          <Input label="Nombres" name="nombres" onChange={handleChange} />
          <Input label="Apellidos" name="apellidos" onChange={handleChange} />
        </div>
        <div className="flex flex-row">
          <Input name="cedula" label="Cedula o Pasaporte" />
          <Input name="nacionalidad" />
        </div>
        <div className="flex flex-row">
          <Input name="gradoEducacion" label="Grado de Educacion" />
          <Input type="date" name="fechaNacimiento" />
        </div>

        <Input name="cantidadDependientes" />

        <Fieldset text="vivienda">
          <div className="flex justify-evenly">
            <Input
              value="vivienda_propia"
              onChange={(e) => setVivienda(e.target.value)}
              name="vivienda"
              label="Propia"
              type="radio"
            />
            <Input
              value="vivienda_alquilada"
              name="vivienda"
              onChange={(e) => setVivienda(e.target.value)}
              label="Alquilada"
              type="radio"
            />
          </div>
          {frm.current && values().get("vivienda") === "vivienda_alquilada" ? (
            <Input name="precioAlquiler" type="number" />
          ) : null}

          <Input
            name="gastosMantenimientoCasa"
            label="Gastos Mensuales de Mantenimiento"
            type="number"
          />
        </Fieldset>

        <Fieldset text="Direccion">
          <Input textarea name="direccion1" label="direccion 1" />
          <Input textarea name="direccion2" label="direccion 2" />
          <Input
            textarea
            name="direccionIntrucciones"
            label="Intrucciones Adicionales para Llegar"
          />
        </Fieldset>
        <Input label="Apellidos" name="apellidos" />
      </Fieldset>
      <Fieldset text="Datos Financieros">
        <div className="flex flex-row">
          <Input name="oficioPrincipal" />
          <Input name="ingresoOficioPrincipal" type="number" />
        </div>
        <div className="flex flex-row">
          <Input name="oficioSecundario" />
          <Input name="ingresoOficioSecundario" type="number" />
        </div>
      </Fieldset>

      {/* Repite para cada campo en tu formulario */}
      <button type="submit" className="button">
        Enviar Solicitud
      </button>
    </form>
  );
}
