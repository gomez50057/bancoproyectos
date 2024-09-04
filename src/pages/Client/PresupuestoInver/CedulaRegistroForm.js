import React, { useState, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
  municipiosPorRegion,
  ODS,
  propuestaCampana,
  municipiosDeHidalgo,
  programasSectorialesOptions,  // Importar opciones del programa sectorial
} from '../../../presup_inversion';
import SectionTitle from '../componentsForm/SectionTitle';
import './CedulaRegistroForm.css';

const formatNumberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CedulaRegistroForm = () => {
  const fechaHoy = new Date().toISOString().split('T')[0];

  const [applies, setApplies] = useState({
    estudiosProspectivos: false,
    estudiosFactibilidad: false,
    analisisAlternativas: false,
    validacionNormativa: false,
    liberacionDerechoVia: false,
    situacionSinProyectoFotografico: false,
    situacionConProyectoProyeccion: false,
    analisisCostoBeneficio: false,
    expedienteTecnico: false,
    proyectoEjecutivo: false,
    manifestacionImpactoAmbiental: false,
    otrosEstudios: false,
  });

  const handleApplyChange = (field) => {
    setApplies((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const municipiosOptions = useMemo(() => [
    { value: 'No Aplica', label: 'No Aplica' },
    ...municipiosDeHidalgo.map((mun) => ({ value: mun, label: mun }))
  ], []);

  const handleMunicipiosImpactoChange = (selectedOptions, setFieldValue) => {
    if (selectedOptions.some((option) => option.value === 'No Aplica')) {
      setFieldValue('municipiosImpacto', [{ value: 'No Aplica', label: 'No Aplica' }]);
    } else {
      setFieldValue('municipiosImpacto', selectedOptions);
    }
  };

  const getProgramasOptions = (organismo, dependencia) => {
    // Verificar si "Organismo" es diferente de "No Aplica"
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
          fechaActual: fechaHoy,
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
          region: '',
          municipio: '',
          localidad: '',
          barrioColoniaEjido: '',
          ods: '',
          planEstatal: '',
          objetivoPED: '',
          estrategiaPED: '',
          lineaAccionPED: '',
          indicadorPED: '',
          prioridad: '',
          propuestaCampana: '',
          cualPropuesta: '',
          expedienteTecnico: '',
          estudiosProspectivos: [],
          estudiosFactibilidad: [],
          analisisAlternativas: [],
          validacionNormativa: [],
          liberacionDerechoVia: [],
          situacionSinProyectoFotografico: [],
          situacionConProyectoProyeccion: [],
          analisisCostoBeneficio: [],
          proyectoEjecutivo: [],
          manifestacionImpactoAmbiental: [],
          otrosEstudios: [],
          municipiosImpacto: [],
          programaSectorial: '',  // Añadido: Nuevo campo
          objetivoPrograma: '',   // Añadido: Nuevo campo
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

          if (values.municipiosImpacto && values.municipiosImpacto.length > 0) {
            const municipiosImpactoArray = values.municipiosImpacto.map(mun => mun.value);
            formData.append('municipio_impacto', JSON.stringify(municipiosImpactoArray));
          } else {
            formData.append('municipio_impacto', JSON.stringify([]));
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
          const municipios = values.region ? municipiosPorRegion[values.region] || [] : [];

          return (
            <Form>
              <SectionTitle title="Datos de Registro" />
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

              <SectionTitle title="Datos Generales" />
              <div className="form-row">
                <FieldGroup name="fechaActual" label="Fecha de Registro" type="date" value={values.fechaActual} readOnly />
                <Field
                  name="ejercicioFiscal"
                  label="Ejercicio Fiscal"
                  component={CustomSelect}
                  options={['2020', '2021', '2022', '2023', '2024', '2025'].map((year) => ({ value: year, label: year }))}
                  placeholder="Selecciona una opción"
                />
              </div>
              <div className="form-row">
                <Field
                  name="dependencia"
                  label="Dependencia"
                  component={CustomSelect}
                  options={dependencias.map((dep) => ({ value: dep, label: dep }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('dependencia', option.value);
                    setFieldValue('programaSectorial', '');
                    setFieldValue('objetivoPrograma', '');
                  }}
                />
                <Field
                  name="organismo"
                  label="Organismo"
                  component={CustomSelect}
                  options={organismos.map((org) => ({ value: org, label: org }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('organismo', option.value);
                    setFieldValue('programaSectorial', '');  // Limpiar el campo dependiente
                    setFieldValue('objetivoPrograma', '');    // Limpiar el campo dependiente
                  }}
                />
              </div>
              <div className="form-row">
                <Field
                  name="unidadResponsable"
                  label="Unidad Responsable"
                  component={CustomSelect}
                  options={Object.keys(unidadPresupuestalPorUnidadResponsable).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('unidadResponsable', option.value);
                    setFieldValue('unidadPresupuestal', '');
                  }}
                />
                <Field
                  name="unidadPresupuestal"
                  label="Unidad Presupuestal"
                  component={CustomSelect}
                  options={(unidadPresupuestalPorUnidadResponsable[values.unidadResponsable] || []).map((unidad) => ({ value: unidad, label: unidad }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.unidadResponsable}
                />
              </div>
              <div className="form-row">
                <FieldGroup name="nombreProyecto" label="Nombre del Proyecto" type="text" maxLength="250" note="Máximo 250 caracteres" />
              </div>
              <SectionTitle title="Descripción del Proyecto" />
              <div className="form-row">
                <FieldGroup name="descripcionProyecto" label="Descripción del Proyecto" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" />
              </div>
              <div className="form-row">
                <FieldGroup name="situacionActual" label="Análisis de la situación actual" as="textarea" maxLength="1000" note="Máximo 1000 caracteres" />
              </div>
              <div className="form-row">
                <Field
                  name="tipoObra"
                  label="Tipo de Obra"
                  component={CustomSelect}
                  options={['Adecuación', 'Ampliación', 'Construcción', 'Equipamiento', 'Mantenimiento', 'Rehabilitación', 'Otra'].map((tipo) => ({ value: tipo, label: tipo }))}
                  placeholder="Selecciona una opción"
                />
                <Field
                  name="calendarioEjecucion"
                  label="Calendario de Ejecución"
                  component={CustomSelect}
                  options={[...Array(12).keys()].map((mes) => ({ value: mes + 1, label: `${mes + 1} meses` }))}
                  placeholder="Selecciona una opción"
                />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioSocial" label="Beneficio Social" as="textarea" maxLength="500" note="Máximo 500 caracteres" />
              </div>
              <div className="form-row">
                <FieldGroup name="beneficioEconomico" label="Beneficio Económico" as="textarea" maxLength="500" note="Máximo 500 caracteres" />
              </div>
              <div className="form-row">
                <FieldGroup name="numeroBeneficiarios" label="Número Beneficiarios" type="number" note="Debe ser un número entero" />
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
              {/* Territorio */}
              <SectionTitle title="Territorio" />
              <div className="form-row">
                <Field
                  name="region"
                  label="Región"
                  component={CustomSelect}
                  options={Object.keys(municipiosPorRegion).map((region) => ({ value: region, label: region }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('region', option.value);
                    setFieldValue('municipio', '');
                  }}
                />
                <Field
                  name="municipio"
                  label="Municipio"
                  component={CustomSelect}
                  options={municipios.map((municipio) => ({ value: municipio, label: municipio }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.region}
                />
                <FieldGroup name="localidad" label="Localidad" type="text" maxLength="50" />
                <FieldGroup name="barrioColoniaEjido" label="Barrio/Colonia/Ejido" type="text" maxLength="50" />
              </div>
              <div className="form-row">
                <Field
                  name="municipiosImpacto"
                  label="Municipios de Impacto"
                  component={CustomSelect}
                  options={municipiosOptions}
                  placeholder="Municipios"
                  isMulti={true}
                  onChangeCustom={handleMunicipiosImpactoChange}
                  tooltipText="Selecciona los municipios que serán impactados por el proyecto. Si no aplica, selecciona 'No Aplica'."
                />
              </div>

              {/* Alineación Estratégica */}
              <SectionTitle title="Alineación Estratégica" />
              <div className="form-row">
                {/* Campo: Programa Sectorial/Institucional/Especial */}
                <Field
                  name="programaSectorial"
                  label="Programa Sectorial/Institucional/Especial"
                  component={CustomSelect}
                  options={programasOptions}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('programaSectorial', option.value);
                    setFieldValue('objetivoPrograma', '');  // Limpiar el campo dependiente
                  }}
                />
                {/* Campo: Objetivo del Programa */}
                <Field
                  name="objetivoPrograma"
                  label="Objetivo del Programa"
                  component={CustomSelect}
                  options={objetivosOptions}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.programaSectorial}
                />
              </div>
              <div className="form-row">
                <Field
                  name="ods"
                  label="Objetivos de Desarrollo Sostenible"
                  component={CustomSelect}
                  options={ODS.map((objetivo, index) => ({ value: objetivo, label: objetivo }))}
                  placeholder="Selecciona una opción"
                />
                <Field
                  name="planEstatal"
                  label="Plan Estatal de Desarrollo"
                  component={CustomSelect}
                  options={Object.keys(Acuerdos).map((acuerdo, index) => ({ value: acuerdo, label: acuerdo }))}
                  placeholder="Selecciona una opción"
                  onChange={(option) => {
                    setFieldValue('planEstatal', option.value);
                    setFieldValue('objetivoPED', '');
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                />
              </div>
              <div className="form-row">
                <Field
                  name="objetivoPED"
                  label="Objetivo del PED"
                  component={CustomSelect}
                  options={objetivos.map((objetivo, index) => ({ value: objetivo, label: objetivo }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.planEstatal}
                  onChange={(option) => {
                    setFieldValue('objetivoPED', option.value);
                    setFieldValue('estrategiaPED', '');
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                />
                <Field
                  name="estrategiaPED"
                  label="Estrategia del PED"
                  component={CustomSelect}
                  options={estrategias.map((estrategia, index) => ({ value: estrategia, label: estrategia }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.objetivoPED}
                  onChange={(option) => {
                    setFieldValue('estrategiaPED', option.value);
                    setFieldValue('lineaAccionPED', '');
                    setFieldValue('indicadorPED', '');
                  }}
                />
              </div>
              <div className="form-row">
                <Field
                  name="lineaAccionPED"
                  label="Línea de Acción del PED"
                  component={CustomSelect}
                  options={lineasAccion.map((linea, index) => ({ value: linea, label: linea }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.estrategiaPED}
                  onChange={(option) => {
                    setFieldValue('lineaAccionPED', option.value);
                    setFieldValue('indicadorPED', '');
                  }}
                />
                <Field
                  name="indicadorPED"
                  label="Indicador Estratégico del PED"
                  component={CustomSelect}
                  options={indicadores.map((indicador, index) => ({ value: indicador, label: indicador }))}
                  placeholder="Selecciona una opción"
                  isDisabled={!values.lineaAccionPED}
                  tooltipText="Complete este campo con el indicador estratégico relevante que corresponde a su línea de acción del PED."
                />
              </div>

              {/* Verificación de Propuesta */}
              <SectionTitle title="Verificación de Propuesta" />

              <div className="form-row">
                <Field
                  name="propuestaCampana"
                  label="¿Se apega con alguna propuesta de campaña?"
                  component={CustomSelect}
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
                />
                <Field
                  name="cualPropuesta"
                  label="¿Cuál?"
                  component={CustomSelect}
                  options={
                    values.propuestaCampana === 'Sí'
                      ? propuestaCampana.map((propuesta, index) => ({ value: propuesta, label: propuesta }))
                      : [{ value: 'No aplica', label: 'No aplica' }]
                  }
                  placeholder="Selecciona una opción"
                  isDisabled={values.propuestaCampana !== 'Sí'}
                />
              </div>
              <div className="form-row">
                <Field
                  name="expedienteTecnico"
                  label="¿Cuenta con expediente técnico?"
                  component={CustomSelect}
                  options={[
                    { value: 'Sí', label: 'Sí' },
                    { value: 'No', label: 'No' },
                  ]}
                  placeholder="Selecciona una opción"
                />
              </div>

              {/* Rentabilidad / Estudios de Viabilidad Carga de Documentación */}
              <SectionTitle title="Rentabilidad / Estudios de Viabilidad Carga de Documentación" />
              <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
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

// Componente CustomSelect modificado para integrar React Select con Formik y mostrar tooltip
const CustomSelect = ({ label, options, field, form, placeholder, isDisabled = false, tooltipText = '', isMulti = false, onChangeCustom }) => {
  const onChange = (option) => {
    if (onChangeCustom) {
      onChangeCustom(option, form.setFieldValue);
    } else {
      form.setFieldValue(field.name, isMulti ? option : option.value);
    }
  };

  const selectedOption = options ? (isMulti ? field.value : options.find(option => option.value === field.value)) : '';

  return (
    <div className="form-group" style={{ borderRadius: '15px' }}>
      <label htmlFor={field.name} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        {tooltipText && (
          <div className="tooltip-icon-container">
            <div className="tooltip-icon-support">
              <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
              <TooltipHelp id={`${field.name}-tooltip`} text={tooltipText} />
            </div>
          </div>
        )}
      </label>
      <Select
        className="form-select"
        options={options}
        name={field.name}
        value={selectedOption}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: base => ({ ...base, borderRadius: '15px' })
        }}
        menuPlacement="auto"
      />
      <ErrorMessage name={field.name} component="div" className="error" />
    </div>
  );
};

export default CedulaRegistroForm;
