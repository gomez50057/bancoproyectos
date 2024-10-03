import * as Yup from 'yup';

const validationSchemaStep2 = Yup.object().shape({
  projectName: Yup.string().required('El nombre del proyecto es obligatorio'),
  sector: Yup.string().required('El sector es obligatorio'),
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
  PeticionPersonal: Yup.string().when('entityType', {
    is: 'Petición Personal',
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
  alineacionNormativa: Yup.string().max(1500, 'Máximo 1500 caracteres').required('La alineación normativa es obligatoria'),
  region: Yup.string().required('La región es obligatoria'),
  latitud: Yup.number().required('La latitud es obligatoria'),
  longitud: Yup.number().required('La longitud es obligatoria'),
  planNacional: Yup.string().required('El plan nacional de desarrollo es obligatorio'),
  planEstatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
  planMunicipal: Yup.string().when('entityType', {
    is: 'Municipio',
    then: Yup.string().max(500, 'Máximo 500 caracteres').required('El plan municipal es obligatorio'),
  }),
  ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
  planSectorial: Yup.string().required('El plan sectorial institucional es obligatorio'),
  unidadResponsable: Yup.string().required('La unidad responsable es obligatoria'),
  unidadPresupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
  ramoPresupuestal: Yup.string().required('El ramo presupuestal es obligatorio'),
  municipiosImpacto: Yup.array().nullable(),
  observaciones: Yup.string().max(1000, 'Máximo 1000 caracteres'),
  gastoProgramable: Yup.string().required('El gasto programable es obligatorio'),
  indicadoresEstrategicos: Yup.string().required('Los indicadores estratégicos son obligatorios'),
  indicadoresTacticos: Yup.string().test('indicadoresTacticos', 'Los indicadores tácticos son obligatorios', function (value) {
    const { entityType, dependencia } = this.parent;
    if (entityType === 'Dependencia' && dependencia !== 'Secretaría del Despacho del Gobernador') {
      return value === 'No Aplica' || Boolean(value);
    }
    return true;
  }),
  indicadoresDesempeno: Yup.string().required('Los indicadores de desempeño son obligatorios'),
  indicadoresRentabilidad: Yup.string().required('Los indicadores de rentabilidad son obligatorios'),
  estadoInicial: Yup.mixed(),
  estadoConProyecto: Yup.mixed(),
});

export default validationSchemaStep2;
