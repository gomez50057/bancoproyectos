import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';

const municipiosDeHidalgo = [
  'Acatlán', 'Acaxochitlán', 'Actopan', 'Agua Blanca de Iturbide', 'Ajacuba', 'Alfajayucan', 'Almoloya', 'Apan',
  'Atitalaquia', 'Atlapexco', 'Atotonilco de Tula', 'Atotonilco el Grande', 'Calnali', 'Cardonal', 'Chapantongo',
  'Chapulhuacán', 'Chilcuautla', 'Cuautepec de Hinojosa', 'El Arenal', 'Eloxochitlán', 'Emiliano Zapata',
  'Epazoyucan', 'Francisco I. Madero', 'Huasca de Ocampo', 'Huautla', 'Huazalingo', 'Huehuetla', 'Huejutla de Reyes',
  'Huichapan', 'Ixmiquilpan', 'Jacala de Ledezma', 'Jaltocán', 'Juárez Hidalgo', 'La Misión', 'Lolotla', 'Metepec',
  'Metztitlán', 'Mineral de la Reforma', 'Mineral del Chico', 'Mineral del Monte', 'Mixquiahuala de Juárez',
  'Molango de Escamilla', 'Nicolás Flores', 'Nopala de Villagrán', 'Omitlán de Juárez', 'San Agustín Metzquititlán',
  'San Agustín Tlaxiaca', 'San Bartolo Tutotepec', 'San Felipe Orizatlán', 'San Salvador', 'Santiago de Anaya',
  'Santiago Tulantepec de Lugo Guerrero', 'Singuilucan', 'Tasquillo', 'Tecozautla', 'Tenango de Doria', 'Tepeapulco',
  'Tepehuacán de Guerrero', 'Tepeji del Río de Ocampo', 'Tepetitlán', 'Tetepango', 'Tezontepec de Aldama', 'Tianguistengo',
  'Tizayuca', 'Tlahuelilpan', 'Tlahuiltepa', 'Tlanalapa', 'Tlanchinol', 'Tlaxcoapan', 'Tolcayuca', 'Tula de Allende',
  'Tulancingo de Bravo', 'Villa de Tezontepec', 'Xochiatipan', 'Xochicoatlán', 'Yahualica', 'Zacualtipán de Ángeles',
  'Zapotlán de Juárez', 'Zempoala', 'Zimapán'
];


