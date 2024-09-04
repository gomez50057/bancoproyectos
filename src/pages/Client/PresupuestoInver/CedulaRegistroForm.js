import React, { useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TooltipHelp from '../componentsForm/TooltipHelp';
import { validationSchema } from './validationSchemaCedula';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import {
  dependencias,
  organismos,
  unidadPresupuestalPorUnidadResponsable,
  Acuerdos,
  ODS,
  propuestaCampana,
  municipiosDeHidalgo,
  programasSectorialesOptions,
  regionesHGO,
} from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle';
import './CedulaRegistroForm.css';

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CedulaRegistroForm = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];

  const [applies, setApplies] = useState({
    estudiosFactibilidad: false,
    analisisAlternativas: false,
    validacionNormativa: false,
    liberacionDerechoVia: false,
    analisisCostoBeneficio: false,
    expedienteTecnicoDocu: false,
    expedienteTecnico: false,
    proyectoEjecutivo: false,
    manifestacionImpactoAmbiental: false,
    FotografiaRenderProyecto: false,
    otrosEstudios: false,
  });

  const handleApplyChange = (field) => {
    setApplies((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const municipiosOptions = useMemo(() => [
    ...municipiosDeHidalgo.map((mun) => ({ value: mun, label: mun })),
  ], []);

  const regionesOptions = useMemo(() => [
    ...regionesHGO.map((region) => ({ value: region, label: region })),
  ], []);

  const handleCoberturaChange = (selectedOption, setFieldValue) => {
    setFieldValue('cobertura', selectedOption.value);
    if (selectedOption.value === 'Estatal') {
      setFieldValue('regiones', []);
      setFieldValue('municipios', []);
    } else if (selectedOption.value === 'Regional') {
      setFieldValue('regiones', []);
    } else if (selectedOption.value === 'Municipal') {
      setFieldValue('municipios', []);
    }
  };

  const getProgramasOptions = (organismo, dependencia) => {
    const condicionante = organismo !== 'No Aplica' && organismo ? organismo : dependencia;

    if (!condicionante) return []; // Si no hay condicionante válido, devolver lista vacía
    const programas = programasSectorialesOptions[condicionante];

    return programas
      ? Object.keys(programas).map(programa => ({ value: programa, label: programa }))
      : []; // Devolver opciones si existen programas, de lo contrario, lista vacía
  };

  const getObjetivosOptions = (organismo, dependencia, programa) => {
    const condicionante = organismo !== 'No Aplica' && organismo ? organismo : dependencia;

    if (!condicionante || !programa) return []; // Si falta algún dato necesario, devolver lista vacía

    const objetivos = programasSectorialesOptions[condicionante]?.[programa] || [];
    return objetivos.map(objetivo => ({ value: objetivo, label: objetivo }));
  };

  return (
    <section className="formulario-container">
      <div className="banner">
        <h1>Anteproyecto para el Presupuesto de Inversión 2025</h1>
      </div>
      <Formik
        initialValues={{
          nombreDependencia: '',
          areaAdscripcion: '',
          nombreRegistrante: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correo: '',
          telefono: '',
          extension: '',
          fechaRegistro: fechaHoy,
          ejercicioFiscal: '',
          dependencia: '',
          organismo: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          nombreProyecto: '',
          descripcionProyecto: '',
          situacionActual: '',
          tipoObra: '',
          calendarioEjecucion: '',
          beneficioSocial: '',
          beneficioEconomico: '',
          numeroBeneficiarios: '',
          inversionPresupuestada: '',
          cobertura: '',
          regiones: [],
          municipios: [],
          ods: '',
          planEstatal: '',
          objetivoPED: '',
          estrategiaPED: '',
          lineaAccionPED: '',
          indicadorPED: '',
          programaSectorial: '',
          objetivoPrograma: '',
          propuestaCampana: '',
          cualPropuesta: '',
          expedienteTecnico: '',
          estudiosFactibilidad: [],
          analisisAlternativas: [],
          validacionNormativa: [],
          liberacionDerechoVia: [],
          analisisCostoBeneficio: [],
          expedienteTecnicoDocu: [],
          proyectoEjecutivo: [],
          manifestacionImpactoAmbiental: [],
          FotografiaRenderProyecto: [],
          otrosEstudios: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log('Form data submitted:', values);
          const formData = new FormData();

          for (const key in applies) {
            if (applies[key]) {
              for (const file of values[key]) {
                formData.append(key, file);
              }
            }
          }

          // Lógica para enviar formData al backend
        }}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue, values }) => {
          const programasOptions = getProgramasOptions(values.organismo, values.dependencia);
          const objetivosOptions = getObjetivosOptions(values.organismo, values.dependencia, values.programaSectorial);

          const objetivos = values.planEstatal ? Acuerdos[values.planEstatal]?.objetivos || [] : [];
          const estrategias = values.objetivoPED ? Acuerdos[values.planEstatal]?.estrategias[values.objetivoPED] || [] : [];
          const lineasAccion = values.estrategiaPED ? Acuerdos[values.planEstatal]?.lineasAccion[values.estrategiaPED] || [] : [];
          const indicadores = values.lineaAccionPED ? Acuerdos[values.planEstatal]?.indicadores[values.lineaAccionPED] || [] : [];

          return (
            <Form>
              <SectionTitle title="Registro del Responsable del Proyecto" />
              <div className="form-row">
                <FieldGroup name="nombreDependencia" label="Nombre de la Dependencia u Organismo" type="text" />
                <FieldGroup name="areaAdscripcion" label="Área de Adscripción" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="nombreRegistrante" label="Nombre(s) de quien registra" type="text" />
                <FieldGroup name="apellidoPaterno" label="Apellido Paterno" type="text" />
                <FieldGroup name="apellidoMaterno" label="Apellido Materno" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="correo" label="Correo" type="email" />
                <FieldGroup name="telefono" label="Teléfono" type="text" note="Debe ser un número de 10 dígitos" />
                <FieldGroup name="extension" label="Extensión (No es Obligatorio)" type="text" />
              </div>

              <SectionTitle title="Datos Generales del Proyecto" />
              <div className="form-row">
                <FieldGroup name="fechaRegistro" label="Fecha de Registro" type="date" value={values.fechaRegistro} tooltipText="Ejemplo." readOnly />
                <CustomSelectField
                  name="ejercicioFiscal"
                  label="Ejercicio Fiscal"
                  options={['2020', '2021', '2022', '2023', '2024', '2025'].map((year) => ({ value: year, label: year }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="dependencia"
                  label="Dependencia"
                  options={dependencias.map((dep) => ({ value: dep, label: dep }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('dependencia', option.value);
                    setFieldValue('programaSectorial', '');
                    setFieldValue('objetivoPrograma', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="organismo"
                  label="Organismo"
                  options={organismos.map((org) => ({ value: org, label: org }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('organismo', option.value);
                    setFieldValue('programaSectorial', '');  // Limpiar el campo dependiente
                    setFieldValue('objetivoPrograma', '');    // Limpiar el campo dependiente
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="unidadResponsable"
                  label="Unidad Responsable"
                  options={Object.keys(unidadPresupuestalPorUnidadResponsable).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('unidadResponsable', option.value);
                    setFieldValue('unidadPresupuestal', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="unidadPresupuestal"
                  label="Unidad Presupuestal"
                  options={(unidadPresupuestalPorUnidadResponsable[values.unidadResponsable] || []).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.unidadResponsable}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="nombreProyecto" label="Nombre del Proyecto" type="text" maxLength="250" note="Máximo 250 caracteres" tooltipText="Ejemplo." />
              </div>
              <SectionTitle title="Descripción del Proyecto" />
              <div className="form-row">
                <FieldGroup name="descripcionProyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <FieldGroup name="situacionActual" label="Análisis de la situación actual" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="tipoObra"
                  label="Tipo de Obra"
                  options={['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map((tipo) => ({ value: tipo, label: tipo }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="calendarioEjecucion"
                  label="Calendario de Ejecución"
                  options={[...Array(12).keys()].map((mes) => ({ value: mes + 1, label: `${mes + 1} meses` }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioSocial" label="Beneficio Social" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioEconomico" label="Beneficio Económico" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <FieldGroup name="numeroBeneficiarios" label="Número Beneficiarios" type="number" note="Debe ser un número entero" tooltipText="Ejemplo." />
              </div>
              <SectionTitle title="Estructura Financiera" />
              <div className="form-row">
                <FieldGroup
                  name="inversionPresupuestada"
                  label="Inversión Presupuestada"
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    if (!isNaN(value)) {
                      setFieldValue('inversionPresupuestada', formatNumberWithCommas(value));
                    }
                  }}
                  value={values.inversionPresupuestada}
                  maxLength="250"
                  note="Debe ser un número positivo"
                  tooltipText="Complete este campo con el indicador estratégico relevante que corresponde a su línea de acción del PED."
                />
              </div>

              {/* Ubicación del Proyecto */}
              <SectionTitle title="Ubicación del Proyecto" />
              <div className="form-row">
                <CustomSelectField
                  name="cobertura"
                  label="Cobertura"
                  options={[
                    { value: 'Estatal', label: 'Estatal' },
                    { value: 'Regional', label: 'Regional' },
                    { value: 'Municipal', label: 'Municipal' },
                  ]}
                  placeholder="Selecciona una opción"
                  onChange={(option) => handleCoberturaChange(option, setFieldValue)}
                  tooltipText="Ejemplo."
                />
              </div>
              {values.cobertura === 'Regional' && (
                <div className="form-row">
                  <CustomSelectField
                    name="regiones"
                    label="Regiones"
                    options={regionesOptions}
                    isMulti={true}
                    placeholder="Selecciona una o más regiones"
                    tooltipText="Ejemplo."
                  />
                </div>
              )}
              {values.cobertura === 'Municipal' && (
                <div className="form-row">
                  <CustomSelectField
                    name="municipios"
                    label="Municipios"
                    options={municipiosOptions}
                    isMulti={true}
                    placeholder="Selecciona uno o más municipios"
                    tooltipText="Selecciona los municipios que serán impactados por el proyecto. Si no aplica, selecciona 'No Aplica'."
                  />
                </div>
              )}

              {/* Alineación Estratégica */}
              <SectionTitle title="Alineación Estratégica" />
              <div className="form-row">
                <CustomSelectField
                  name="ods"
                  label="Objetivos de Desarrollo Sostenible"
                  options={ODS.map((objetivo, index) => ({ value: objetivo, label: objetivo }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="planEstatal"
                  label="Plan Estatal de Desarrollo"
                  options={Object.keys(Acuerdos).map((acuerdo, index) => ({ value: acuerdo, label: acuerdo }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('planEstatal', option.value);
                    setFieldValue('objetivoPED', '');
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="objetivoPED"
                  label="Objetivo del PED"
                  options={objetivos.map((objetivo, index) => ({ value: objetivo, label: objetivo }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.planEstatal}
                  onChange={(option) => {
                    setFieldValue('objetivoPED', option.value);
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="estrategiaPED"
                  label="Estrategia del PED"
                  options={estrategias.map((estrategia, index) => ({ value: estrategia, label: estrategia }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.objetivoPED}
                  onChange={(option) => {
                    setFieldValue('estrategiaPED', option.value);
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="lineaAccionPED"
                  label="Línea de Acción del PED"
                  options={lineasAccion.map((linea, index) => ({ value: linea, label: linea }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.estrategiaPED}
                  onChange={(option) => {
                    setFieldValue('lineaAccionPED', option.value);
                    setFieldValue('indicadorPED', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="indicadorPED"
                  label="Indicador Estratégico del PED"
                  options={indicadores.map((indicador, index) => ({ value: indicador, label: indicador }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.lineaAccionPED}
                  tooltipText="Complete este campo con el indicador estratégico relevante que corresponde a su línea de acción del PED."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="programaSectorial"
                  label="Programa Sectorial/Especial/Institucional"
                  options={programasOptions}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('programaSectorial', option.value);
                    setFieldValue('objetivoPrograma', '');  // Limpiar el campo dependiente
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="objetivoPrograma"
                  label="Objetivo del Programa"
                  options={objetivosOptions}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.programaSectorial}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="propuestaCampana"
                  label="¿Se relaciona con alguna propuesta de campaña?"
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('propuestaCampana', option.value);
                    if (option.value === 'No') {
                      setFieldValue('cualPropuesta', 'No aplica');
                    } else {
                      setFieldValue('cualPropuesta', '');
                    }
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="cualPropuesta"
                  label="¿Cuál?"
                  options={
                    values.propuestaCampana === 'Sí'
                      ? propuestaCampana.map((propuesta, index) => ({ value: propuesta, label: propuesta }))
                      : [{ value: 'No aplica', label: 'No aplica' }]
                  }
                  placeholder="Selecciona una opción"
                  isDisabled={values.propuestaCampana !== 'Sí'}
                  tooltipText="Ejemplo."
                />
              </div>

              {/* Anexos del proyecto  */}
              <SectionTitle title="Anexos del proyecto " />
              <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
              <div className="form-row">
                <CustomSelectField
                  name="expedienteTecnico"
                  label="¿Cuenta con expediente técnico Validado?"
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                />
              </div>
              <DocumentUploadSection applies={applies} handleApplyChange={handleApplyChange} values={values} setFieldValue={setFieldValue} />

              <button type="submit">Enviar</button>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

// Componente FieldGroup para simplificar la creación de campos, ahora con soporte para Tooltip
const FieldGroup = ({ label, name, note, tooltipText, ...props }) => (
  <div className="form-group">
    <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      {tooltipText && (
        <div className="tooltip-icon-container">
          <div className="tooltip-icon-support">
            <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
            <TooltipHelp id={`${name}-tooltip`} text={tooltipText} />
          </div>
        </div>
      )}
    </label>
    <Field id={name} name={name} {...props} />
    {note && <p className="field-note">{note}</p>}
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

// Componente CustomSelectField modificado para integrar React Select con Formik y mostrar tooltip
const CustomSelectField = ({ label, options, name, placeholder, isDisabled = false, tooltipText = '', isMulti = false, onChange }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (option) => {
    helpers.setValue(isMulti ? option : option?.value);
    if (onChange) {
      onChange(option);
    }
  };

  const selectedOption = options ? (isMulti ? field.value : options.find(option => option.value === field.value)) : '';

  return (
    <div className="form-group" style={{ borderRadius: '15px' }}>
      <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        {tooltipText && (
          <div className="tooltip-icon-container">
            <div className="tooltip-icon-support">
              <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
              <TooltipHelp id={`${name}-tooltip`} text={tooltipText} />
            </div>
          </div>
        )}
      </label>
      <Select
        className="form-select"
        options={options}
        name={name}
        value={selectedOption}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({ ...base, borderRadius: '15px' }),
        }}
        menuPlacement="auto"
      />
      <ErrorMessage name={name} component="div" className="error" />
    </div>
  );
};

export default CedulaRegistroForm;
