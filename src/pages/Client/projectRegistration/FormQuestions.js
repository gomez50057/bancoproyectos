import React, { useState } from 'react';
import { Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import { municipiosDeHidalgo, unidadesResponsables, dependencias, organismos, ramoPresupuestalOptions, municipiosPorRegion, unidadPresupuestalPorUnidadResponsable, programaPresupuestarioOptions, indicadoresEstrategicosOptions, aplicaOptions, sectorOptions, tipoProyectoOptions, programasSectorialesOptions, modalidadEjecucionOptions, tipoLocalidadOptions, planNacionalOptions, acuerdosTransversalesOptions, odsOptions } from '../../../utils';
import SectionTitle from '../componentsForm/SectionTitle';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import TooltipHelp from '../componentsForm/TooltipHelp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const handleNumericInput = (fieldName, setFieldValue) => (e) => {
  const { value } = e.target;
  const onlyNums = value.replace(/[^0-9]/g, '');
  setFieldValue(fieldName, onlyNums);
};

const calculateTotalInvestment = (federal, estatal, municipal, otros) => {
  return (
    parseFloat(federal || 0) +
    parseFloat(estatal || 0) +
    parseFloat(municipal || 0) +
    parseFloat(otros || 0)
  ).toFixed(2); // Redondear a 2 decimales
};

