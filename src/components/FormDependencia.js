import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
const imgBasePath = "/img/";

// const regionesConMunicipios = {
//   '01.Tula': [
//     '005 Ajacuba', '010 Atitalaquia', '013 Atotonilco de Tula', '063 Tepeji del Río de Ocampo',
//     '064 Tepetitlán', '065 Tetepango', '067 Tezontepec de Aldama', '070 Tlahuelilpan', '074 Tlaxcoapan', '076 Tula de Allende'
//   ],
//   '02.Tulancingo': [
//     '001 Acatlán', '002 Acaxochitlán', '004 Agua Blanca de Iturbide', '016 Cuautepec de Hinojosa', '027 Huehuetla',
//     '035 Metepec', '053 San Bartolo Tutotepec', '056 Santiago Tulantepec de Lugo Guerrero', '057 Singuilucan', '060 Tenango de Doria', '077 Tulancingo de Bravo'
//   ],
//   '03.Pachuca': ['048 Pachuca de Soto', '052 San Agustin Tlaxiaca', '082 Zapotlán de Juárez'],
//   '04.Huejutla': [
//     '028 Huejutla de Reyes', '011 Atlapexco', '014 Calnali', '025 Huautla', '026 Huazalingo', '032 Jaltocán', '034 Lolotla',
//     '046 San Felipe Orizatlán', '073 Tlanchinol', '078 Xochiatipan', '080 Yahualica'
//   ],
//   '05.Mineral de la Reforma': [
//     '051 Mineral de la Reforma', '022 Epazoyucan', '024 Huasca de Ocampo', '038 Mineral del Chico', '039 Mineral del Monte', '045 Omitlán de Juárez'
//   ],
//   '06.Tizayuca': ['069 Tizayuca', '066 Villa de Tezontepec', '075 Tolcayuca', '083 Zempoala'],
//   '07.Actopan': [
//     '003 Actopan', '009 El Arenal', '023 Francisco I. Madero', '041 Mixquiahuala de Juárez', '050 Progreso de Obregón',
//     '054 San Salvador', '055 Santiago de Anaya'
//   ],
//   '08.Ixmiquilpan': [
//     '030 Ixmiquilpan', '006 Alfajayucan', '015 Cardonal', '019 Chilcuautla', '043 Nicolás Flores', '058 Tasquillo', '084 Zimapán'
//   ],
//   '09.Zacualtipán': [
//     '081 Zacualtipán de Ángeles', '012 Atotonilco el Grande', '020 Eloxochitlán', '033 Juárez Hidalgo',
//     '036 San Agustín Metzquititlán', '037 Metztitlán', '042 Molango de Escamilla', '062 Tepehuacán de Guerrero',
//     '068 Tianguistengo', '071 Tlahuiltepa', '079 Xochicoatlán'
//   ],
//   '10.Apan': [
//     '008 Apan', '007 Almoloya', '021 Emiliano Zapata', '061 Tepeapulco', '072 Tlanalapa'
//   ],
//   '11.Huichapan': [
//     '029 Huichapan', '017 Chapantongo', '044 Nopala de Villagrán', '059 Tecozautla'
//   ],
//   '12.Jacala': [
//     '031 Jacala de Ledezma', '018 Chapulhuacán', '040 La Misión', '047 Pacula', '049 Pisaflores'
//   ]
// };


