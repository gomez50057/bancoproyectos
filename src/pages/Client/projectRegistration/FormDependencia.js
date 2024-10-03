import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import Select from 'react-select';
import validationSchemaStep2 from './validationSchemaStep2';
import { municipiosDeHidalgo, unidadesResponsables, dependencias, organismos, municipiosPorRegion, unidadPresupuestalPorUnidadResponsable, gastoProgramableOptions, programaPresupuestarioOptions, indicadoresEstrategicosOptions, indicadoresTacticosOptions, sectorOptions, tipoProyectoOptions, programasSectorialesOptions } from '../../../utils';
import SectionTitle from '../componentsForm/SectionTitle';
import ProjectCreationModal from '../componentsForm/ProjectCreationModal';
import DocumentUploadSection from '../componentsForm/DocumentUploadSection';
import TooltipHelp from '../componentsForm/TooltipHelp';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const imgBasePath = "https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/";

const FormDependencia = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [entityType, setEntityType] = useState(''); // Estado para determinar el tipo de entidad

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const csrfToken = Cookies.get('csrftoken');
      const response = await axios.post('guardar-proyecto/', values, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      const projectId = response.data.project_id;
      setGeneratedId(projectId);
      setModalIsOpen(true);

      resetForm();
      setSubmitting(false);
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    window.location.href = '/';
  };

  return (
    <div className="formulario-container">
      <Formik
        initialValues={{
          projectName: '',
          tipoEntidad: '',  // Nuevo campo para el tipo de entidad
          dependencia: '',
          organismo: '',
          municipio: '',
          sector: '',
          tipoProyecto: '',
          PeticionPersonal: '',
          unidadResponsable: '',
          unidadPresupuestal: '',
          montoFederal: '0',
          montoEstatal: '0',
          montoMunicipal: '0',
          montoOtros: '0',
          inversionEstimada: '0',
          descripcion: '',
          situacionSinProyecto: '',
          objetivos: '',
          metas: '',
          gastoProgramable: '',
          programaPresupuestario: '',
          beneficiarios: '',
          alineacionNormativa: '',
          region: '',
          latitud: '',
          longitud: '',
          planNacional: '',
          planEstatal: '',
          ods: '',
          planSectorial: '',
          indicadoresEstrategicos: '',
          indicadoresTacticos: '',
        }}
        validationSchema={validationSchemaStep2}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            {/* Registro del Responsable del Proyecto */}
            <SectionTitle title="Registro del Responsable del Proyecto" />
            <div className="form-row">
              <FieldGroup
                name="projectName"
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
                  const tipoProyecto = tipoProyectoOptions[option.value] || '';
                  setFieldValue('tipoProyecto', tipoProyecto);
                }}
              />
              <FieldGroup
                name="tipoProyecto"
                label="Tipo de Proyecto"
                tooltipText="Este campo se llena automáticamente en base al sector seleccionado."
                readOnly
              />
            </div>

            <div className="form-row">

              <CustomSelectField
                name="tipoEntidad"
                label="Tipo de Entidad"
                options={[
                  { value: 'Dependencia', label: 'Dependencia' },
                  { value: 'Organismo', label: 'Organismo' },
                  { value: 'Municipio', label: 'Municipio' },
                ]}
                placeholder="Selecciona una opción"
                tooltipText="Selecciona el tipo de entidad para el proyecto."
                onChange={(option) => {
                  setFieldValue('tipoEntidad', option.value);
                  setEntityType(option.value);  // Actualiza el estado de entityType
                }}
              />

              {entityType === 'Dependencia' && (
                <CustomSelectField
                  name="dependencia"
                  label="Dependencia"
                  options={dependencias.map(dep => ({ value: dep, label: dep }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Selecciona la dependencia que gestiona el proyecto."
                  onChange={(option) => setFieldValue('dependencia', option.value)}
                />
              )}

              {entityType === 'Organismo' && (
                <CustomSelectField
                  name="organismo"
                  label="Organismo"
                  options={organismos.map(org => ({ value: org, label: org }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Selecciona el organismo encargado del proyecto."
                  onChange={(option) => setFieldValue('organismo', option.value)}
                />
              )}

              {entityType === 'Municipio' && (
                <CustomSelectField
                  name="municipio"
                  label="Municipio"
                  options={municipiosDeHidalgo.map(mun => ({ value: mun, label: mun }))}
                  placeholder="Selecciona una opción"
                  tooltipText="Selecciona el municipio que gestionará el proyecto."
                  onChange={(option) => setFieldValue('municipio', option.value)}
                />
              )}
            </div>

            {/* Datos Financieros */}

            <SectionTitle title="Fuentes de Financiamiento" />
            <div className="form-row">
              <FieldGroup
                name="montoFederal"
                label="Monto Federal"
                type="number"
                tooltipText="Indica el monto de financiamiento federal."
                onChange={(e) => {
                  setFieldValue('montoFederal', e.target.value);
                  const total = parseFloat(values.montoFederal || 0) + parseFloat(values.montoEstatal || 0) + parseFloat(values.montoMunicipal || 0) + parseFloat(values.montoOtros || 0);
                  setFieldValue('inversionEstimada', total.toFixed(2));
                }}
              />
              <FieldGroup
                name="montoEstatal"
                label="Monto Estatal"
                type="number"
                tooltipText="Indica el monto de financiamiento estatal."
                onChange={(e) => {
                  setFieldValue('montoEstatal', e.target.value);
                  const total = parseFloat(values.montoFederal || 0) + parseFloat(values.montoEstatal || 0) + parseFloat(values.montoMunicipal || 0) + parseFloat(values.montoOtros || 0);
                  setFieldValue('inversionEstimada', total.toFixed(2));
                }}
              />
              <FieldGroup
                name="montoMunicipal"
                label="Monto Municipal"
                type="number"
                tooltipText="Indica el monto de financiamiento municipal."
                onChange={(e) => {
                  setFieldValue('montoMunicipal', e.target.value);
                  const total = parseFloat(values.montoFederal || 0) + parseFloat(values.montoEstatal || 0) + parseFloat(values.montoMunicipal || 0) + parseFloat(values.montoOtros || 0);
                  setFieldValue('inversionEstimada', total.toFixed(2));
                }}
              />
              <FieldGroup
                name="montoOtros"
                label="Otros Montos"
                type="number"
                tooltipText="Indica cualquier otro tipo de financiamiento."
                onChange={(e) => {
                  setFieldValue('montoOtros', e.target.value);
                  const total = parseFloat(values.montoFederal || 0) + parseFloat(values.montoEstatal || 0) + parseFloat(values.montoMunicipal || 0) + parseFloat(values.montoOtros || 0);
                  setFieldValue('inversionEstimada', total.toFixed(2));
                }}
              />
            </div>

            <div className="form-row">
              <FieldGroup
                name="inversionEstimada"
                label="Inversión Estimada"
                tooltipText="Este campo se calcula automáticamente sumando las fuentes de financiamiento."
                readOnly
              />
            </div>

            {/* Ubicación del Proyecto */}
            <SectionTitle title="Ubicación del Proyecto" />
            <CustomSelectField
              name="region"
              label="Región"
              options={Object.keys(municipiosPorRegion).map(region => ({ value: region, label: region }))}
              placeholder="Selecciona una opción"
              tooltipText="Selecciona la región donde se ubica el proyecto."
              onChange={(option) => {
                setFieldValue('region', option.value);
                setFieldValue('municipio', '');
              }}
            />
            <CustomSelectField
              name="municipio"
              label="Municipio"
              options={municipiosPorRegion[values.region]?.map(mun => ({ value: mun, label: mun })) || []}
              placeholder="Selecciona una opción"
              tooltipText="Selecciona el municipio donde se desarrollará el proyecto."
              isDisabled={!values.region}
            />

            {/* Alineación Estratégica */}
            <SectionTitle title="Alineación Estratégica" />
            <CustomSelectField
              name="planNacional"
              label="Plan Nacional de Desarrollo"
              options={[
                { value: 'Justicia', label: 'Justicia y Estado de derecho' },
                { value: 'Bienestar', label: 'Bienestar' },
              ]}
              placeholder="Selecciona una opción"
              tooltipText="Selecciona el plan nacional de desarrollo aplicable."
            />
            <CustomSelectField
              name="planEstatal"
              label="Plan Estatal de Desarrollo"
              options={[
                { value: 'Acuerdo 1', label: 'Acuerdo para un Gobierno Cercano, Justo y Honesto' },
                { value: 'Acuerdo 2', label: 'Acuerdo para el Bienestar del Pueblo' },
              ]}
              placeholder="Selecciona una opción"
              tooltipText="Selecciona el plan estatal de desarrollo aplicable."
            />
            <CustomSelectField
              name="ods"
              label="Objetivos de Desarrollo Sostenible"
              options={Object.keys(programasSectorialesOptions).map(opt => ({ value: opt, label: opt }))}
              placeholder="Selecciona una opción"
              tooltipText="Selecciona los objetivos de desarrollo sostenible aplicables."
            />

            {/* Otros Datos */}
            <SectionTitle title="Indicadores" />
            <CustomSelectField
              name="indicadoresEstrategicos"
              label="Indicadores Estratégicos"
              options={indicadoresEstrategicosOptions[values.planEstatal]?.map(ind => ({ value: ind, label: ind })) || []}
              placeholder="Selecciona una opción"
              isDisabled={!values.planEstatal}
              tooltipText="Selecciona los indicadores estratégicos aplicables."
            />
            <FieldGroup
              name="objetivos"
              label="Objetivos"
              as="textarea"
              maxLength="500"
              tooltipText="Describe los objetivos del proyecto."
            />

            {/* Documentación */}
            <SectionTitle title="Documentación" />
            <DocumentUploadSection applies={{}} values={values} setFieldValue={setFieldValue} />

            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>

      <ProjectCreationModal isOpen={modalIsOpen} onRequestClose={closeModal} projectId={generatedId} />
    </div>
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

export default FormDependencia;
