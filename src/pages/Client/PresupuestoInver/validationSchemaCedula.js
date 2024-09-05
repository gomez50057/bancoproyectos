import * as Yup from 'yup';

// Definir un esquema de validación
const validationSchemaCedula = Yup.object().shape({
  nombre_dependencia: Yup.string()
    .required('El nombre de la dependencia es obligatorio')
    .max(250, 'El nombre de la dependencia no debe exceder los 250 caracteres'),
  
  area_adscripcion: Yup.string()
    .required('El área de adscripción es obligatoria')
    .max(250, 'El área de adscripción no debe exceder los 250 caracteres'),
  
  nombre_registrante: Yup.string()
    .required('El nombre de quien registra es obligatorio')
    .max(250, 'El nombre no debe exceder los 250 caracteres'),

  apellido_paterno: Yup.string()
    .required('El apellido paterno es obligatorio')
    .max(250, 'El apellido paterno no debe exceder los 250 caracteres'),

  apellido_materno: Yup.string()
    .required('El apellido materno es obligatorio')
    .max(250, 'El apellido materno no debe exceder los 250 caracteres'),

  correo: Yup.string()
    .email('Formato de correo no válido')
    .required('El correo es obligatorio'),

  telefono: Yup.string()
    .matches(/^\d{10}$/, 'El teléfono debe ser un número de 10 dígitos')
    .required('El teléfono es obligatorio'),

  extension: Yup.string()
    .matches(/^\d*$/, 'La extensión solo puede contener números'),

  fecha_registro: Yup.date()
    .required('La fecha de registro es obligatoria'),

  ejercicio_fiscal: Yup.string()
    .required('El ejercicio fiscal es obligatorio'),

  dependencia: Yup.string()
    .required('La dependencia es obligatoria'),

  organismo: Yup.string(),

  unidad_responsable: Yup.string()
    .required('La unidad responsable es obligatoria'),

  unidad_presupuestal: Yup.string()
    .required('La unidad presupuestal es obligatoria'),

  nombre_proyecto: Yup.string()
    .required('El nombre del proyecto es obligatorio')
    .max(250, 'El nombre del proyecto no debe exceder los 250 caracteres'),

  descripcion_proyecto: Yup.string()
    .required('La descripción del proyecto es obligatoria')
    .max(1000, 'La descripción no debe exceder los 1000 caracteres'),

  situacion_actual: Yup.string()
    .required('El análisis de la situación actual es obligatorio')
    .max(1000, 'El análisis no debe exceder los 1000 caracteres'),

  tipo_obra: Yup.string()
    .required('El tipo de obra es obligatorio'),

  calendario_ejecucion: Yup.number()
    .required('El calendario de ejecución es obligatorio')
    .min(1, 'Debe ser al menos 1 mes')
    .max(12, 'No debe exceder los 12 meses'),

  beneficio_social: Yup.string()
    .required('El beneficio social es obligatorio')
    .max(500, 'El beneficio social no debe exceder los 500 caracteres'),

  beneficio_economico: Yup.string()
    .required('El beneficio económico es obligatorio')
    .max(500, 'El beneficio económico no debe exceder los 500 caracteres'),

  numero_beneficiarios: Yup.number()
    .required('El número de beneficiarios es obligatorio')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero'),

  inversion_presupuestada: Yup.number()
    .required('La inversión presupuestada es obligatoria')
    .positive('Debe ser un número positivo'),

  cobertura: Yup.string()
    .required('La cobertura es obligatoria'),

  regiones: Yup.array().when('cobertura', {
    is: 'Regional',
    then: Yup.array().min(1, 'Debes seleccionar al menos una región'),
    otherwise: Yup.array().nullable(),
  }),

  municipios: Yup.array().when('cobertura', {
    is: 'Municipal',
    then: Yup.array().min(1, 'Debes seleccionar al menos un municipio'),
    otherwise: Yup.array().nullable(),
  }),

  ods: Yup.string()
    .required('Debes seleccionar un objetivo de desarrollo sostenible'),

  plan_estatal: Yup.string()
    .required('Debes seleccionar un plan estatal de desarrollo'),

  objetivo_ped: Yup.string()
    .when('plan_estatal', {
      is: (val) => !!val,
      then: Yup.string().required('Debes seleccionar un objetivo del PED'),
    }),

  estrategia_ped: Yup.string()
    .when('objetivo_ped', {
      is: (val) => !!val,
      then: Yup.string().required('Debes seleccionar una estrategia del PED'),
    }),

  linea_accion_ped: Yup.string()
    .when('estrategia_ped', {
      is: (val) => !!val,
      then: Yup.string().required('Debes seleccionar una línea de acción del PED'),
    }),

  indicador_ped: Yup.string()
    .when('linea_accion_ped', {
      is: (val) => !!val,
      then: Yup.string().required('Debes seleccionar un indicador del PED'),
    }),

  programa_sectorial: Yup.string()
    .when(['dependencia', 'organismo'], {
      is: (dependencia, organismo) => !!dependencia || !!organismo,
      then: Yup.string().required('Debes seleccionar un programa sectorial'),
    }),

  objetivo_programa: Yup.string()
    .when('programa_sectorial', {
      is: (val) => !!val,
      then: Yup.string().required('Debes seleccionar un objetivo del programa sectorial'),
    }),

  propuesta_campana: Yup.string()
    .required('Debes indicar si el proyecto se relaciona con alguna propuesta de campaña'),

  cual_propuesta: Yup.string().when('propuesta_campana', {
    is: 'Sí',
    then: Yup.string().required('Debes indicar cuál propuesta de campaña está relacionada'),
    otherwise: Yup.string().nullable(),
  }),

  expediente_tecnico: Yup.string()
    .required('Debes indicar si el proyecto cuenta con expediente técnico validado'),
  
  estudios_factibilidad: Yup.array().nullable(),
  analisis_alternativas: Yup.array().nullable(),
  validacion_normativa: Yup.array().nullable(),
  liberacion_derecho_via: Yup.array().nullable(),
  analisis_costo_beneficio: Yup.array().nullable(),
  expediente_tecnico_docu: Yup.array().nullable(),
  proyecto_ejecutivo: Yup.array().nullable(),
  manifestacion_impacto_ambiental: Yup.array().nullable(),
  fotografia_render_proyecto: Yup.array().nullable(),
  otros_estudios: Yup.array().nullable(),
});

export default validationSchemaCedula;