const municipiosDeHidalgo = [
  '001 Acatlán', '002 Acaxochitlán', '003 Actopan', '004 Agua Blanca de Iturbide', '005 Ajacuba', '006 Alfajayucan',
  '007 Almoloya', '008 Apan', '009 El Arenal', '010 Atitalaquia', '011 Atlapexco', '012 Atotonilco el Grande',
  '013 Atotonilco de Tula', '014 Calnali', '015 Cardonal', '016 Cuautepec de Hinojosa', '017 Chapantongo',
  '018 Chapulhuacán', '019 Chilcuautla', '020 Eloxochitlán', '021 Emiliano Zapata', '022 Epazoyucan',
  '023 Francisco I. Madero', '024 Huasca de Ocampo', '025 Huautla', '026 Huazalingo', '027 Huehuetla',
  '028 Huejutla de Reyes', '029 Huichapan', '030 Ixmiquilpan', '031 Jacala de Ledezma', '032 Jaltocán',
  '033 Juárez Hidalgo', '034 Lolotla', '035 Metepec', '036 San Agustín Metzquititlán', '037 Metztitlán',
  '038 Mineral del Chico', '039 Mineral del Monte', '040 La Misión', '041 Mixquiahuala de Juárez',
  '042 Molango de Escamilla', '043 Nicolás Flores', '044 Nopala de Villagrán', '045 Omitlán de Juárez',
  '046 San Felipe Orizatlán', '047 Pacula', '048 Pachuca de Soto', '049 Pisaflores', '050 Progreso de Obregón',
  '051 Mineral de la Reforma', '052 San Agustín Tlaxiaca', '053 San Bartolo Tutotepec', '054 San Salvador',
  '055 Santiago de Anaya', '056 Santiago Tulantepec de Lugo Guerrero', '057 Singuilucan', '058 Tasquillo',
  '059 Tecozautla', '060 Tenango de Doria', '061 Tepeapulco', '062 Tepehuacán de Guerrero', '063 Tepeji del Río de Ocampo',
  '064 Tepetitlán', '065 Tetepango', '066 Villa de Tezontepec', '067 Tezontepec de Aldama', '068 Tianguistengo',
  '069 Tizayuca', '070 Tlahuelilpan', '071 Tlahuiltepa', '072 Tlanalapa', '073 Tlanchinol', '074 Tlaxcoapan',
  '075 Tolcayuca', '076 Tula de Allende', '077 Tulancingo de Bravo', '078 Xochiatipan', '079 Xochicoatlán',
  '080 Yahualica', '081 Zacualtipán de Ángeles', '082 Zapotlán de Juárez', '083 Zempoala', '084 Zimapán'
];

const unidadesResponsables = [
  '01.Poder Legislativo',
  '02.Poder Judicial',
  '03.Instituto Estatal Electoral',
  '04.Comisión de Derechos Humanos del Estado',
  '05.Instituto de Transparencia, Acceso a la Información Pública Gubernamental y Protección de Datos Personales del Estado de Hidalgo',
  '06.Tribunal Electoral del Estado de Hidalgo',
  '10.Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado',
  '11.Secretaría de Gobierno',
  '12.Secretaría de Hacienda',
  '13.Secretaría de Bienestar e Inclusión Social',
  '15.Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible',
  '16.Secretaría de Medio Ambiente y Recursos Naturales',
  '17.Secretaría de Desarrollo Económico',
  '18.Secretaría de Agricultura y Desarrollo Rural',
  '19.Secretaría de Turismo',
  '20.Secretaría de Contraloría',
  '21.Secretaría de Educación Pública',
  '22.Secretaría de Salud',
  '23.Secretaría de Seguridad Pública',
  '24.Secretaría del Trabajo y Previsión Social',
  '26.Secretaría de Movilidad y Transporte',
  '27.Secretaría de Cultura',
  '28.Unidad de Planeación y Prospectiva',
  '29.Oficialía Mayor',
  '30.Procuraduría General de Justicia',
  '40.Organismos Descentralizados',
  '50.Organismos Descentralizados no Sectorizados',
  '60.Municipios'
];

const dependencias = [
  'Secretaría del Despacho del Gobernador (SDC)', 'Oficialía Mayor (OFM)', 'Unidad de Planeación y Prospectiva (UPI)',
  'Secretaría de Gobierno (COB)', 'Secretaría de Hacienda (HAC)', 'Secretaría de Bienestar e Inclusión Social (SBI)',
  'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible (SIP)', 'Secretaría de Desarrollo Económico (SDE)',
  'Secretaría de Medio Ambiente y Recursos Naturales (SMR)', 'Secretaría de Agricultura y Desarrollo Rural (SAD)',
  'Secretaría de Turismo (TUR)', 'Secretaría de Contraloría (CON)', 'Secretaría de Educación Pública (SEP)',
  'Secretaría de Salud (SLD)', 'Secretaría de Seguridad Pública (SEG)', 'Secretaría del Trabajo y Previsión Social (STP)',
  'Secretaría de Movilidad y Transporte (SMT)', 'Secretaría de Cultura (CUL)', 'Procuraduría de General de Justicia (PGJ)'
];