const Formulario = () => {
  const [step, setStep] = useState(1);
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

  const validationSchemaStep1 = Yup.object().shape({
    nombreDependencia: Yup.string().required('El nombre de la dependencia es obligatorio'),
    areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
    nombreRegistrante: Yup.string().required('El nombre del registrante es obligatorio'),
    apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
    apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
    correoInstitucional: Yup.string().email('Correo electrónico no válido').required('El correo institucional es obligatorio'),
    telefonoOficina: Yup.string().required('El teléfono de oficina es obligatorio'),
    correoPersonal: Yup.string().email('Correo electrónico no válido').required('El correo personal es obligatorio'),
    telefonoParticular: Yup.string().required('El teléfono particular es obligatorio'),
  });

  const validationSchemaStep2 = Yup.object().shape({
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
    tipoProyecto: Yup.string().required('El tipo de proyecto es obligatorio'),
    dependencia: Yup.string().required('La dependencia es obligatoria'),
    montoFederal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoEstatal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoMunicipal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoOtros: Yup.number().min(0, 'El monto no puede ser negativo').nullable().default('N/A'),
    descripcion: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción es obligatoria'),
    situacionSinProyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La situación sin el proyecto es obligatoria'),
    objetivos: Yup.string().max(500, 'Máximo 500 caracteres').required('Los objetivos son obligatorios'),
    metas: Yup.string().max(500, 'Máximo 500 caracteres').required('Las metas son obligatorias'),
    programaPresupuestario: Yup.string().required('El programa presupuestario es obligatorio'),
    beneficiarios: Yup.number().required('El número de beneficiarios es obligatorio'),
    alineacionNormativa: Yup.string().max(200, 'Máximo 200 caracteres').required('La alineación normativa es obligatoria'),
    region: Yup.string().required('La región es obligatoria'),
    municipio: Yup.string().required('El municipio es obligatorio'),
    localidad: Yup.string().required('La localidad es obligatoria'),
    barrioColoniaEjido: Yup.string().required('El barrio/colonia/ejido es obligatorio'),
    latitud: Yup.number().required('La latitud es obligatoria'),
    longitud: Yup.number().required('La longitud es obligatoria'),
    planNacional: Yup.string().required('El plan nacional de desarrollo es obligatorio'),
    planEstatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
    ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
    planSectorial: Yup.string().required('El plan sectorial institucional es obligatorio'),
  });

  const handleSubmitStep1 = (values, { setSubmitting }) => {
    setStep(2);
    setSubmitting(false);
  };

  const handleSubmitStep2 = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      formData.append('projectName', values.projectName);
      formData.append('tipoProyecto', values.tipoProyecto);
      formData.append('dependencia', values.dependencia);
      formData.append('montoFederal', values.montoFederal || 'N/A');
      formData.append('montoEstatal', values.montoEstatal || 'N/A');
      formData.append('montoMunicipal', values.montoMunicipal || 'N/A');
      formData.append('montoOtros', values.montoOtros || 'N/A');
      formData.append('descripcion', values.descripcion);
      formData.append('situacionSinProyecto', values.situacionSinProyecto);
      formData.append('objetivos', values.objetivos);
      formData.append('metas', values.metas);
      formData.append('programaPresupuestario', values.programaPresupuestario);
      formData.append('beneficiarios', values.beneficiarios);
      formData.append('alineacionNormativa', values.alineacionNormativa);
      formData.append('region', values.region);
      formData.append('municipio', values.municipio);
      formData.append('localidad', values.localidad);
      formData.append('barrioColoniaEjido', values.barrioColoniaEjido);
      formData.append('latitud', values.latitud);
      formData.append('longitud', values.longitud);
      formData.append('planNacional', values.planNacional);
      formData.append('planEstatal', values.planEstatal);
      formData.append('ods', values.ods);
      formData.append('planSectorial', values.planSectorial);

      for (const key in applies) {
        if (applies[key]) {
          for (const file of values[key]) {
            formData.append(key, file);
          }
        }
      }

      const csrfToken = Cookies.get('csrftoken');

      await axios.post('/guardar-proyecto/', formData, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'multipart/form-data'
        }
      });

      resetForm();
      setSubmitting(false);
      alert('Proyecto creado exitosamente');
    } catch (error) {
      console.error('Error al crear el proyecto:', error);
      alert('Ocurrió un error al crear el proyecto. Por favor, inténtalo de nuevo.');
      setSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    return value ? `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : '';
  };

  const calculateTotal = (values) => {
    const { montoFederal, montoEstatal, montoMunicipal, montoOtros } = values;
    const total = (parseFloat(montoFederal) || 0) + (parseFloat(montoEstatal) || 0) + (parseFloat(montoMunicipal) || 0) + (parseFloat(montoOtros) || 0);
    return formatCurrency(total);
  };

  const handleApplyChange = (field) => {
    setApplies((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="formulario-container">
      <h2>Formulario de Proyecto</h2>
      <Formik
        initialValues={{
          nombreDependencia: '',
          areaAdscripcion: '',
          nombreRegistrante: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correoInstitucional: '',
          telefonoOficina: '',
          correoPersonal: '',
          telefonoParticular: '',
        }}
        validationSchema={validationSchemaStep1}
        onSubmit={handleSubmitStep1}
      >
        {({ isSubmitting }) => (
          <Form>
            {step === 1 && (
              <div>
                <div className="form-group nombreDependencia">
                  <label>Nombre de la Dependencia u Organismo</label>
                  <Field type="text" name="nombreDependencia" />
                  <ErrorMessage name="nombreDependencia" component="div" className="error" />
                </div>
                <div className="form-group areaAdscripcion">
                  <label>Área de Adscripción</label>
                  <Field type="text" name="areaAdscripcion" />
                  <ErrorMessage name="areaAdscripcion" component="div" className="error" />
                </div>
                <div className="form-group nombreRegistrante">
                  <label>Nombre(s) de quien registra</label>
                  <Field type="text" name="nombreRegistrante" />
                  <ErrorMessage name="nombreRegistrante" component="div" className="error" />
                </div>
                <div className="form-group apellidoPaterno">
                  <label>Apellido Paterno</label>
                  <Field type="text" name="apellidoPaterno" />
                  <ErrorMessage name="apellidoPaterno" component="div" className="error" />
                </div>
                <div className="form-group apellidoMaterno">
                  <label>Apellido Materno</label>
                  <Field type="text" name="apellidoMaterno" />
                  <ErrorMessage name="apellidoMaterno" component="div" className="error" />
                </div>
                <div className="form-group correoInstitucional">
                  <label>Correo Electrónico Institucional</label>
                  <Field type="email" name="correoInstitucional" />
                  <ErrorMessage name="correoInstitucional" component="div" className="error" />
                </div>
                <div className="form-group telefonoOficina">
                  <label>Teléfono Oficina</label>
                  <Field type="text" name="telefonoOficina" />
                  <ErrorMessage name="telefonoOficina" component="div" className="error" />
                </div>
                <div className="form-group correoPersonal">
                  <label>Correo Electrónico Personal</label>
                  <Field type="email" name="correoPersonal" />
                  <ErrorMessage name="correoPersonal" component="div" className="error" />
                </div>
                <div className="form-group telefonoParticular">
                  <label>Teléfono Particular</label>
                  <Field type="text" name="telefonoParticular" />
                  <ErrorMessage name="telefonoParticular" component="div" className="error" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  Siguiente
                </button>
              </div>
            )}
          </Form>
        )}
      </Formik>

      {step === 2 && (
        <Formik
          initialValues={{
            projectName: '',
            tipoProyecto: '',
            dependencia: '',
            montoFederal: '',
            montoEstatal: '',
            montoMunicipal: '',
            montoOtros: 'N/A',
            descripcion: '',
            situacionSinProyecto: '',
            objetivos: '',
            metas: '',
            programaPresupuestario: '',
            beneficiarios: '',
            alineacionNormativa: '',
            region: '',
            municipio: '',
            localidad: '',
            barrioColoniaEjido: '',
            latitud: '',
            longitud: '',
            planNacional: '',
            planEstatal: '',
            ods: '',
            planSectorial: '',
            estudiosProspectivos: [],
            estudiosFactibilidad: [],
            analisisAlternativas: [],
            validacionNormativa: [],
            liberacionDerechoVia: [],
            situacionSinProyectoFotografico: [],
            situacionConProyectoProyeccion: [],
            analisisCostoBeneficio: [],
            expedienteTecnico: [],
            proyectoEjecutivo: [],
            manifestacionImpactoAmbiental: [],
            otrosEstudios: []
          }}
          validationSchema={validationSchemaStep2}
          onSubmit={handleSubmitStep2}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div>
                <div className="titulosForm">
                  <h3>Datos Generales</h3>
                  <div className="linea_footer"></div>
                </div>

                <div className="DatosGenerales">
                  <div className="form-group projectDate">
                    <label>Fecha de Registro</label>
                    <Field type="text" name="fechaRegistro" value={new Date().toISOString().split('T')[0]} readOnly />
                  </div>
                  <div className="formTwo">
                    <div className="form-group projectName">
                      <label>Nombre del Proyecto</label>
                      <Field type="text" name="projectName" />
                      <ErrorMessage name="projectName" component="div" className="error" />
                    </div>
                    <div className="form-group tipoProyecto">
                      <label>Tipo de Proyecto</label>
                      <Field as="select" name="tipoProyecto">
                        <option value="">Seleccione</option>
                        <option value="Infraestructura Económica">Infraestructura Económica</option>
                        <option value="Infraestructura Social">Infraestructura Social</option>
                        <option value="Infraestructura Gubernamental">Infraestructura Gubernamental</option>
                        <option value="Inmuebles">Inmuebles</option>
                        <option value="Otros Proyectos de Inversión">Otros Proyectos de Inversión</option>
                      </Field>
                      <ErrorMessage name="tipoProyecto" component="div" className="error" />
                    </div>
                  </div>
                  <div className="form-group dependencia">
                    <label>Dependencia/Organismo/Municipio/Sector Privado</label>
                    <Field as="select" name="dependencia">
                      <option value="">Seleccione</option>
                      <option value="SDG">SDG</option>
                      <option value="OFM">OFM</option>
                      <option value="UPL">UPL</option>
                      <option value="GOB">GOB</option>
                      <option value="HAC">HAC</option>
                      <option value="SBI">SBI</option>
                      <option value="SIP">SIP</option>
                      <option value="SDE">SDE</option>
                      <option value="SMR">SMR</option>
                      <option value="SAD">SAD</option>
                      <option value="TUR">TUR</option>
                      <option value="CON">CON</option>
                      <option value="SEP">SEP</option>
                      <option value="SLD">SLD</option>
                      <option value="SEG">SEG</option>
                      <option value="STP">STP</option>
                      <option value="SMT">SMT</option>
                      <option value="CUL">CUL</option>
                      <option value="PGJ">PGJ</option>
                    </Field>
                    <ErrorMessage name="dependencia" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Fuentes de Financiamiento</h3>
                  <div className="linea_footer"></div>
                </div>
                <div className="FuentesFinanciamiento">
                  <div className="formFour">
                    <div className="form-group montoFederal">
                      <label>Monto Federal</label>
                      <Field type="number" name="montoFederal" min="0" onChange={(e) => {
                        setFieldValue('montoFederal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoFederal" component="div" className="error" />
                    </div>
                    <div className="form-group montoEstatal">
                      <label>Monto Estatal</label>
                      <Field type="number" name="montoEstatal" min="0" onChange={(e) => {
                        setFieldValue('montoEstatal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoEstatal" component="div" className="error" />
                    </div>
                    <div className="form-group montoMunicipal">
                      <label>Monto Municipal</label>
                      <Field type="number" name="montoMunicipal" min="0" onChange={(e) => {
                        setFieldValue('montoMunicipal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoMunicipal" component="div" className="error" />
                    </div>
                    <div className="form-group montoOtros">
                      <label>Otros</label>
                      <Field type="number" name="montoOtros" min="0" defaultValue="N/A" onChange={(e) => {
                        setFieldValue('montoOtros', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal(values));
                      }} />
                      <ErrorMessage name="montoOtros" component="div" className="error" />
                    </div>
                  </div>


                  <div className="form-group inversionEstimada">
                    <label>Inversión Estimada</label>
                    <Field type="text" name="inversionEstimada" readOnly value={calculateTotal(values)} />
                  </div>

                </div>

                <div className="titulosForm">
                  <h3>Descripción del Proyecto</h3>
                  <div className="linea_footer"></div>
                </div>

                <div className="DescripcionProyecto">
                  <div className="form-group descripcion">
                    <label>Descripción</label>
                    <Field as="textarea" name="descripcion" maxLength="1000" />
                    <ErrorMessage name="descripcion" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="form-group situacionSinProyecto">
                    <label>Situación sin el Programa o Proyecto de Inversión</label>
                    <Field as="textarea" name="situacionSinProyecto" maxLength="1000" />
                    <ErrorMessage name="situacionSinProyecto" component="div" className="error" />
                    <div>Máximo 1000 caracteres</div>
                  </div>
                  <div className="formTwo">
                    <div className="form-group objetivos">
                      <label>Objetivos</label>
                      <Field as="textarea" name="objetivos" maxLength="500" />
                      <ErrorMessage name="objetivos" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                    <div className="form-group metas">
                      <label>Metas</label>
                      <Field as="textarea" name="metas" maxLength="500" />
                      <ErrorMessage name="metas" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                  </div>
                  <div className="form-group programaPresupuestario">
                    <label>Programa Presupuestario</label>
                    <Field type="text" name="programaPresupuestario" />
                    <ErrorMessage name="programaPresupuestario" component="div" className="error" />
                  </div>
                  <div className="formTwo">
                    <div className="form-group beneficiarios">
                      <label>Beneficiarios</label>
                      <Field type="number" name="beneficiarios" />
                      <ErrorMessage name="beneficiarios" component="div" className="error" />
                    </div>
                    <div className="form-group alineacionNormativa">
                      <label>Alineación Normativa Vigente</label>
                      <Field as="textarea" name="alineacionNormativa" maxLength="200" />
                      <ErrorMessage name="alineacionNormativa" component="div" className="error" />
                      <div>Máximo 200 caracteres</div>
                    </div>
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Territorio y Georreferenciación</h3>
                  <div className="linea_footer"></div>
                </div>

                <div className="formFour">
                  <div className="form-group region">
                    <label>Región</label>
                    <Field as="select" name="region">
                      <option value="">Seleccione</option>
                      <option value="Tula">Tula</option>
                      <option value="Tulancingo">Tulancingo</option>
                      <option value="Pachuca">Pachuca</option>
                      <option value="Huejutla">Huejutla</option>
                      <option value="Mineral de la Reforma">Mineral de la Reforma</option>
                      <option value="Tizayuca">Tizayuca</option>
                      <option value="Actopan">Actopan</option>
                      <option value="Ixmiquilpan">Ixmiquilpan</option>
                      <option value="Zacualtipán">Zacualtipán</option>
                      <option value="Apan">Apan</option>
                      <option value="Huichapan">Huichapan</option>
                      <option value="Jacala">Jacala</option>
                    </Field>
                    <ErrorMessage name="region" component="div" className="error" />
                  </div>
                  <div className="form-group municipio">
                    <label>Municipio</label>
                    <Field as="select" name="municipio">
                      <option value="">Seleccione</option>
                      {municipiosDeHidalgo.map((municipio) => (
                        <option key={municipio} value={municipio}>{municipio}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="municipio" component="div" className="error" />
                  </div>
                  <div className="form-group localidad">
                    <label>Localidad</label>
                    <Field type="text" name="localidad" />
                    <ErrorMessage name="localidad" component="div" className="error" />
                  </div>
                  <div className="form-group barrioColoniaEjido">
                    <label>Barrio/Colonia/Ejido</label>
                    <Field type="text" name="barrioColoniaEjido" />
                    <ErrorMessage name="barrioColoniaEjido" component="div" className="error" />
                  </div>
                </div>
                <p>COORDENADAS GEOGRÁFICAS:</p>
                <div className="formTwo">
                  <div className="form-group latitud">
                    <label>Latitud</label>
                    <Field type="number" name="latitud" step="any" />
                    <ErrorMessage name="latitud" component="div" className="error" />
                  </div>
                  <div className="form-group longitud">
                    <label>Longitud</label>
                    <Field type="number" name="longitud" step="any" />
                    <ErrorMessage name="longitud" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>Alineación Estratégica</h3>
                  <div className="linea_footer"></div>
                </div>


                <div className="formTwo">
                  <div className="form-group planNacional">
                    <label>Plan Nacional de Desarrollo</label>
                    <Field as="select" name="planNacional">
                      <option value="">Seleccione</option>
                      <option value="Justicia y Estado de derecho">Justicia y Estado de derecho</option>
                      <option value="Bienestar">Bienestar</option>
                      <option value="Desarrollo económico">Desarrollo económico</option>
                      <option value="Igualdad de género, no discriminación e inclusión">Igualdad de género, no discriminación e inclusión</option>
                      <option value="Combate a la corrupción y mejora de la gestión pública">Combate a la corrupción y mejora de la gestión pública</option>
                      <option value="Territorio y desarrollo sostenible">Territorio y desarrollo sostenible</option>
                    </Field>
                    <ErrorMessage name="planNacional" component="div" className="error" />
                  </div>
                  <div className="form-group planEstatal">
                    <label>Plan Estatal de Desarrollo</label>
                    <Field as="select" name="planEstatal">
                      <option value="">Seleccione</option>
                      <option value="Acuerdo para un Gobierno Cercano, Justo y Honesto">Acuerdo para un Gobierno Cercano, Justo y Honesto</option>
                      <option value="Acuerdo para el Bienestar del Pueblo">Acuerdo para el Bienestar del Pueblo</option>
                      <option value="Acuerdo para el Desarrollo Económico">Acuerdo para el Desarrollo Económico</option>
                      <option value="Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora">Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora</option>
                      <option value="Transversales Acuerdo por la Ciencia y Tecnología para el Desarrollo">Transversales Acuerdo por la Ciencia y Tecnología para el Desarrollo</option>
                      <option value="Transversales Acuerdo para Garantizar los Derechos Humanos">Transversales Acuerdo para Garantizar los Derechos Humanos</option>
                      <option value="Transversales Acuerdo para la Transformación y Rendición de Cuentas">Transversales Acuerdo para la Transformación y Rendición de Cuentas</option>
                    </Field>
                    <ErrorMessage name="planEstatal" component="div" className="error" />
                  </div>
                </div>
                <div className="formTwo">
                  <div className="form-group ods">
                    <label>Objetivos de Desarrollo Sostenible</label>
                    <Field as="select" name="ods">
                      <option value="">Seleccione</option>
                      <option value="Fin de la pobreza">Fin de la pobreza</option>
                      <option value="Hambre cero">Hambre cero</option>
                      <option value="Salud y bienestar">Salud y bienestar</option>
                      <option value="Educación de calidad">Educación de calidad</option>
                      <option value="Igualdad de género">Igualdad de género</option>
                      <option value="Agua limpia y saneamiento">Agua limpia y saneamiento</option>
                      <option value="Energía asequible y no contaminante">Energía asequible y no contaminante</option>
                      <option value="Trabajo decente y crecimiento económico">Trabajo decente y crecimiento económico</option>
                      <option value="Industria, innovación e infraestructura">Industria, innovación e infraestructura</option>
                      <option value="Reducir las desigualdades">Reducir las desigualdades</option>
                      <option value="Ciudades y comunidades sostenibles">Ciudades y comunidades sostenibles</option>
                      <option value="Producción y consumo responsables">Producción y consumo responsables</option>
                      <option value="Acción por el clima">Acción por el clima</option>
                      <option value="Vida submarina">Vida submarina</option>
                      <option value="Vida de ecosistemas terrestres">Vida de ecosistemas terrestres</option>
                      <option value="Paz, justicia e instituciones sólidas">Paz, justicia e instituciones sólidas</option>
                      <option value="Alianzas para lograr los objetivos">Alianzas para lograr los objetivos</option>
                    </Field>
                    <ErrorMessage name="ods" component="div" className="error" />
                  </div>
                  <div className="form-group planSectorial">
                    <label>Plan Sectorial Institucional</label>
                    <Field as="select" name="planSectorial">
                      <option value="">Seleccione</option>
                      <option value="Despacho">Despacho</option>
                      <option value="Oficialía Mayor">Oficialía Mayor</option>
                      <option value="Planeación">Planeación</option>
                      <option value="Gobierno">Gobierno</option>
                      <option value="Hacienda">Hacienda</option>
                      <option value="Bienestar">Bienestar</option>
                      <option value="Infraestructura Publica">Infraestructura Publica</option>
                      <option value="Economía">Economía</option>
                      <option value="Medio Ambiente">Medio Ambiente</option>
                      <option value="Campo">Campo</option>
                      <option value="Turismo">Turismo</option>
                      <option value="Contraloría">Contraloría</option>
                      <option value="Educación">Educación</option>
                      <option value="Salud">Salud</option>
                      <option value="Seguridad">Seguridad</option>
                      <option value="Trabajo">Trabajo</option>
                      <option value="Cultura">Cultura</option>
                      <option value="Procuradora">Procuradora</option>
                    </Field>
                    <ErrorMessage name="planSectorial" component="div" className="error" />
                  </div>
                </div>

                <div className="titulosForm">
                  <h3>RENTABILIDAD / ESTUDIOS DE VIABILIDAD CARGA DE DOCUMENTACIÓN</h3>
                  <div className="linea_footer"></div>
                </div>
                <div className="RENTABILIDAD">
                  {[
                    { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
                    { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
                    { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
                    { label: 'Validación Normativa', field: 'validacionNormativa' },
                    { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
                    { label: 'Situación sin Proyecto (Reporte Fotográfico)', field: 'situacionSinProyectoFotografico' },
                    { label: 'Situación con Proyecto (Proyección)', field: 'situacionConProyectoProyeccion' },
                    { label: 'Análisis Costo Beneficio (Acb)', field: 'analisisCostoBeneficio' },
                    { label: 'Expediente Técnico', field: 'expedienteTecnico' },
                    { label: 'Proyecto Ejecutivo', field: 'proyectoEjecutivo' },
                    { label: 'Manifestación Impacto Ambiental (Mia)', field: 'manifestacionImpactoAmbiental' },
                    { label: 'Otros Estudios y/o Documentos Que Complementen el Proyecto', field: 'otrosEstudios' },
                  ].map(({ label, field }) => (
                    <div key={field} className="form-group CargaDocumentacion">
                      <div className='textAplica'>
                        <label>{label}</label>
                        <div className="checkAplica">
                          <label>
                            <Field type="checkbox" name={`applies.${field}`} checked={applies[field]} onChange={() => handleApplyChange(field)} />
                            Aplica
                          </label>
                          <label>
                            <Field type="checkbox" name={`applies.${field}`} checked={!applies[field]} onChange={() => handleApplyChange(field)} />
                            No Aplica
                          </label>
                        </div>
                      </div>

                      {applies[field] && (
                        <FieldArray name={field}>
                          {({ push, remove }) => (
                            <div>
                              {values[field].map((file, index) => (
                                <div key={index} className="file-input-group">
                                  <input
                                    type="file"
                                    onChange={(event) => {
                                      const files = Array.from(event.currentTarget.files);
                                      files.forEach(file => setFieldValue(`${field}.${index}`, file));
                                    }}
                                    accept=".pdf,.xlsx,.jpeg,.dwg,.rtv,.mp4"
                                  />
                                  <button type="button" onClick={() => remove(index)}>Eliminar</button>
                                </div>
                              ))}
                              <button type="button" onClick={() => push(null)} className="add-file-button">Agregar Archivo</button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                      <ErrorMessage name={field} component="div" className="error" />
                    </div>
                  ))}
                </div>

                <button type="submit" disabled={isSubmitting}>
                  Enviar
                </button>

              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Formulario;
