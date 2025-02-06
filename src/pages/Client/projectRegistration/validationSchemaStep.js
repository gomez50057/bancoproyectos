import * as Yup from 'yup';

const noSpacesValidation = (value) => {
  if (!value) return true;
  return !/\s/.test(value);
};

const validationSchemaStep2 = Yup.object().shape({
  area_adscripcion: Yup.string().required('El área de adscripción es obligatoria'),
  nombre_registrante: Yup.string().required('El nombre del registrante es obligatorio'),
  apellido_paterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellido_materno: Yup.string().required('El apellido materno es obligatorio'),
  correo: Yup.string().email('Correo electrónico no válido').required('El correo institucional es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  telefono: Yup.string().matches(/^\d{10}$/, 'El teléfono de oficina debe tener exactamente 10 dígitos, solo números').required('El teléfono de oficina es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  telefono_ext: Yup.string().matches(/^\d+$/, 'Solo se permiten números').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),

  nombre_proyecto: Yup.string().required('El nombre del proyecto es obligatorio'),
  tipo_entidad: Yup.string().required('El tipo de entidad es obligatorio'),
  tipo_proyecto: Yup.string().required('El tipo de proyecto es obligatorio'),
  sector: Yup.string().required('El sector es obligatorio'),
  dependencia: Yup.string().when('entityType', {
    is: 'Dependencia',
    then: Yup.string().required('La dependencia es obligatoria'),
  }),
  organismo: Yup.string().when('entityType', {
    is: 'Organismo',
    then: Yup.string().required('El organismo es obligatorio'),
  }),
  municipio_ayuntamiento: Yup.string().when('entityType', {
    is: 'Ayuntamiento',
    then: Yup.string().required('El Ayuntamiento es obligatorio'),
  }),
  unidad_responsable: Yup.string().required('La unidad responsable es obligatoria'),
  unidad_presupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
  inversion_federal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  inversion_estatal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  inversion_municipal: Yup.number().min(0, 'El monto no puede ser negativo').nullable(),
  inversion_otros: Yup.number().min(0, 'El monto no puede ser negativo').nullable().default('N/A'),
  inversion_total: Yup.number().min(1, 'La suma de la inversión total tiene que ser mayor a 01, para esto ingresa tu inversión en los campos que corresponda'),
  ramo_presupuestal: Yup.string().required('El ramo presupuestal es obligatorio'),
  descripcion: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción es obligatoria'),
  situacion_sin_proyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La situación sin el proyecto es obligatoria'),
  objetivos: Yup.string().max(500, 'Máximo 500 caracteres').required('Los objetivos son obligatorios'),
  metas: Yup.string().max(500, 'Máximo 500 caracteres').required('Las metas son obligatorias'),
  programa_presupuestario: Yup.string().required('El programa presupuestario es obligatorio'),
  gasto_programable: Yup.string().required('El gasto programable es obligatorio'),
  beneficiarios: Yup.number().min(1, 'El número de beneficiarios tiene que ser mayor a 01').required('El número de beneficiarios es obligatorio'),
  tiempo_ejecucion: Yup.number().min(1, 'El tiempo de ejecución tiene que ser mayor a un mes').required('El tiempo de ejecución es obligatorio'),
  modalidad_ejecucion: Yup.string().required('La modalidad de ejecucion es obligatoria'),
  normativa_aplicable: Yup.string().max(1500, 'Máximo 1500 caracteres').required('La alineación normativa es obligatoria'),
  region: Yup.array().required('La región es obligatoria'),
  municipio: Yup.array().required('El municipio es obligatoria'),
  localidad: Yup.string().required('La localidad es obligatoria'),
  barrio_colonia: Yup.string().required('El Barrio o Colonia es obligatoria'),
  latitud: Yup.number().required('La latitud es obligatoria'),
  longitud: Yup.number().required('La longitud es obligatoria'),
  tipo_localidad: Yup.string().required('El tipo de localidad es obligatoria'),
  plan_nacional: Yup.string().required('El plan nacional de desarrollo es obligatorio'),
  plan_estatal: Yup.string().required('El plan estatal de desarrollo es obligatorio'),
  plan_municipal: Yup.string().when('entityType', {
    is: 'Municipio',
    then: Yup.string().max(500, 'Máximo 500 caracteres').required('El plan municipal es obligatorio'),
  }),

  ods: Yup.string().required('Los objetivos de desarrollo sostenible son obligatorios'),
  indicadores_estrategicos: Yup.string().required('Los indicadores estratégicos son obligatorios'),
  indicadores_socioeconomicos: Yup.string().required('Los indicadores socioeconómicos son obligatorios'),  
  observaciones: Yup.string().max(1000, 'Máximo 1000 caracteres'),
});

export default validationSchemaStep2;
