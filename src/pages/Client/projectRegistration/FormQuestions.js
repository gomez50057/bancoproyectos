import React, { useState } from 'react';
import { Form, Field, ErrorMessage, useField } from 'formik';
import Select from 'react-select';
import { municipiosDeHidalgo, unidadesResponsables, dependencias, organismos, ramoPresupuestalOptions, municipiosPorRegion, unidadPresupuestalPorUnidadResponsable, programaPresupuestarioOptions, indicadoresEstrategicosOptions, indicadoresTacticosOptions, sectorOptions, tipoProyectoOptions, programasSectorialesOptions, planNacionalOptions, acuerdosTransversalesOptions, odsOptions } from '../../../utils';
import SectionTitle from '../componentsForm/SectionTitle';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import TooltipHelp from '../componentsForm/TooltipHelp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const handleNumericInput = (fieldName, setFieldValue) => (e) => {
  const { value } = e.target;
  const onlyNums = value.replace(/[^0-9]/g, '');
  setFieldValue(fieldName, onlyNums);
};

const Formulario = ({ setFieldValue, values, isSubmitting }) => {
  const [entityType, setEntityType] = useState('');
  const [selectedUnidadResponsable, setSelectedUnidadResponsable] = useState('');
  const [selectedProgramaPresupuestario, setSelectedProgramaPresupuestario] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedPlanEstatal, setSelectedPlanEstatal] = useState('');

  const handleMunicipiosImpactoChange = (selectedOptions, setFieldValue) => {
    if (selectedOptions.some((option) => option.value === 'No Aplica')) {
      setFieldValue('municipio_impacto', [{ value: 'No Aplica', label: 'No Aplica' }]);
    } else {
      setFieldValue('municipio_impacto', selectedOptions);
    }
  };

  const municipiosOptions = [{ value: 'No Aplica', label: 'No Aplica' }, ...municipiosDeHidalgo.map((mun) => ({ value: mun, label: mun }))];

  const getProgramasSIEValue = (tipo_entidad, dependencia, organismo) => {
    if (tipo_entidad === 'Municipio') {
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

    if (tipo_entidad === 'Municipio') {
      // Si seleccionamos Municipio, los otros campos se marcan como "No Aplica"
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

  const getIndicadoresTacticosOptions = (tipo_entidad, dependencia) => {
    if (tipo_entidad === 'Dependencia' && dependencia !== 'Secretaría del Despacho del Gobernador') {
      const opciones = indicadoresTacticosOptions[dependencia] || [];
      // Retorna las opciones si existen, si no, devuelve "No Aplica"
      return opciones.length > 0
        ? opciones.map((opcion) => ({ value: opcion, label: opcion }))
        : [{ value: 'No Aplica', label: 'No Aplica' }];
    }
    return [{ value: 'No Aplica', label: 'No Aplica' }];
  };

  return (
    <Form>
      {/* Registro del Responsable del Proyecto */}
      <SectionTitle title="Registro del Responsable del Proyecto" />
      <div className="form-row">
        <FieldGroup name="area_adscripcion" label="Área de Adscripción" type="text" tooltipText="Proporciona el área de adscripción del responsable del registro." />
      </div>
      <div className="form-row">
        <FieldGroup name="nombre_registrante" label="Nombre(s) de quien registra" type="text" tooltipText="Proporciona tu nombre como responsable de este registro." />
        <FieldGroup name="apellido_paterno" label="Apellido Paterno" type="text" tooltipText="Indica tu apellido paterno." />
        <FieldGroup name="apellido_materno" label="Apellido Materno" type="text" tooltipText="Indica tu apellido materno." />
      </div>
      <div className="form-row">
        <FieldGroup name="correo" label="Correo" type="email" tooltipText="Proporciona tu correo electrónic dando prioridad al institucional en caso de no contar con uno agregar el personal." />
        <FieldGroup name="telefono" label="Teléfono"
          type="text" note="Debe ser un número de 10 dígitos" maxLength={10} tooltipText="Ingresa un número de teléfono válido de 10 dígitos." onChange={handleNumericInput('telefono', setFieldValue)} />
        <FieldGroup name="telefono_ext" label="Extensión (No es Obligatorio)" type="text" maxLength={10} tooltipText="Proporciona la extensión telefónica, si aplica." onChange={handleNumericInput('extension', setFieldValue)} />
      </div>

      {/* Datos Generales del Proyecto */}
      <SectionTitle title="Datos Generales del Proyecto" />
      <div className="form-row">
        <FieldGroup name="fecha_registro" label="Fecha de Registro" type="date" value={values.fecha_registro} tooltipText="Esta es la fecha en que estás registrando el proyecto y se agrega de manera automática tomando el dato del día en que se elabora." readOnly />
      </div>
      <div className="form-row">
        <FieldGroup
          name="nombre_proyecto"
          label="Nombre del Proyecto"
          tooltipText="Indica el nombre del proyecto."
        />
        <CustomSelectField
          name="sector"
          label="Sector"
          options={sectorOptions.map(opt => ({ value: opt.value, label: opt.label }))}
          placeholder="Selecciona una opción"
          tooltipText="Selecciona el sector correspondiente."
          onChange={(option) => {
            setFieldValue('sector', option.value);
            const tipo_proyecto = tipoProyectoOptions[option.value] || '';
            setFieldValue('tipo_proyecto', tipo_proyecto);
          }}
        />
        <FieldGroup
          name="tipo_proyecto"
          label="Tipo de Proyecto"
          tooltipText="Este campo se llena automáticamente en base al sector seleccionado."
          readOnly
        />
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
          tooltipText="Selecciona el tipo de entidad para el proyecto."
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
            tooltipText="Selecciona la dependencia que gestiona el proyecto."
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
            tooltipText="Selecciona el organismo encargado del proyecto."
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
            tooltipText="Selecciona el municipio que gestionará el proyecto."
            onChange={(option) => setFieldValue('municipio_ayuntamiento', option.value)}
          />
        )}
      </div>

      <div className="form-row">
        <CustomSelectField
          name="unidad_responsable"
          label="Unidad Responsable"
          options={unidadesResponsables.map(unidad => ({ value: unidad, label: unidad }))}
          placeholder="Selecciona una opción"
          tooltipText="Selecciona la unidad responsable del proyecto."
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
            tooltipText="Selecciona la unidad presupuestal correspondiente."
            isDisabled={!selectedUnidadResponsable}
          />
        )}
      </div>

      {/* Datos Financieros */}
      <SectionTitle title="Fuentes de Financiamiento" />
      <div className="form-row">
        <FieldGroup
          name="inversion_federal"
          label="Inversión Federal"
          type="number"
          tooltipText="Indica la inversión de financiamiento federal."
          onChange={(e) => {
            setFieldValue('inversion_federal', e.target.value);
            const total = parseFloat(values.inversion_federal || 0) + parseFloat(values.inversion_estatal || 0) + parseFloat(values.inversion_municipal || 0) + parseFloat(values.inversion_otros || 0);
            setFieldValue('inversion_total', total.toFixed(2));
          }}
        />
        <FieldGroup
          name="inversion_estatal"
          label="Inversión Estatal"
          type="number"
          tooltipText="Indica la inversión de financiamiento estatal."
          onChange={(e) => {
            setFieldValue('inversion_estatal', e.target.value);
            const total = parseFloat(values.inversion_federal || 0) + parseFloat(values.inversion_estatal || 0) + parseFloat(values.inversion_municipal || 0) + parseFloat(values.inversion_otros || 0);
            setFieldValue('inversion_total', total.toFixed(2));
          }}
        />
        <FieldGroup
          name="inversion_municipal"
          label="Inversión Municipal"
          type="number"
          tooltipText="Indica la inversión de financiamiento municipal."
          onChange={(e) => {
            setFieldValue('inversion_municipal', e.target.value);
            const total = parseFloat(values.inversion_federal || 0) + parseFloat(values.inversion_estatal || 0) + parseFloat(values.inversion_municipal || 0) + parseFloat(values.inversion_otros || 0);
            setFieldValue('inversion_total', total.toFixed(2));
          }}
        />
        <FieldGroup
          name="inversion_otros"
          label="Otras Inversiones"
          type="number"
          tooltipText="Indica cualquier otro tipo de financiamiento."
          onChange={(e) => {
            setFieldValue('inversion_otros', e.target.value);
            const total = parseFloat(values.inversion_federal || 0) + parseFloat(values.inversion_estatal || 0) + parseFloat(values.inversion_municipal || 0) + parseFloat(values.inversion_otros || 0);
            setFieldValue('inversion_total', total.toFixed(2));
          }}
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="inversion_total"
          label="Inversión Total"
          tooltipText="Este campo se calcula automáticamente sumando las fuentes de financiamiento."
          readOnly
        />
        <CustomSelectFieldGrouped
          name="ramo_presupuestal"
          label="Ramo Presupuestal"
          options={ramoPresupuestalOptions}
          placeholder="Seleccione una opción"
          tooltipText="Selecciona el ramo presupuestal correspondiente."
        // note="Este campo es requerido para el registro del proyecto."
        />
      </div>

      <SectionTitle title="Datos del Proyecto" />
      <div className="form-row">
        <FieldGroup
          name="descripcion"
          label="Descripción"
          as="textarea"
          maxLength="1000"
          tooltipText="Describe el proyecto. Máximo 1000 caracteres."
          note="Máximo 1000 caracteres."
        />
      </div>
      <div className="form-row">
        <FieldGroup
          name="situacion_sin_proyecto"
          label="Situación Sin Proyecto"
          as="textarea"
          maxLength="1000"
          tooltipText="Describe la situación actual sin el proyecto. Máximo 1000 caracteres."
          note="Máximo 1000 caracteres."
        />
      </div>
      <div className="form-row">
        <FieldGroup
          name="objetivos"
          label="Objetivos"
          as="textarea"
          maxLength="500"
          tooltipText="Describe los objetivos del proyecto. Máximo 500 caracteres."
          note="Máximo 500 caracteres."
        />
        <FieldGroup
          name="metas"
          label="Metas"
          as="textarea"
          maxLength="500"
          tooltipText="Indica las metas del proyecto. Máximo 500 caracteres."
          note="Máximo 500 caracteres."
        />
      </div>
      <div className="form-row">
        <CustomSelectField
          name="programa_presupuestario"
          label="Programa Presupuestario"
          options={Object.keys(programaPresupuestarioOptions).map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona una opción"
          tooltipText="Selecciona el programa presupuestario."
          onChange={(option) => {
            setFieldValue('programa_presupuestario', option.value);
            setSelectedProgramaPresupuestario(option.value);
          }}
        />
        {selectedProgramaPresupuestario && (
          <CustomSelectField
            name="gasto_programable"
            label="Gasto Programable"
            options={programaPresupuestarioOptions[selectedProgramaPresupuestario]?.map(opt => ({ value: opt, label: opt })) || []}
            placeholder="Selecciona una opción"
            tooltipText="Selecciona el gasto programable."
            isDisabled={!selectedProgramaPresupuestario}
          />
        )}
        <FieldGroup
          name="beneficiarios"
          label="Número de Beneficiarios"
          type="number"
          tooltipText="Indica el número de beneficiarios del proyecto."
        />
      </div>
      <div className="form-row">
        <FieldGroup
          name="normativa_aplicable"
          label="Normativa Aplicable Vigente"
          as="textarea"
          maxLength="1500"
          tooltipText="Describe la normativa aplicable vigente. Máximo 1500 caracteres."
          note="Máximo 1500 caracteres."
        />
      </div>

      <SectionTitle title="Territorio y Georreferenciación" />
      <div className="form-row">
        <CustomSelectField
          name="region"
          label="Región"
          options={Object.keys(municipiosPorRegion).map((region) => ({
            value: region,
            label: region,
          }))}
          placeholder="Seleccione una región"
          tooltipText="Selecciona la región donde se encuentra el proyecto."
          onChange={(option) => {
            setFieldValue('region', option.value);
            setSelectedRegion(option.value);
            setFieldValue('municipio', ''); // Reinicia el campo municipio al seleccionar una nueva región
          }}
        />

        <CustomSelectField
          name="municipio"
          label="Municipio"
          options={municipiosPorRegion[selectedRegion]?.map((mun) => ({
            value: mun,
            label: mun,
          })) || []}
          placeholder="Seleccione un municipio"
          tooltipText="Selecciona el municipio correspondiente a la región seleccionada."
          isDisabled={!selectedRegion}
        />

        <FieldGroup
          name="localidad"
          label="Localidad"
          tooltipText="Ingresa la localidad donde se llevará a cabo el proyecto. Máximo 250 caracteres."
          type="text"
          maxLength="250"
          placeholder="Localidad (máximo 250 caracteres)"
        />

        <FieldGroup
          name="barrio_colonia"
          label="Barrio/Colonia"
          tooltipText="Ingresa el barrio o colonia relacionado al proyecto. Máximo 250 caracteres."
          type="text"
          maxLength="250"
          placeholder="Barrio/Colonia (máximo 250 caracteres)"
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="latitud"
          label="Latitud"
          tooltipText="Ingresa la latitud geográfica del proyecto. Debe ser un valor numérico."
          type="number"
          step="any"
          placeholder="Latitud (ej. 20.1234)"
        />

        <FieldGroup
          name="longitud"
          label="Longitud"
          tooltipText="Ingresa la longitud geográfica del proyecto. Debe ser un valor numérico."
          type="number"
          step="any"
          placeholder="Longitud (ej. -99.5678)"
        />
      </div>

      <div className="form-row">
        <CustomSelectField
          name="municipio_impacto"
          label="Municipios de Impacto"
          options={municipiosOptions}
          isMulti
          placeholder="Seleccione los municipios de impacto"
          tooltipText="Selecciona los municipios donde el proyecto tendrá impacto. Seleccione 'No Aplica' si no corresponde."
          onChange={(selectedOptions) => handleMunicipiosImpactoChange(selectedOptions, setFieldValue)}
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
          tooltipText="Selecciona el plan nacional de desarrollo al que se alinea el proyecto."
        />

        <CustomSelectField
          name="plan_estatal"
          label="Plan Estatal de Desarrollo"
          options={planEstatalOptions}
          placeholder="Selecciona el plan estatal"
          tooltipText="Selecciona el plan estatal de desarrollo al que se alinea el proyecto."
          onChange={(option) => handlePlanEstatalChange(option, setFieldValue)}
        />
      </div>

      {entityType === 'Municipio' ? (
        <FieldGroup
          name="plan_municipal"
          label="Plan Municipal"
          tooltipText="Ingresa el plan municipal de desarrollo."
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
          name="acuerdos_transversales"
          label="Acuerdos Transversales"
          options={acuerdosTransversalesOptions.map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona un acuerdo transversal"
          tooltipText="Selecciona los acuerdos transversales relacionados con el proyecto."
        />

        <CustomSelectField
          name="ods"
          label="Objetivos de Desarrollo Sostenible (ODS)"
          options={odsOptions.map(opt => ({ value: opt, label: opt }))}
          placeholder="Selecciona un objetivo de desarrollo sostenible"
          tooltipText="Selecciona los ODS al que se alinea el proyecto."
        />
      </div>

      <div className="form-row">
        <FieldGroup
          name="programas_SIE"
          label="Programas Sectoriales-Institucionales-Especiales"
          tooltipText="Este campo se llena automáticamente en base al tipo de entidad seleccionado."
          readOnly
          value={values.programas_SIE}
        />
      </div>

      <SectionTitle title="Mecanismos de Evaluación y Seguimiento a Proyectos " />
      <div className="form-row">
        <CustomSelectField
          name="indicadores_estrategicos"
          label="Indicadores Estratégicos"
          options={getIndicadoresEstrategicosOptions()}
          placeholder="Selecciona un indicador estratégico"
          tooltipText="Selecciona el indicador estratégico correspondiente al plan estatal seleccionado."
          isDisabled={!selectedPlanEstatal}
          onChange={(option) => setFieldValue('indicadores_estrategicos', option.value)}
        />

        <CustomSelectField
          name="indicadores_tacticos"
          label="Indicadores Tácticos"
          options={getIndicadoresTacticosOptions(entityType, values.dependencia)}
          placeholder="Selecciona un indicador táctico"
          tooltipText="Selecciona los indicadores tácticos correspondientes o 'No Aplica' si no aplica."
        />
      </div>

      {/* Documentación */}
      <SectionTitle title="Anexos del proyecto" />
      <DocumentUploadSection applies={{}} values={values} setFieldValue={setFieldValue} />

      {/* Observaciones y Comentarios */}
      <SectionTitle title="Observaciones y Comentarios" />
      <div className="form-row">
        <FieldGroup
          name="observaciones"
          label="Observaciones"
          as="textarea"
          maxLength="1000"
          tooltipText="Agrega información o aclaraciones importantes para complementar este registro. Máximo 1000 caracteres."
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
const FieldGroup = ({ label, name, note, tooltipText, children, ...props }) => (
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
    {/* Si el campo tiene hijos (por ejemplo, un componente personalizado), los renderiza */}
    {children ? children : <Field id={name} name={name} {...props} />}
    {note && <p className="field-note">{note}</p>}
    <ErrorMessage name={name} component="div" className="error" />
  </div>
);

// Componente CustomSelectField modificado para integrar React Select con Formik y mostrar tooltip
const CustomSelectField = ({ label, options, name, placeholder, isDisabled = false, tooltipText = '', isMulti = false, onChange }) => {
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
const CustomSelectFieldGrouped = ({ label, options, name, placeholder, isDisabled = false, tooltipText = '', onChange, note }) => {
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
      tooltipText={tooltipText}
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
