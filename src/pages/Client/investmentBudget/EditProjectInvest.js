import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import validationSchemaCedula from './validationSchemaCedula';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import ErrorIcon from '@mui/icons-material/Error';
import TooltipHelp from '../componentsForm/TooltipHelp';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import axios from 'axios';
import Cookies from 'js-cookie';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';
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
import Preloader from '../../../components/Preloader';

// Función para formatear números con comas
const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const handleNumericInput = (fieldName, setFieldValue) => (e) => {
  const { value } = e.target;
  const onlyNums = value.replace(/[^0-9]/g, '');
  setFieldValue(fieldName, onlyNums);
};

const EditProjectInvest = () => {
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
  const { projectId } = useParams();  // Valor obtenido desde la URL
  // const [localProjectId, setLocalProjectId] = useState(''); 
  const [ setLocalProjectId] = useState('');  // Estado para almacenar el ID del proyecto localmente



  // Estado para almacenar los valores iniciales obtenidos de la API
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');


  // Combina las dependencias y organismos en una sola lista para el desplegable
  const dependenciasYOrganismos = useMemo(() => {
    const combined = [...dependencias, ...organismos].map((item) => ({ value: item, label: item }));
    return combined;
  }, []);

  // Efecto para obtener los datos iniciales desde la API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get(`/cedulas/${projectId}/`);

        // Asegúrate de que los valores iniciales para los select coincidan con las opciones
        const initialData = {
          ...response.data,
          fecha_registro: fechaHoy,
          dependencia: response.data.dependencia || '',
          organismo: response.data.organismo || '',
          unidad_responsable: response.data.unidad_responsable || '',
          unidad_presupuestal: response.data.unidad_presupuestal || '',
          programa_sectorial: response.data.programa_sectorial || '',
          objetivo_programa: response.data.objetivo_programa || '',
          cobertura: response.data.cobertura || '',
          ods: response.data.ods || '',
          plan_estatal: response.data.plan_estatal || '',
          objetivo_ped: response.data.objetivo_ped || '',
          estrategia_ped: response.data.estrategia_ped || '',
          linea_accion_ped: response.data.linea_accion_ped || '',
          indicador_ped: response.data.indicador_ped || '',
          propuesta_campana: response.data.propuesta_campana || '',
          cual_propuesta: response.data.cual_propuesta || '',
        };

        setInitialValues(initialData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [projectId, fechaHoy]
  );

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
    setFieldValue('regiones', []);
    setFieldValue('municipios', []);
  };

  const getProgramasOptions = (organismo, dependencia) => {
    const condicionante = organismo !== 'No Aplica' && organismo ? organismo : dependencia;

    if (!condicionante) return [{ value: 'No cuenta con programa', label: 'No cuenta con programa' }];

    const programas = programasSectorialesOptions[condicionante];

    if (!programas || Object.keys(programas).length === 0) {
      return [{ value: 'No cuenta con programa', label: 'No cuenta con programa' }];
    }

    return Object.keys(programas).map(programa => ({ value: programa, label: programa }));
  };

  const getObjetivosOptions = (organismo, dependencia, programa) => {
    if (programa === 'No cuenta con programa') {
      return [{ value: 'No Aplica', label: 'No Aplica' }];
    }

    const condicionante = organismo !== 'No Aplica' && organismo ? organismo : dependencia;

    if (!condicionante || !programa) return [];

    const objetivos = programasSectorialesOptions[condicionante]?.[programa] || [];

    if (objetivos.length === 0) {
      return [{ value: 'No Aplica', label: 'No Aplica' }];
    }

    return objetivos.map(objetivo => ({ value: objetivo, label: objetivo }));
  };

  // Función para enviar (actualizar) el formulario
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    alert('Iniciando la actualización del formulario...');
    console.log('Form data to be submitted:', values);
    setLoading(true);
    setErrorMessage('');

    const csrfToken = Cookies.get('csrftoken');

    try {
      const response = await axios.put(`/cedulas/${projectId}/`, values, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
      });

      const createdProjectId = response.data.projInvestment_id;
      setLocalProjectId(createdProjectId);  // Actualiza el estado local
      alert('Formulario actualizado con éxito');
      setModalOpen(true);
      resetForm();
    } catch (error) {
      setErrorMessage('Formulario no enviado. Valida que todos los campos estén llenos y tu conexión a internet.');
      console.error('Error al enviar el formulario:', error);
      setErrors({
        general: (
          <div>
            <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
            Error al enviar el formulario: {error.message || 'Algo salió mal. Por favor, intente nuevamente.'}
          </div>
        ),
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading || !initialValues) {
    return <Preloader />;
  }

  return (
    <section className="formulario-container">
      <div className="banner">
        <h1>Anteproyecto para el Presupuesto de Inversión 2025</h1>
      </div>

      {loading && <Preloader />}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Formik
        initialValues={initialValues}  // Usar los valores iniciales obtenidos de la API
        validationSchema={validationSchemaCedula}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ setFieldValue, values, isSubmitting, errors, isValid, touched }) => {
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
                <CustomSelectField name="nombre_dependencia" label="Nombre de la Dependencia u Organismo" options={dependenciasYOrganismos} placeholder="Selecciona una opción" tooltipText="Indica la dependencia o el organismo que presenta el proyecto." />
                <FieldGroup name="area_adscripcion" label="Área de Adscripción" type="text" tooltipText="Proporciona el área a la que pertenece dentro de la dependencia." />
              </div>
              <div className="form-row">
                <FieldGroup name="nombre_registrante" label="Nombre(s) de quien registra" type="text" tooltipText="Proporciona tu nombre completo como responsable de este registro." />
                <FieldGroup name="apellido_paterno" label="Apellido Paterno" type="text" tooltipText="Indica tu apellido paterno." />
                <FieldGroup name="apellido_materno" label="Apellido Materno" type="text" tooltipText="Indica tu apellido materno." />
              </div>
              <div className="form-row">
                <FieldGroup name="correo" label="Correo" type="email" tooltipText="Proporciona tu correo electrónico institucional." />
                <FieldGroup name="telefono" label="Teléfono"
                  type="text" note="Debe ser un número de 10 dígitos" maxLength={10} tooltipText="Ingresa un número de teléfono válido de 10 dígitos." onChange={handleNumericInput('telefono', setFieldValue)} />
                <FieldGroup name="extension" label="Extensión (No es Obligatorio)" type="text" maxLength={10} tooltipText="Proporciona la extensión telefónica, si aplica." onChange={handleNumericInput('extension', setFieldValue)} />
              </div>

              {/* Datos Generales del Proyecto */}
              <SectionTitle title="Datos Generales del Proyecto" />
              <div className="form-row">
                <FieldGroup name="fecha_registro" label="Fecha de Registro" type="date" value={values.fecha_registro} tooltipText="Esta es la fecha en que estás registrando el proyecto." readOnly />
                <CustomSelectField
                  name="ejercicio_fiscal"
                  label="Ejercicio Fiscal"
                  options={['2020', '2021', '2022', '2023', '2024', '2025'].map((year) => ({ value: year, label: year }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Selecciona el ejercicio fiscal al que corresponde el proyecto."
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
                  tooltipText="Selecciona la dependencia que presenta el proyecto."
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
                  tooltipText="Selecciona el organismo que presenta el proyecto, si aplica."
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
                  tooltipText="Selecciona la unidad responsable del proyecto."
                />
                <CustomSelectField
                  name="unidad_presupuestal"
                  label="Unidad Presupuestal"
                  options={(unidadPresupuestalPorUnidadResponsable[values.unidad_responsable] || []).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.unidad_responsable}
                  tooltipText="Selecciona la unidad presupuestal correspondiente."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="nombre_proyecto" label="Nombre del Proyecto" type="text" maxLength="250" note="Máximo 250 caracteres" tooltipText="Especifica el nombre del proyecto, máximo 250 caracteres." />
              </div>

              {/* Descripción del Proyecto */}
              <SectionTitle title="Descripción del Proyecto" />
              <div className="form-row">
                <FieldGroup name="descripcion_proyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Describe brevemente el proyecto, máximo 1000 caracteres." />
              </div>
              <div className="form-row">
                <FieldGroup name="situacion_actual" label="Análisis de la situación actual" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" tooltipText="Describe la situación actual que motiva el proyecto." />
              </div>
              <div className="form-row">
                <CustomSelectField
                  name="tipo_obra"
                  label="Tipo de Obra"
                  options={['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map((tipo) => ({ value: tipo, label: tipo }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Indica el tipo de obra que se va a realizar en el proyecto."
                />
                <CustomSelectField
                  name="calendario_ejecucion"
                  label="Calendario de Ejecución"
                  options={[...Array(12).keys()].map((mes) => ({ value: mes + 1, label: `${mes + 1} meses` }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Selecciona el tiempo estimado para la ejecución del proyecto."
                />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficio_social" label="Beneficio Social" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Describe el beneficio social que brindará el proyecto." />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficio_economico" label="Beneficio Económico" as="textarea" maxLength="500" note="Máximo 500 caracteres" tooltipText="Describe el beneficio económico que generará el proyecto." />
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
                tooltipText="Proporciona el número de beneficiarios estimados del proyecto."
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
                  tooltipText="Indica la inversión presupuestada para el proyecto."
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
                  tooltipText="Selecciona el ámbito de cobertura del proyecto."
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
                    tooltipText="Selecciona las regiones que serán beneficiadas por el proyecto."
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
                    tooltipText="Selecciona los municipios beneficiados por el proyecto."
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
                  tooltipText="Selecciona el objetivo de desarrollo sostenible que apoya el proyecto."
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
                  tooltipText="Selecciona el acuerdo del Plan Estatal al que se adhiere el proyecto."
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
                  tooltipText="Selecciona el objetivo estratégico del PED relacionado al proyecto."
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
                  tooltipText="Selecciona la estrategia dentro del PED que se adhiere al proyecto."
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
                  tooltipText="Selecciona la línea de acción dentro del PED."
                />
                <CustomSelectField
                  name="indicador_ped"
                  label="Indicador Estratégico del PED"
                  options={indicadores.map((indicador, index) => ({ value: indicador, label: indicador }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.linea_accion_ped}
                  tooltipText="Proporciona el indicador estratégico relacionado con el objetivo."
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
                  isDisabled={!values.dependencia && !values.organismo}
                  tooltipText="Selecciona el programa relacionado con el proyecto."
                />
                <CustomSelectField
                  name="objetivo_programa"
                  label="Objetivo del Programa"
                  options={objetivosOptions}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.programa_sectorial}
                  tooltipText="Selecciona el objetivo del programa que corresponde."
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
                  tooltipText="Indica si el proyecto está relacionado con alguna propuesta de campaña."
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
                  tooltipText="Especifica a cuál propuesta de campaña está relacionada, si aplica."
                />
              </div>

              {/* Campo Prioridad */}
              <div className="form-row">
                <CustomSelectField
                  name="prioridad"
                  label="Prioridad"
                  options={[...Array(100).keys()].map((num) => ({ value: num + 1, label: `${num + 1}` }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Deberás priorizar tu proyecto siendo 1 el prioritario. Recuerda que no debes repetir números."
                />
              </div>

              {/* Anexos del proyecto  */}
              <SectionTitle title="Anexos del proyecto " />
              <div className="form-row">
                <CustomSelectField
                  name="expediente_tecnico"
                  label="¿Cuenta con expediente técnico Validado?"
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                  tooltipText="Indica si el proyecto cuenta con expediente técnico validado."
                />
              </div>
              <p>Si tienes algún documento complementario, anéxalo en el campo que más se adecue.</p>
              <DocumentUploadSection applies={applies} handleApplyChange={handleApplyChange} values={values} setFieldValue={setFieldValue} />

              {Object.keys(errors).length > 0 && touched && !isValid && (
                <div className="error-message">
                  <ErrorIcon style={{ color: 'red', marginRight: '5px' }} />
                  Por favor, revisa el formulario. Hay campos vacíos o incorrectos.
                </div>
              )}

              {errors.general && <div className="error-message">{errors.general}</div>}

              <div className="form-row-button">
                <button type="submit" className="submit-button" disabled={isSubmitting || loading}>
                  {loading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
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
const CustomSelectField = ({ label, options, name, placeholder, isDisabled = false, tooltipText = '', isMulti = false, onChange }) => {
  const [field, , helpers] = useField(name);

  // Manejo del cambio en los valores seleccionados
  const handleChange = (selectedOptions) => {
    if (isMulti) {
      const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
      helpers.setValue(selectedValues);
    } else {
      helpers.setValue(selectedOptions ? selectedOptions.value : '');
    }
    if (onChange) {
      onChange(selectedOptions);
    }
  };

  // Si es multi-selección o simple, asegurar que el valor esté correctamente asignado
  const selectedOption = isMulti
    ? options.filter(option => field.value.includes(option.value))
    : options.find(option => option.value === field.value);

  // Agregar dinámicamente opciones faltantes si no están en las opciones originales
  const dynamicOption = field.value && !selectedOption
    ? { value: field.value, label: `Valor no disponible: ${field.value}` }
    : null;

  const allOptions = dynamicOption ? [...options, dynamicOption] : options;

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
        id={name}
        options={allOptions} // Usamos todas las opciones, incluyendo las dinámicas
        name={name}
        value={selectedOption || dynamicOption || ''}  // Mostrar la opción seleccionada o la dinámica
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

export default EditProjectInvest;