const organismos = [
  'Centro de Justicia para Mujeres del Estado de Hidalgo (CJM)', 'Ciudad de las Mujeres (CMU)', 'Instituto Hidalguense de las Mujeres (IMU)',
  'Instituto Hidalguense para el Desarrollo Municipal (IND)', 'Instituto Catastral del Estado de Hidalgo (ICA)',
  'Instituto para Devolver al Pueblo lo Robado (IPR)', 'Centro Estatal de Maquinaria para el Desarrollo (CMD)',
  'Comisión de Agua y Alcantarillado de Sistemas del Valle del Mezquital (CAV)', 'Comisión de Agua y Alcantarillado de Sistemas Intermunicipales (CAI)',
  'Comisión Estatal de Agua y Alcantarillado (CEA)', 'Comisión Estatal de Vivienda (CEV)', 'Policía Industrial Bancaria del Estado de Hidalgo (PIB)',
  'Consejo Estatal para la Cultura y las Artes de Hidalgo (CCA)', 'Escuela de Música del Estado de Hidalgo (EMH)',
  'Servicios de Salud de Hidalgo (SSH)', 'Agencia de Desarrollo Valle de Plata (AVP)', 'Agencia Estatal de Energía (AEE)',
  'Corporación de Fomento de Infraestructura Industrial (FII)', 'Corporación Internacional Hidalgo (CIH)',
  'Instituto Hidalguense de Competitividad (IHC)', 'Comisión Estatal de Biodiversidad de Hidalgo (COE)',
  'Centro de Conciliación Laboral del Estado de Hidalgo (CLH)', 'Instituto de Capacitación para el Trabajo del Estado de Hidalgo (CTH)',
  'Operadora de Eventos del Estado de Hidalgo (OEH)', 'Bachillerato del Estado de Hidalgo (BEH)',
  'Colegio de Bachilleres del Estado de Hidalgo (CBH)', 'Colegio de Educación Profesional Técnica del Estado de Hidalgo (EPT)',
  'Colegio de Estudios Científicos y del Estado de Hidalgo (ECT)', 'El Colegio del Estado de Hidalgo (CEH)',
  'Instituto Hidalguense de Educación (IHE)', 'Instituto Hidalguense de Educación para Adultos (IHEA)',
  'Instituto Hidalguense de Financiamiento a la Educación Superior (IHFES)', 'Instituto Hidalguense de Ia Infraestructura Física Educativa (IFE)',
  'Instituto Hidalguense del Deporte (IHD)', 'Instituto Tecnológico Superior de Huichapan (ITESHU)',
  'Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)', 'Instituto Tecnológico Superior del Oriente del Estado de Hidalgo (ITESA)',
  'Radio y Televisión de Hidalgo (RTH)', 'Universidad Intercultural del Estado de Hidalgo (UICEH)',
  'Universidad Politécnica de Francisco l. Madero (UPFIM)', 'Universidad Politécnica de Huejutla (UPHUE)',
  'Universidad Politécnica de la Energía (UPE)', 'Universidad Politécnica de Pachuca (UPP)',
  'Universidad Politécnica de Tulancingo (UPT)', 'Universidad Politécnica Metropolitana de Hidalgo (UPMH)',
  'Universidad Tecnológica de la Huasteca Hidalguense (UTHH)', 'Universidad Tecnológica de la Sierra Hidalguense (UTSH)',
  'Universidad Tecnológica de la Zona Metropolitana del Valle de México (UTVAM)', 'Universidad Tecnológica de Mineral de la Reforma (UTMIR)',
  'Universidad Tecnológica de Tulancingo (UTT)', 'Universidad Tecnológica de Tula-Tepejí (UTTT)',
  'Universidad Tecnológica del Valle del Mezquital (UTVM)', 'Universidad Tecnológica Minera de Zimapán (UTMZ)',
  'Instituto Hidalguense de la Juventud (IHJ)', 'Instituto para la Atención de las y los Adultos Mayores del Estado de Hidalgo (IAA)',
  'Sistema de Convencional (STC)', 'Sistema de Masivo (STM)', 'Comisión Estatal para el Desarrollo de los Pueblos Indígenas en el Estado de Hidalgo (CPI)',
  'Consejo de Ciencia, Tecnología e Innovación de Hidalgo (CCT)', 'Consejo Rector de Pachuca Ciudad del Conocimiento y la Cultura (CCC)',
  'Museo Interactivo para la Niñez y Juventud Hidalguense El Rehilete (MIR)', 'Secretaría Técnica del Sistema Estatal Anticorrupción de Hidalgo (STSEA)',
  'Distrito de Educación, Salud, Ciencia, Tecnología e Innovación (DESTI)', 'Sistema para el Desarrollo Integral de la Familia Hidalgo (DIF)',
  'Universidad Digital del Estado de Hidalgo (UDH)'
];

