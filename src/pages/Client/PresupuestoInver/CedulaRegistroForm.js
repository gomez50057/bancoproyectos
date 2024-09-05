import React, { useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import TooltipHelp from '../componentsForm/TooltipHelp';
// import { validationSchema } from './validationSchemaCedula';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';  // Importa el modal aquí
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

// Función para formatear números con comas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CedulaRegistroForm = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];

  const [applies, setApplies] = useState({
    estudios_factibilidad: false,
    analisis_alternativas: false,
    validacion_normativa: false,
    liberacion_derecho_via: false,
    analisis_costo_beneficio: false,
    expediente_tecnico_docu: false,
    proyecto_ejecutivo: false,
    manifestacion_impacto_ambiental: false,
    fotografia_render_proyecto: false,
    otros_estudios: false,
  });

  // Estado para el modal y el ID del proyecto
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectId, setProjectId] = useState('');

  // Manejadores de cambios
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

    if (!condicionante) return [];
    const programas = programasSectorialesOptions[condicionante];

    return programas
      ? Object.keys(programas).map(programa => ({ value: programa, label: programa }))
      : [];
  };

  const getObjetivosOptions = (organismo, dependencia, programa) => {
    const condicionante = organismo !== 'No Aplica' && organismo ? organismo : dependencia;

    if (!condicionante || !programa) return [];

    const objetivos = programasSectorialesOptions[condicionante]?.[programa] || [];
    return objetivos.map(objetivo => ({ value: objetivo, label: objetivo }));
  };

  // Función para enviar el formulario
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    alert('Iniciando el envío del formulario...');
    console.log('Form data to be submitted:', values);

    const formData = new FormData();

    // Añadir datos del formulario a formData
    for (const key in values) {
      if (values[key] instanceof File) {
        formData.append(key, values[key]);
      } else if (Array.isArray(values[key])) {
        // Convertir 'regiones' y 'municipios' a JSON string si son arrays
        if (key === 'regiones' || key === 'municipios') {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          values[key].forEach((file, index) => {
            if (file instanceof File) {
              formData.append(`${key}[${index}]`, file);
            }
          });
        }
      } else {
        formData.append(key, values[key]);
      }
    }

    // Obtener el token CSRF de las cookies
    const csrfToken = Cookies.get('csrftoken');

    try {
      const response = await axios.post('/cedulas/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrfToken  // Añadir el token CSRF al encabezado
        },
      });

      // Obtener el projectId desde la respuesta
      const createdProjectId = response.data.projInvestment_id;
      setProjectId(createdProjectId);

      alert('Formulario enviado con éxito');
      setModalOpen(true); // Abre el modal
      console.log('Response:', response.data);
      resetForm();
    } catch (error) {
      alert('Error al enviar el formulario');
      console.error('Error:', error);
    }

    setSubmitting(false);
  };

  return (
    <section className="formulario-container">
      <div className="banner">
        <h1>Anteproyecto para el Presupuesto de Inversión 2025</h1>
      </div>
      <Formik
        initialValues={{
          nombre_dependencia: '',
          area_adscripcion: '',
          nombre_registrante: '',
          apellido_paterno: '',
          apellido_materno: '',
          correo: '',
          telefono: '',
          extension: '',
          fecha_registro: fechaHoy,
          ejercicio_fiscal: '',
          dependencia: '',
          organismo: '',
          unidad_responsable: '',
          unidad_presupuestal: '',
          nombre_proyecto: '',
          descripcion_proyecto: '',
          situacion_actual: '',
          tipo_obra: '',
          calendario_ejecucion: '',
          beneficio_social: '',
          beneficio_economico: '',
          numero_beneficiarios: '',
          inversion_presupuestada: '',
          cobertura: '',
          regiones: [],
          municipios: [],
          ods: '',
          plan_estatal: '',
          objetivo_ped: '',
          estrategia_ped: '',
          linea_accion_ped: '',
          indicador_ped: '',
          programa_sectorial: '',
          objetivo_programa: '',
          propuesta_campana: '',
          cual_propuesta: '',
          expediente_tecnico: '',
          estudios_factibilidad: [],
          analisis_alternativas: [],
          validacion_normativa: [],
          liberacion_derecho_via: [],
          analisis_costo_beneficio: [],
          expediente_tecnico_docu: [],
          proyecto_ejecutivo: [],
          manifestacion_impacto_ambiental: [],
          fotografia_render_proyecto: [],
          otros_estudios: [],
        }}
        validationSchema={null}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue, values, isSubmitting }) => {
          const programasOptions = getProgramasOptions(values.organismo, values.dependencia);
          const objetivosOptions = getObjetivosOptions(values.organismo, values.dependencia, values.programa_sectorial);

          const objetivos = values.plan_estatal ? Acuerdos[values.plan_estatal]?.objetivos || [] : [];
          const estrategias = values.objetivo_ped ? Acuerdos[values.plan_estatal]?.estrategias[values.objetivo_ped] || [] : [];
          const lineasAccion = values.estrategia_ped ? Acuerdos[values.plan_estatal]?.lineasAccion[values.estrategia_ped] || [] : [];
          const indicadores = values.linea_accion_ped ? Acuerdos[values.plan_estatal]?.indicadores[values.linea_accion_ped] || [] : [];

          return (
            <Form>
              {/* Registro del Responsable del Proyecto */}
              <SectionTitle title="Registro del Responsable del Proyecto" />
              <div className="form-row">
                <FieldGroup name="nombre_dependencia" label="Nombre de la Dependencia u Organismo" type="text" />
                <FieldGroup name="area_adscripcion" label="Área de Adscripción" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="nombre_registrante" label="Nombre(s) de quien registra" type="text" />
                <FieldGroup name="apellido_paterno" label="Apellido Paterno" type="text" />
                <FieldGroup name="apellido_materno" label="Apellido Materno" type="text" />
              </div>
              <div className="form-row">
                <FieldGroup name="correo" label="Correo" type="email" />
                <FieldGroup name="telefono" label="Teléfono" type="text" note="Debe ser un número de 10 dígitos" />
                <FieldGroup name="extension" label="Extensión (No es Obligatorio)" type="text" />
              </div>

              {/* Datos Generales del Proyecto */}
              <SectionTitle title="Datos Generales del Proyecto" />
              <div className="form-row">
                <FieldGroup name="fecha_registro" label="Fecha de Registro" type="date" value={values.fecha_registro} tooltipText="Ejemplo." readOnly />
                <CustomSelectField
                  name="ejercicio_fiscal"
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
                    setFieldValue('programa_sectorial', '');
                    setFieldValue('objetivo_programa', '');
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
                    setFieldValue('programa_sectorial', '');
                    setFieldValue('objetivo_programa', '');
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="unidad_responsable"
                  label="Unidad Responsable"
                  options={Object.keys(unidadPresupuestalPorUnidadResponsable).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('unidad_responsable', option.value);
                    setFieldValue('unidad_presupuestal', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="unidad_presupuestal"
                  label="Unidad Presupuestal"
                  options={(unidadPresupuestalPorUnidadResponsable[values.unidad_responsable] || []).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.unidad_responsable}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="nombre_proyecto" label="Nombre del Proyecto" type="text" maxLength="250" note="Máximo 250 caracteres" tooltipText="Ejemplo." />
              </div>

              {/* Descripción del Proyecto */}
              <SectionTitle title="Descripción del Proyecto" />
              <div className="form-row">
                <FieldGroup name="descripcion_proyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <FieldGroup name="situacion_actual" label="Análisis de la situación actual" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="tipo_obra"
                  label="Tipo de Obra"
                  options={['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map((tipo) => ({ value: tipo, label: tipo }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="calendario_ejecucion"
                  label="Calendario de Ejecución"
                  options={[...Array(12).keys()].map((mes) => ({ value: mes + 1, label: `${mes + 1} meses` }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficio_social" label="Beneficio Social" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Ejemplo." />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficio_economico" label="Beneficio Económico" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Ejemplo." />
              </div>
              <FieldGroup
                name="numero_beneficiarios"
                label="Número Beneficiarios"
                type="text"
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  if (!isNaN(value)) {
                    setFieldValue('numero_beneficiarios', value);
                    e.target.value = formatNumberWithCommas(value);
                  }
                }}
                value={formatNumberWithCommas(values.numero_beneficiarios)}
                note="Debe ser un número entero"
                tooltipText="Ejemplo."
              />

              {/* Estructura Financiera */}
              <SectionTitle title="Estructura Financiera" />
              <div className="form-row">
                <FieldGroup
                  name="inversion_presupuestada"
                  label="Inversión Presupuestada"
                  type="text"
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '');
                    if (!isNaN(value)) {
                      setFieldValue('inversion_presupuestada', value);
                      e.target.value = formatNumberWithCommas(value);
                    }
                  }}
                  value={formatNumberWithCommas(values.inversion_presupuestada)}
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
                    onChange={(selectedOptions) => setFieldValue('regiones', selectedOptions.map(option => option.value))}
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
                    onChange={(selectedOptions) => setFieldValue('municipios', selectedOptions.map(option => option.value))}
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
                  name="plan_estatal"
                  label="Plan Estatal de Desarrollo"
                  options={Object.keys(Acuerdos).map((acuerdo, index) => ({ value: acuerdo, label: acuerdo }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('plan_estatal', option.value);
                    setFieldValue('objetivo_ped', '');
                    setFieldValue('estrategia_ped', '');
                    setFieldValue('linea_accion_ped', '');
                    setFieldValue('indicador_ped', '');
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="objetivo_ped"
                  label="Objetivo del PED"
                  options={objetivos.map((objetivo, index) => ({ value: objetivo, label: objetivo }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.plan_estatal}
                  onChange={(option) => {
                    setFieldValue('objetivo_ped', option.value);
                    setFieldValue('estrategia_ped', '');
                    setFieldValue('linea_accion_ped', '');
                    setFieldValue('indicador_ped', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="estrategia_ped"
                  label="Estrategia del PED"
                  options={estrategias.map((estrategia, index) => ({ value: estrategia, label: estrategia }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.objetivo_ped}
                  onChange={(option) => {
                    setFieldValue('estrategia_ped', option.value);
                    setFieldValue('linea_accion_ped', '');
                    setFieldValue('indicador_ped', '');
                  }}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="linea_accion_ped"
                  label="Línea de Acción del PED"
                  options={lineasAccion.map((linea, index) => ({ value: linea, label: linea }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.estrategia_ped}
                  onChange={(option) => {
                    setFieldValue('linea_accion_ped', option.value);
                    setFieldValue('indicador_ped', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="indicador_ped"
                  label="Indicador Estratégico del PED"
                  options={indicadores.map((indicador, index) => ({ value: indicador, label: indicador }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.linea_accion_ped}
                  tooltipText="Complete este campo con el indicador estratégico relevante que corresponde a su línea de acción del PED."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="programa_sectorial"
                  label="Programa Sectorial/Especial/Institucional"
                  options={programasOptions}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('programa_sectorial', option.value);
                    setFieldValue('objetivo_programa', '');
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="objetivo_programa"
                  label="Objetivo del Programa"
                  options={objetivosOptions}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.programa_sectorial}
                  tooltipText="Ejemplo."
                />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="propuesta_campana"
                  label="¿Se relaciona con alguna propuesta de campaña?"
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('propuesta_campana', option.value);
                    if (option.value === 'No') {
                      setFieldValue('cual_propuesta', 'No aplica');
                    } else {
                      setFieldValue('cual_propuesta', '');
                    }
                  }}
                  tooltipText="Ejemplo."
                />
                <CustomSelectField
                  name="cual_propuesta"
                  label="¿Cuál?"
                  options={
                    values.propuesta_campana === 'Sí'
                      ? propuestaCampana.map((propuesta, index) => ({ value: propuesta, label: propuesta }))
                      : [{ value: 'No aplica', label: 'No aplica' }]
                  }
                  placeholder="Selecciona una opción"
                  isDisabled={values.propuesta_campana !== 'Sí'}
                  tooltipText="Ejemplo."
                />
              </div>

              {/* Anexos del proyecto  */}
              <SectionTitle title="Anexos del proyecto " />
              <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
              <div className="form-row">
                <CustomSelectField
                  name="expediente_tecnico"
                  label="¿Cuenta con expediente técnico Validado?"
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                />
              </div>
              <DocumentUploadSection applies={applies} handleApplyChange={handleApplyChange} values={values} setFieldValue={setFieldValue} />

              <button type="submit" disabled={isSubmitting}>Enviar</button>
            </Form>
          );
        }}
      </Formik>

      {/* Modal para mostrar el ID del proyecto */}
      <ProjectCreationModal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        projectId={projectId}
      />
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
const CustomSelectField = ({ label, options, name, placeholder, isDisabled = false, tooltipText = '', isMulti = false }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (selectedOptions) => {
    if (isMulti) {
      // Extraer solo los valores de las opciones seleccionadas
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
      helpers.setValue(selectedValues);
    } else {
      helpers.setValue(selectedOptions ? selectedOptions.value : '');
    }
  };

  // Convertir el valor actual del campo en una lista de objetos para Select
  const selectedOption = options ? (isMulti ? options.filter(option => field.value.includes(option.value)) : options.find(option => option.value === field.value)) : '';

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
