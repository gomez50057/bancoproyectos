import * as Yup from 'yup';

const validationSchemaCedula = Yup.object({
  nombre_dependencia: Yup.string()
    .required('El nombre de la dependencia es obligatorio'),
  area_adscripcion: Yup.string()
    .required('El área de adscripción es obligatoria'),
  nombre_registrante: Yup.string()
    .required('El nombre es obligatorio'),
  apellido_paterno: Yup.string()
    .required('El apellido paterno es obligatorio'),
  apellido_materno: Yup.string()
    .required('El apellido materno es obligatorio'),
  correo: Yup.string()
    .email('Debe ser un correo válido')
    .required('El correo es obligatorio'),
  telefono: Yup.string()
    .matches(/^\d{10}$/, 'El teléfono debe tener 10 dígitos')
    .required('El teléfono es obligatorio'),
  extension: Yup.string().nullable(),
  fecha_registro: Yup.string()
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
    .max(250, 'El nombre del proyecto debe tener máximo 250 caracteres')
    .required('El nombre del proyecto es obligatorio'),
  descripcion_proyecto: Yup.string()
    .max(1000, 'La descripción del proyecto debe tener máximo 1000 caracteres')
    .required('La descripción del proyecto es obligatoria'),
  situacion_actual: Yup.string()
    .max(1000, 'El análisis de la situación actual debe tener máximo 1000 caracteres')
    .required('El análisis de la situación actual es obligatorio'),
  tipo_obra: Yup.string()
    .required('El tipo de obra es obligatorio'),
  calendario_ejecucion: Yup.string()
    .required('El calendario de ejecución es obligatorio'),
  beneficio_social: Yup.string()
    .max(500, 'El beneficio social debe tener máximo 500 caracteres')
    .required('El beneficio social es obligatorio'),
  beneficio_economico: Yup.string()
    .max(500, 'El beneficio económico debe tener máximo 500 caracteres')
    .required('El beneficio económico es obligatorio'),
  numero_beneficiarios: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .required('El número de beneficiarios es obligatorio'),
  inversion_presupuestada: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('La inversión presupuestada es obligatoria'),
  cobertura: Yup.string()
    .required('La cobertura es obligatoria'),
  ods: Yup.string()
    .required('Los objetivos de desarrollo sostenible son obligatorios'),
  plan_estatal: Yup.string()
    .required('El plan estatal de desarrollo es obligatorio'),
  programa_sectorial: Yup.string(),
  propuesta_campana: Yup.string()
    .required('Debes indicar si se relaciona con una propuesta de campaña'),
  cual_propuesta: Yup.string(),
  prioridad: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .required('La prioridad es obligatoria'),
});

export default validationSchemaCedula;