const Formulario = () => {
  const [step, setStep] = useState(1);
  const [entityType, setEntityType] = useState('');
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

  const noSpacesValidation = (value) => {
    if (!value) return true;
    return !/\s/.test(value);
  };

  const validationSchemaStep1 = Yup.object().shape({
    nombreDependencia: Yup.string().required('El nombre de la dependencia es obligatorio'),
    areaAdscripcion: Yup.string().required('El área de adscripción es obligatoria'),
    nombreRegistrante: Yup.string().required('El nombre del registrante es obligatorio'),
    apellidoPaterno: Yup.string().required('El apellido paterno es obligatorio'),
    apellidoMaterno: Yup.string().required('El apellido materno es obligatorio'),
    correoInstitucional: Yup.string().email('Correo electrónico no válido').required('El correo institucional es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    telefonoOficina: Yup.string().matches(/^\d{10}$/, 'El teléfono de oficina debe tener 10 dígitos').required('El teléfono de oficina es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    correoPersonal: Yup.string().email('Correo electrónico no válido').required('El correo personal es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
    telefonoParticular: Yup.string().matches(/^\d{10}$/, 'El teléfono particular debe tener 10 dígitos').required('El teléfono particular es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  });

  const validationSchemaStep2 = Yup.object().shape({
    projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
    tipoProyecto: Yup.string().required('El tipo de proyecto es obligatorio'),
    dependencia: Yup.string().when('entityType', {
      is: 'Dependencia',
      then: Yup.string().required('La dependencia es obligatoria'),
    }),
    organismo: Yup.string().when('entityType', {
      is: 'Organismo',
      then: Yup.string().required('El organismo es obligatorio'),
    }),
    municipio: Yup.string().when('entityType', {
      is: 'Municipio',
      then: Yup.string().required('El municipio es obligatorio'),
    }),
    sectorPrivado: Yup.string().when('entityType', {
      is: 'Sector Privado',
      then: Yup.string().required('El sector privado es obligatorio'),
    }),
    montoFederal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoEstatal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoMunicipal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
    montoOtros: Yup.number().min(0, 'El monto no puede ser negativo').nullable().default('N/A'),
    descripcion: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción es obligatoria'),
    situacionSinProyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La situación sin el proyecto es obligatoria'),
    objetivos: Yup.string().max(500, 'Máximo 500 caracteres').required('Los objetivos son obligatorios'),
    metas: Yup.string().max(500, 'Máximo 500 caracteres').required('Las metas son obligatorias'),
    programaPresupuestario: Yup.string().required('El programa presupuestario es obligatorio'),
    beneficiarios: Yup.number().min(1, 'El número de beneficiarios es obligatorio').nullable(),
    alineacionNormativa: Yup.string().max(200, 'Máximo 200 caracteres').required('La alineación normativa es obligatoria'),
    region: Yup.string().required('La región es obligatoria'),
    latitud: Yup.number().required('La latitud es obligatoria'),
    longitud: Yup.number().required('La longitud es obligatoria'),
    planNacional: Yup.string().required('El plan nacional de desarrollo es obligatorio'),
    planEstatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
    ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
    planSectorial: Yup.string().required('El plan sectorial institucional es obligatorio'),
    unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
    observaciones: Yup.string().max(1000, 'Máximo 1000 caracteres'),
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
      formData.append('entityType', entityType);
      formData.append('dependencia', values.dependencia);
      formData.append('organismo', values.organismo);
      formData.append('municipio', values.municipio);
      formData.append('sectorPrivado', values.sectorPrivado);
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
      formData.append('latitud', values.latitud);
      formData.append('longitud', values.longitud);
      formData.append('planNacional', values.planNacional);
      formData.append('planEstatal', values.planEstatal);
      formData.append('ods', values.ods);
      formData.append('planSectorial', values.planSectorial);
      formData.append('unidadResponsable', values.unidadResponsable);
      formData.append('observaciones', values.observaciones);

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
      <div className="formTitulo">
        <img src={`${imgBasePath}formIco.png`} alt="img_representativa" />
        <h3>REGISTRO DE PROYECTO</h3>
      </div>
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
                <div className="formTwo">
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
                </div>

                <div className="formThree">
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
                </div>
                <p>Recuerda no dejar espacios en blanco entre los caracteres en el campo de correo y teléfono.</p>
                <div className="formFour">
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
            organismo: '',
            municipio: '',
            sectorPrivado: '',
            montoFederal: '0',
            montoEstatal: '0',
            montoMunicipal: '0',
            montoOtros: '0',
            descripcion: '',
            situacionSinProyecto: '',
            objetivos: '',
            metas: '',
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
            unidadResponsable: '',
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
            otrosEstudios: [],
            observaciones: '',
          }}
          validationSchema={validationSchemaStep2}
          onSubmit={handleSubmitStep2}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <div>
                <div className="titulosForm">
                  <h3>Datos Generales</h3>
                  <div className="linea_form"></div>
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

                  <div className="formTwo">

                    <div className="form-group entityType">
                      <label>Tipo de Entidad</label>
                      <Field as="select" name="entityType" onChange={(e) => setEntityType(e.target.value)}>
                        <option value="">Seleccione</option>
                        <option value="Dependencia">Dependencia</option>
                        <option value="Organismo">Organismo</option>
                        <option value="Municipio">Municipio</option>
                        <option value="Sector Privado">Sector Privado</option>
                      </Field>
                      <ErrorMessage name="entityType" component="div" className="error" />
                    </div>

                    {entityType === 'Dependencia' && (
                      <div className="form-group dependencia">
                        <label>Dependencia</label>
                        <Field as="select" name="dependencia">
                          <option value="">Seleccione</option>
                          {dependencias.map((dep) => (
                            <option key={dep} value={dep}>{dep}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="dependencia" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Organismo' && (
                      <div className="form-group organismo">
                        <label>Organismo</label>
                        <Field as="select" name="organismo">
                          <option value="">Seleccione</option>
                          {organismos.map((org) => (
                            <option key={org} value={org}>{org}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="organismo" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Municipio' && (
                      <div className="form-group municipioEnd">
                        <label>Municipio</label>
                        <Field as="select" name="municipioEnd">
                          <option value="">Seleccione</option>
                          {municipiosDeHidalgo.map((mun) => (
                            <option key={mun} value={mun}>{mun}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="municipio" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Sector Privado' && (
                      <div className="form-group sectorPrivado">
                        <label>Sector Privado</label>
                        <Field type="text" name="sectorPrivado" />
                        <ErrorMessage name="sectorPrivado" component="div" className="error" />
                      </div>
                    )}

                  </div>
                  <div className="form-group unidadResponsable">
                    <label>Unidad Responsable</label>
                    <Field as="select" name="unidadResponsable">
                      <option value="">Seleccione</option>
                      {unidadesResponsables.map((unidad) => (
                        <option key={unidad} value={unidad}>{unidad}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="unidadResponsable" component="div" className="error" />
                  </div>
                </div>

                {/* Aquí se agrega el nuevo campo "UNIDAD RESPONSABLE" */}


                <div className="titulosForm">
                  <h3>Fuentes de Financiamiento</h3>
                  <div className="linea_form"></div>
                </div>
                <div className="FuentesFinanciamiento">
                  <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
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
                  <div className="linea_form"></div>
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
                      <Field type="number" name="beneficiarios" min="1" />
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
                  <div className="linea_form"></div>
                </div>

                <div className="formFour">
                  <div className="form-group region">
                    <label>Región</label>
                    <Field as="select" name="region">
                      <option value="">Seleccione</option>
                      <option value="1.Tula">01.Tula</option>
                      <option value="2.Tulancingo">02.Tulancingo</option>
                      <option value="4.Pachuca">03.Pachuca</option>
                      <option value="5.Huejutla">04.Huejutla</option>
                      <option value="6.Mineral de la Reforma">05.Mineral de la Reforma</option>
                      <option value="7.Tizayuca">06.Tizayuca</option>
                      <option value="8.Actopan">07.Actopan</option>
                      <option value="9.Ixmiquilpan">08.Ixmiquilpan</option>
                      <option value="10.Zacualtipán">09.Zacualtipán</option>
                      <option value="11.Apan">10.Apan</option>
                      <option value="12.Huichapan">11.Huichapan</option>
                      <option value="13.Jacala">12.Jacala</option>
                    </Field>
                    <ErrorMessage name="region" component="div" className="error" />
                  </div>
                  <div className="form-group municipio">
                    <label>Municipio</label>
                    <Field as="select" name="municipio">
                      <option value="">Seleccione</option>
                      {municipiosDeHidalgo.map((mun) => (
                        <option key={mun} value={mun}>{mun}</option>
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
                  <div className="linea_form"></div>
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
                      {/* <option value="Transversales Acuerdo por la Ciencia y Tecnología para el Desarrollo">Transversales Acuerdo por la Ciencia y Tecnología para el Desarrollo</option>
                      <option value="Transversales Acuerdo para Garantizar los Derechos Humanos">Transversales Acuerdo para Garantizar los Derechos Humanos</option>
                      <option value="Transversales Acuerdo para la Transformación y Rendición de Cuentas">Transversales Acuerdo para la Transformación y Rendición de Cuentas</option> */}
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
                  <h3>Mecanismos de Evaluación y Seguimiento a Proyectos</h3>
                  <div className="linea_form"></div>
                </div>


                <div className="titulosForm">
                  <h3>Rentabilidad / Estudios de Viabilidad Carga de Documentación</h3>
                  <div className="linea_form"></div>
                </div>
                <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
                <div className="RENTABILIDAD">
                  {[
                    { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
                    { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
                    { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
                    { label: 'Validación Normativa', field: 'validacionNormativa' },
                    { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
                    { label: 'Situación sin Proyecto (Reporte Fotográfico)', field: 'situacionSinProyectoFotografico' },
                    { label: 'Situación con Proyecto (Proyección)', field: 'situacionConProyectoProyeccion' },
                    { label: 'Análisis Costo Beneficio (ACB)', field: 'analisisCostoBeneficio' },
                    { label: 'Expediente Técnico', field: 'expedienteTecnico' },
                    { label: 'Proyecto Ejecutivo', field: 'proyectoEjecutivo' },
                    { label: 'Manifestación Impacto Ambiental (MIA)', field: 'manifestacionImpactoAmbiental' },
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

                <div className="titulosForm">
                  <h3>Observaciones y Comentarios</h3>
                  <div className="linea_form"></div>
                </div>

                <div className="form-group observaciones">
                  <label>Observaciones</label>
                  <Field as="textarea" name="observaciones" maxLength="1000" />
                  <ErrorMessage name="observaciones" component="div" className="error" />
                  <div>Máximo 1000 caracteres</div>
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