const Formulario = ({ setFieldValue, values, isSubmitting }) => {
  const [entityType, setEntityType] = useState('');
  const [selectedUnidadResponsable, setSelectedUnidadResponsable] = useState('');
  const [selectedProgramaPresupuestario, setSelectedProgramaPresupuestario] = useState('');
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedPlanEstatal, setSelectedPlanEstatal] = useState('');

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

  // Manejadores de cambios
  const handleApplyChange = (field) => {
    setApplies((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleRegionChange = (selectedOptions, setFieldValue) => {
    const updatedValues = selectedOptions.map(option => option.value);
    setFieldValue('region', updatedValues);
    setSelectedRegion(updatedValues);
    // Reinicia el campo 'municipio' al cambiar las regiones seleccionadas
    setFieldValue('municipio', '');
  };

  const getRegionByMunicipio = (municipio) => {
    for (const region in municipiosPorRegion) {
      if (municipiosPorRegion[region].includes(municipio)) {
        return region;
      }
    }
    return '';
  };

  const handleMunicipioAyuntamientoChange = (option, setFieldValue) => {
    const municipioValue = option.value;
    // Se guarda el municipio en el campo municipio_ayuntamiento
    setFieldValue('municipio_ayuntamiento', municipioValue);
    // Se asigna el valor en formato array para que cumpla con la validación (se envuelve en array)
    setFieldValue('municipio', [municipioValue]);
    // Se determina la región correspondiente al municipio
    const region = getRegionByMunicipio(municipioValue);
    // Se guarda la región en el campo 'region' (en formato de array ya que es un select multi)
    setFieldValue('region', region ? [region] : []);
    // Actualizamos el estado local para 'selectedRegion'
    setSelectedRegion(region ? [region] : []);
  };


  const getMunicipiosOptions = () => {
    if (!selectedRegion || selectedRegion.length === 0) return [];

    // Combina los municipios de cada región seleccionada
    const allMunicipios = selectedRegion.reduce((acc, region) => {
      const municipios = municipiosPorRegion[region] || [];
      return [...acc, ...municipios];
    }, []);

    // Elimina duplicados
    const uniqueMunicipios = [...new Set(allMunicipios)];

    // Mapea los municipios al formato { value, label }
    return uniqueMunicipios.map(mun => ({ value: mun, label: mun }));
  };


  // const municipiosOptions = [{ value: 'No Aplica', label: 'No Aplica' }, ...municipiosDeHidalgo.map((mun) => ({ value: mun, label: mun }))];

  const getProgramasSIEValue = (tipo_entidad, dependencia, organismo) => {
    if (tipo_entidad === 'municipio_ayuntamiento') {
      return 'No Aplica';
    }

    if (tipo_entidad === 'Dependencia') {
      return programasSectorialesOptions[dependencia] || 'No Aplica';
    }

    if (tipo_entidad === 'Organismo') {
      return programasSectorialesOptions[organismo] || 'No Aplica';
    }

    return 'No Aplica';
  };

  const handleEntityTypeChange = (tipo_entidad, setFieldValue) => {
    setEntityType(tipo_entidad);

    if (tipo_entidad === 'Ayuntamiento') {
      // Se marcan como "No Aplica"
      setFieldValue('dependencia', 'No Aplica');
      setFieldValue('organismo', 'No Aplica');
      setFieldValue('programas_SIE', 'No Aplica');
    } else if (tipo_entidad === 'Dependencia') {
      // Si es Dependencia, los otros campos se marcan como "No Aplica"
      setFieldValue('municipio_ayuntamiento', 'No Aplica');
      setFieldValue('organismo', 'No Aplica');
    } else if (tipo_entidad === 'Organismo') {
      // Si es Organismo, los otros campos se marcan como "No Aplica"
      setFieldValue('municipio_ayuntamiento', 'No Aplica');
      setFieldValue('dependencia', 'No Aplica');
    }
  };

  // Extrae solo los encabezados de indicadoresEstrategicosOptions
  const planEstatalOptions = Object.keys(indicadoresEstrategicosOptions).map(key => ({
    value: key,
    label: key,
  }));

  // Maneja los cambios en plan_estatal
  const handlePlanEstatalChange = (selectedOption, setFieldValue) => {
    const selectedValue = selectedOption ? selectedOption.value : '';
    setSelectedPlanEstatal(selectedValue); // Actualiza el estado de plan_estatal
    setFieldValue('plan_estatal', selectedValue);
    setFieldValue('indicadores_estrategicos', ''); // Resetea el campo indicadores_estrategicos al cambiar plan_estatal
  };

  // Obtiene las opciones de indicadores_estrategicos según el plan_estatal seleccionado
  const getIndicadoresEstrategicosOptions = () => {
    return selectedPlanEstatal
      ? indicadoresEstrategicosOptions[selectedPlanEstatal].map(option => ({
        value: option,
        label: option,
      }))
      : [];
  };

  return (
    <Form encType="multipart/form-data">
      {/* Datos Generales del Proyecto */}
      <SectionTitle title="Generalidades del Proyecto" />
      <div className="form-row">
        <FieldGroup name="fecha_registro" label="Fecha de Registro" type="date" value={values.fecha_registro} tooltipHelp="Esta es la fecha en que estás registrando el proyecto y se agrega de manera automática tomando el dato del día en que se elabora." readOnly />
      </div>

      <div className="form-row">
        <CustomSelectField
          name="tipo_entidad"
          label="Tipo de Entidad"
          options={[
            { value: 'Dependencia', label: 'Dependencia' },
            { value: 'Organismo', label: 'Organismo' },
            { value: 'Ayuntamiento', label: 'Ayuntamiento' },
          ]}
          placeholder="Selecciona una opción"
          tooltipHelp="Selecciona el tipo de entidad para el proyecto."
          onChange={(option) => {
            setFieldValue('tipo_entidad', option.value);
            handleEntityTypeChange(option.value, setFieldValue);
          }}
        />

        {entityType === 'Dependencia' && (
          <CustomSelectField
            name="dependencia"
            label="Dependencia"
            options={dependencias.map(dep => ({ value: dep, label: dep }))}
            placeholder="Selecciona una opción"
            tooltipHelp="Selecciona la dependencia que gestiona el proyecto."
            onChange={(option) => {
              setFieldValue('dependencia', option.value);
              setFieldValue('programas_SIE', getProgramasSIEValue('Dependencia', option.value, values.organismo));
            }}
          />
        )}

        {entityType === 'Organismo' && (
          <CustomSelectField
            name="organismo"
            label="Organismo"
            options={organismos.map(org => ({ value: org, label: org }))}
            placeholder="Selecciona una opción"
            tooltipHelp="Selecciona el organismo encargado del proyecto."
            onChange={(option) => {
              setFieldValue('organismo', option.value);
              setFieldValue('programas_SIE', getProgramasSIEValue('Organismo', values.dependencia, option.value));
            }}
          />
        )}

        {entityType === 'Ayuntamiento' && (
          <CustomSelectField
            name="municipio_ayuntamiento"
            label="Ayuntamiento"
            options={municipiosDeHidalgo.map(mun => ({ value: mun, label: mun }))}
            placeholder="Selecciona una opción"
            tooltipHelp="Selecciona el municipio que gestionará el proyecto."
            onChange={(option) => handleMunicipioAyuntamientoChange(option, setFieldValue)}
          />
        )}
        <FieldGroup
          name="nombre_proyecto"
          label="Nombre del Proyecto"
          tooltipHelp="Indica el nombre del proyecto."
        />
      </div>

      <div className="form-row">
        <CustomSelectField
          name="region"
          label="Región"
          options={Object.keys(municipiosPorRegion).map((region) => ({
            value: region,
            label: region,
          }))}
          isMulti
          placeholder="Seleccione una o más regiones"
          tooltipHelp="Selecciona la(s) región(es) donde se encuentra el proyecto."
          onChange={(selectedOptions) => handleRegionChange(selectedOptions, setFieldValue)}
          isDisabled={entityType === 'Ayuntamiento'}
        />

        <CustomSelectField
          name="municipio"
          label="Municipio"
          options={
            entityType === 'Ayuntamiento'
              ? (values.municipio ? [{ value: values.municipio, label: values.municipio }] : [])
              : getMunicipiosOptions()
          }
          placeholder="Seleccione uno o más municipios"
          tooltipHelp="Selecciona el/los municipio(s) correspondientes a la(s) región(es) seleccionada(s)."
          isDisabled={entityType === 'Ayuntamiento' || (!selectedRegion || selectedRegion.length === 0)}
          isMulti={entityType !== 'Ayuntamiento'}
        />

        <FieldGroup
          name="localidad"
          label="Localidad"
          tooltipHelp="Ingresa la localidad donde se llevará a cabo el proyecto. Máximo 250 caracteres."
          type="text"
          maxLength="250"
          placeholder="Localidad (máximo 250 caracteres)"
        />

        <FieldGroup
          name="barrio_colonia"
          label="Barrio/Colonia"
          tooltipHelp="Ingresa el barrio o colonia relacionado al proyecto. Máximo 250 caracteres."
          type="text"
          maxLength="250"
          placeholder="Barrio/Colonia (máximo 250 caracteres)"
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="latitud"
          label="Latitud"
          tooltipHelp="Ingresa la latitud geográfica del proyecto. Debe ser un valor numérico."
          type="number"
          step="any"
          placeholder="Latitud (ej. 20.1234)"
        />

        <FieldGroup
          name="longitud"
          label="Longitud"
          tooltipHelp="Ingresa la longitud geográfica del proyecto. Debe ser un valor numérico."
          type="number"
          step="any"
          placeholder="Longitud (ej. -99.5678)"
        />
        <CustomSelectField
          name="tipo_localidad"
          label="Tipo de Localidad"
          options={tipoLocalidadOptions}
          placeholder="Selecciona una opción"
          tooltipHelp="Ingresa el tipo de localidad(es) según corresponda"
        />
      </div>

      {/* Estructura Presupuestal */}
      <SectionTitle title="Estructura Presupuestal" />
      <div className="form-row">
        <CustomSelectField
          name="sector"
          label="Sector"
          options={sectorOptions.map(opt => ({ value: opt.value, label: opt.label }))}
          placeholder="Selecciona una opción"
          tooltipHelp="Selecciona el sector correspondiente."
          onChange={(option) => {
            setFieldValue('sector', option.value);
            const tipo_proyecto = tipoProyectoOptions[option.value] || '';
            setFieldValue('tipo_proyecto', tipo_proyecto);
          }}
        />
        <FieldGroup
          name="tipo_proyecto"
          label="Tipo de Proyecto"
          tooltipHelp="Este campo se llena automáticamente en base al sector seleccionado."
          readOnly
        />
      </div>

      <div className="form-row">
        <CustomSelectField
          name="unidad_responsable"
          label="Unidad Responsable"
          options={unidadesResponsables.map(unidad => ({ value: unidad, label: unidad }))}
          placeholder="Selecciona una opción"
          tooltipHelp="Selecciona la unidad responsable del proyecto."
          onChange={(option) => {
            setFieldValue('unidad_responsable', option.value);
            setSelectedUnidadResponsable(option.value);
            setFieldValue('unidad_presupuestal', ''); // Resetea el campo unidad_presupuestal al cambiar la unidad_responsable
          }}
        />

        {selectedUnidadResponsable && (
          <CustomSelectField
            name="unidad_presupuestal"
            label="Unidad Presupuestal"
            options={unidadPresupuestalPorUnidadResponsable[selectedUnidadResponsable]?.map(unidad => ({ value: unidad, label: unidad })) || []}
            placeholder="Selecciona una opción"
            tooltipHelp="Selecciona la unidad presupuestal correspondiente."
            isDisabled={!selectedUnidadResponsable}
          />
        )}
        <CustomSelectFieldGrouped
          name="ramo_presupuestal"
          label="Ramo Presupuestal"
          options={ramoPresupuestalOptions}
          placeholder="Seleccione una opción"
          tooltipHelp="Selecciona el ramo presupuestal correspondiente."
        // note="Este campo es requerido para el registro del proyecto."
        />
      </div>

      {/* Datos Financieros */}
      <SectionTitle title="Fuentes de Financiamiento" />
      <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
      <div className="form-row">
        <FieldGroup
          name="inversion_federal"
          label="Inversión Federal"
          type="number"
          tooltipHelp="Indica la inversión de financiamiento federal."
          onChange={(e) => {
            const federalValue = e.target.value;
            setFieldValue('inversion_federal', federalValue);
            const total = calculateTotalInvestment(federalValue, values.inversion_estatal, values.inversion_municipal, values.inversion_otros);
            setFieldValue('inversion_total', total);
          }}
        />
        <FieldGroup
          name="inversion_estatal"
          label="Inversión Estatal"
          type="number"
          tooltipHelp="Indica la inversión de financiamiento estatal."
          onChange={(e) => {
            const estatalValue = e.target.value;
            setFieldValue('inversion_estatal', estatalValue);
            const total = calculateTotalInvestment(values.inversion_federal, estatalValue, values.inversion_municipal, values.inversion_otros);
            setFieldValue('inversion_total', total);
          }}
        />
        <FieldGroup
          name="inversion_municipal"
          label="Inversión Municipal"
          type="number"
          tooltipHelp="Indica la inversión de financiamiento municipal."
          onChange={(e) => {
            const municipalValue = e.target.value;
            setFieldValue('inversion_municipal', municipalValue);
            const total = calculateTotalInvestment(values.inversion_federal, values.inversion_estatal, municipalValue, values.inversion_otros);
            setFieldValue('inversion_total', total);
          }}
        />
        <FieldGroup
          name="inversion_otros"
          label="Otras Inversiones"
          type="number"
          tooltipHelp="Indica cualquier otro tipo de financiamiento."
          onChange={(e) => {
            const otrosValue = e.target.value;
            setFieldValue('inversion_otros', otrosValue);
            const total = calculateTotalInvestment(values.inversion_federal, values.inversion_estatal, values.inversion_municipal, otrosValue);
            setFieldValue('inversion_total', total);
          }}
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="inversion_total"
          label="Inversión Total"
          tooltipHelp="Este campo se calcula automáticamente sumando las fuentes de financiamiento."
          readOnly
        />
      </div>

      <SectionTitle title="Resumen del Proyecto" />
      <div className="form-row">
        <FieldGroup
          name="descripcion"
          label="Descripción"
          as="textarea"
          maxLength="1000"
          tooltipHelp="Describe el proyecto. Máximo 1000 caracteres."
          note="Máximo 1000 caracteres."
        />
      </div>
      <div className="form-row">
        <FieldGroup
          name="situacion_sin_proyecto"
          label="Situación Sin Proyecto"
          as="textarea"
          maxLength="1000"
          tooltipHelp="Describe la situación actual sin el proyecto. Máximo 1000 caracteres."
          note="Máximo 1000 caracteres."
        />
      </div>
      <div className="form-row">
        <FieldGroup
          name="objetivos"
          label="Objetivos"
          as="textarea"
          maxLength="500"
          tooltipHelp="Describe los objetivos del proyecto. Máximo 500 caracteres."
          note="Máximo 500 caracteres."
        />
        <FieldGroup
          name="metas"
          label="Metas Fisicas"
          as="textarea"
          maxLength="500"
          tooltipHelp="Indica las metas del proyecto. Máximo 500 caracteres."
          note="Máximo 500 caracteres."
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="tiempo_ejecucion"
          label="Tiempo Ejecución"
          type="number"
          tooltipHelp="Ingresa el tiempo estimado en meses que tomará la obra, incluyendo ejecución y entrega."
          note="Tiempo estimado en meses."
        />

        <CustomSelectField
          name="modalidad_ejecucion"
          label="Modalidad Ejecución"
          options={modalidadEjecucionOptions}
          placeholder="Selecciona una opción"
          tooltipHelp="Ingresa el tiempo estimado en meses que tomará la obra, incluyendo ejecución y entrega."
          note="Tiempo estimado en meses."
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="beneficiarios"
          label="Número de Beneficiarios"
          type="number"
          tooltipHelp="Indica el número de beneficiarios del proyecto."
        />
        <CustomSelectField
          name="gasto_programable"
          label="Gasto Programable"
          options={Object.keys(programaPresupuestarioOptions).map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona una opción"
          tooltipHelp="Selecciona el gasto programable."
          onChange={(option) => {
            setFieldValue('gasto_programable', option.value);
            setSelectedProgramaPresupuestario(option.value);
          }}
        />
        {selectedProgramaPresupuestario && (
          selectedProgramaPresupuestario === "23.Municipios" ? (
            // Campo de texto libre
            <FieldGroup
              name="programa_presupuestario"
              label="Programa Presupuestario"
              type="text"
              placeholder="Ingresa el programa presupuestario"
              tooltipHelp="Ingresa el programa presupuestario de forma libre"
            />
          ) : (
            // Campo select con opciones predeterminadas
            <CustomSelectField
              name="programa_presupuestario"
              label="Programa Presupuestario"
              options={programaPresupuestarioOptions[selectedProgramaPresupuestario] ? programaPresupuestarioOptions[selectedProgramaPresupuestario].map(opt => ({ value: opt, label: opt })) : []}
              placeholder="Selecciona una opción"
              tooltipHelp="Selecciona el programa presupuestario."
              isDisabled={!selectedProgramaPresupuestario}
              // options={programaPresupuestarioOptions[selectedProgramaPresupuestario]?.map(opt => ({ value: opt, label: opt })) || []}
              // placeholder="Selecciona una opción"
              // tooltipHelp="Selecciona el programa presupuestario."
              // isDisabled={!selectedProgramaPresupuestario}
            />
          )
        )}
      </div>

      <div className="form-row">
        <FieldGroup
          name="normativa_aplicable"
          label="Normativa Aplicable Vigente"
          as="textarea"
          maxLength="1500"
          tooltipHelp="Describe la normativa aplicable vigente. Máximo 1500 caracteres."
          note="Máximo 1500 caracteres."
        />
      </div>

      {/* Sección de Alineación Estratégica */}
      <SectionTitle title="Alineación Estratégica" />
      <div className="form-row">
        <CustomSelectField
          name="plan_nacional"
          label="Plan Nacional de Desarrollo"
          options={planNacionalOptions.map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona el plan nacional"
          tooltipHelp="Selecciona el plan nacional de desarrollo al que se alinea el proyecto."
        />

        <CustomSelectField
          name="plan_estatal"
          label="Plan Estatal de Desarrollo"
          options={planEstatalOptions}
          placeholder="Selecciona el plan estatal"
          tooltipHelp="Selecciona el plan estatal de desarrollo al que se alinea el proyecto."
          onChange={(option) => handlePlanEstatalChange(option, setFieldValue)}
        />
      </div>

      {entityType === 'Ayuntamiento' ? (
        <FieldGroup
          name="plan_municipal"
          label="Plan Municipal"
          tooltipHelp="Ingresa el plan municipal de desarrollo."
          as="textarea"
          maxLength="500"
          placeholder="Máximo 500 caracteres"
        />
      ) : (
        <Field
          type="hidden"
          name="plan_municipal"
          value="No Aplica"
        />
      )}

      <div className="form-row">
        <CustomSelectField
          name="ods"
          label="Objetivos de Desarrollo Sostenible (ODS)"
          options={odsOptions.map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona un objetivo de desarrollo sostenible"
          tooltipHelp="Selecciona los ODS al que se alinea el proyecto."
        />
        <CustomSelectField
          name="acuerdos_transversales"
          label="Acuerdos Transversales"
          options={acuerdosTransversalesOptions.map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona un acuerdo transversal"
          tooltipHelp="Selecciona los acuerdos transversales relacionados con el proyecto."
        />
      </div>

      {entityType !== 'Ayuntamiento' && (
        <div className="form-row">
          <FieldGroup
            name="programas_SIE"
            label="Programas Sectoriales-Institucionales-Especiales"
            tooltipHelp="Este campo se llena automáticamente en base al tipo de entidad seleccionado."
            readOnly
            value={values.programas_SIE}
          />
        </div>
      )}

      <SectionTitle title="Mecanismos de Evaluación y Seguimiento a Proyectos " />
      <div className="form-row">
        <CustomSelectField
          name="indicadores_estrategicos"
          label="Indicadores Estratégicos"
          options={getIndicadoresEstrategicosOptions()}
          placeholder="Selecciona un indicador estratégico"
          tooltipHelp="Selecciona el indicador estratégico correspondiente al plan estatal seleccionado."
          isDisabled={!selectedPlanEstatal}
          onChange={(option) => setFieldValue('indicadores_estrategicos', option.value)}
        />
        <CustomSelectField
          name="indicadores_socioeconomicos"
          label="Indicadores Socioeconomicos"
          options={aplicaOptions}
          placeholder="Selecciona una opción"
          tooltipHelp="Elige Si en caso de aplicar en caso contrario elegir No"
        />
      </div>

      {/* Registro del Responsable del Proyecto */}
      <SectionTitle title="Registro del Responsable del Proyecto" />
      <div className="form-row">
        <FieldGroup name="area_adscripcion" label="Área de Adscripción" type="text" tooltipHelp="Proporciona el área de adscripción del responsable del registro." />
      </div>
      <div className="form-row">
        <FieldGroup name="nombre_registrante" label="Nombre(s) de quien registra" type="text" tooltipHelp="Proporciona tu nombre como responsable de este registro." />
        <FieldGroup name="apellido_paterno" label="Apellido Paterno" type="text" tooltipHelp="Indica tu apellido paterno." />
        <FieldGroup name="apellido_materno" label="Apellido Materno" type="text" tooltipHelp="Indica tu apellido materno." />
      </div>
      <div className="form-row">
        <FieldGroup name="correo" label="Correo" type="email" tooltipHelp="Proporciona tu correo electrónic dando prioridad al institucional en caso de no contar con uno agregar el personal." />
        <FieldGroup name="telefono" label="Teléfono"
          type="text" note="Debe ser un número de 10 dígitos" maxLength={10} tooltipHelp="Ingresa un número de teléfono válido de 10 dígitos." onChange={handleNumericInput('telefono', setFieldValue)} />
        <FieldGroup name="telefono_ext" label="Extensión (No es Obligatorio)" type="text" maxLength={10} tooltipHelp="Proporciona la extensión telefónica, si aplica." onChange={handleNumericInput('telefono_ext', setFieldValue)} />
      </div>

      {/* Documentación */}
      <SectionTitle title="Anexos del proyecto" />
      <DocumentUploadSection applies={applies} handleApplyChange={handleApplyChange} values={values} setFieldValue={setFieldValue} />

      {/* Observaciones y Comentarios */}
      <SectionTitle title="Observaciones y Comentarios" />
      <div className="form-row">
        <FieldGroup
          name="observaciones"
          label="Observaciones"
          as="textarea"
          maxLength="1000"
          tooltipHelp="Agrega información o aclaraciones importantes para complementar este registro. Máximo 1000 caracteres."
          note="Máximo 1000 caracteres."
        />
      </div>
      <button type="submit" disabled={isSubmitting} onClick={() => console.log('El botón de enviar fue clicado.')}>
        Enviar
      </button>
    </Form>
  );
};
/// Componente FieldGroup para simplificar la creación de campos, ahora con soporte para Tooltip y notas
const FieldGroup = ({ label, name, note, tooltipHelp, children, ...props }) => (
  <div className="form-group">
    <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      {tooltipHelp && (
        <div className="tooltip-icon-container">
          <div className="tooltip-icon-support">
            <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
            <TooltipHelp id={`${name}-tooltip`} text={tooltipHelp} />
          </div>
        </div>
      )}
    </label>
    {/* Si el campo tiene hijos (por ejemplo, un componente personalizado), los renderiza */}
    {children ? children : <Field id={name} name={name} {...props} />}
    {note && <p className="field-note">{note}</p>}
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

// Componente CustomSelectField modificado para integrar React Select con Formik y mostrar tooltip
const CustomSelectField = ({ label, options, name, placeholder, isDisabled = false, tooltipHelp = '', isMulti = false, onChange }) => {
  const [field, , helpers] = useField(name);

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

  const selectedOption = options ? (isMulti ? options.filter(option => field.value.includes(option.value)) : options.find(option => option.value === field.value)) : '';

  return (
    <div className="form-group" style={{ borderRadius: '15px' }}>
      <label htmlFor={name} style={{ display: 'flex', alignItems: 'center' }}>
        {label}
        {tooltipHelp && (
          <div className="tooltip-icon-container">
            <div className="tooltip-icon-support">
              <ContactSupportIcon style={{ marginLeft: '5px', cursor: 'pointer', color: 'var(--doradoOsc)' }} />
              <TooltipHelp id={`${name}-tooltip`} text={tooltipHelp} />
            </div>
          </div>
        )}
      </label>
      <Select
        className="form-select"
        id={name}
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

// Implementación del Select con optgroup
const CustomSelectFieldGrouped = ({ label, options, name, placeholder, isDisabled = false, tooltipHelp = '', onChange, note }) => {
  const [field, , helpers] = useField(name);

  const handleChange = (selectedOption) => {
    helpers.setValue(selectedOption ? selectedOption.value : '');
    if (onChange) {
      onChange(selectedOption);
    }
  };

  const selectedOption = options?.find(opt =>
    opt.options.some(option => option.value === field.value)
  )?.options.find(option => option.value === field.value);

  return (
    <FieldGroup
      label={label}
      name={name}
      note={note}
      tooltipHelp={tooltipHelp}
    >
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        isDisabled={isDisabled}
        placeholder={placeholder}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          control: (base) => ({ ...base, borderRadius: '15px' }),
        }}
      />
    </FieldGroup>
  );
};
export default Formulario;
