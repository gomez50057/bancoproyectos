import * as Yup from 'yup';

// Esquema de validación con Yup
export const validationSchema = Yup.object().shape({
  nombre_dependencia: Yup.string().required('El nombre de la dependencia es obligatorio'),
  area_adscripcion: Yup.string().required('El área de adscripción es obligatoria'),
  nombre_registrante: Yup.string().required('El nombre del registrante es obligatorio'),
  apellido_paterno: Yup.string().required('El apellido paterno es obligatorio'),
  apellido_materno: Yup.string().required('El apellido materno es obligatorio'),
  correo: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  telefono: Yup.string()
    .matches(/^[0-9]{10}$/, 'El número de teléfono debe tener 10 dígitos')
    .required('El teléfono es obligatorio'),
  // fecha_registro: Yup.date().required('La fecha de registro es obligatoria'),
  // ejercicio_fiscal: Yup.string().required('El ejercicio fiscal es obligatorio'),
  // dependencia: Yup.string().required('La dependencia es obligatoria'),
  // organismo: Yup.string().required('El organismo es obligatorio'),
  // unidad_responsable: Yup.string().required('La unidad responsable es obligatoria'),
  // unidad_presupuestal: Yup.string().required('La unidad presupuestal es obligatoria'),
  nombre_proyecto: Yup.string().max(250, 'Máximo 250 caracteres').required('El nombre del proyecto es obligatorio'),
  descripcion_proyecto: Yup.string().max(1000, 'Máximo 1000 caracteres').required('La descripción del proyecto es obligatoria'),
  situacion_actual: Yup.string().max(1000, 'Máximo 1000 caracteres').required('El análisis de la situación actual es obligatorio'),
  // tipo_obra: Yup.string().required('El tipo de obra es obligatorio'),
  // calendario_ejecucion: Yup.string().required('El calendario de ejecución es obligatorio'),
  beneficio_social: Yup.string().max(500, 'Máximo 500 caracteres').required('El beneficio social es obligatorio'),
  beneficio_economico: Yup.string().max(500, 'Máximo 500 caracteres').required('El beneficio económico es obligatorio'),
  numero_beneficiarios: Yup.string()
    .matches(/^[0-9]+$/, 'El número de beneficiarios debe ser un número')
    .required('El número de beneficiarios es obligatorio'),
  inversion_presupuestada: Yup.string()
    .matches(/^[0-9]+$/, 'La inversión presupuestada debe ser un número positivo')
    .required('La inversión presupuestada es obligatoria'),
  // cobertura: Yup.string().required('La cobertura es obligatoria'),

  // linea_accion_ped: Yup.string().nullable(),

  // Validación de los campos obligatorios que mencionaste
  // estudios_factibilidad: Yup.array().nullable(),
  // analisis_alternativas: Yup.array().nullable(),
  // validacion_normativa: Yup.array().nullable(),
  // liberacion_derecho_via: Yup.array().nullable(),
  // analisis_costo_beneficio: Yup.array().nullable(),
  // expediente_tecnico_docu: Yup.array().nullable(),
  // proyecto_ejecutivo: Yup.array().nullable(),
  // manifestacion_impacto_ambiental: Yup.array().nullable(),
  // fotografia_render_proyecto: Yup.array().nullable(),
  // otros_estudios: Yup.array().nullable(),
});
