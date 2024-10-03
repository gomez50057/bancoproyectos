import * as Yup from 'yup';

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
  telefonoOficina: Yup.string().matches(/^\d{10}$/, 'El teléfono de oficina debe tener exactamente 10 dígitos, solo números').required('El teléfono de oficina es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  telefonoOficinaExt: Yup.string().matches(/^\d+$/, 'Solo se permiten números').required('La extensión es obligatoria').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  correoPersonal: Yup.string().email('Correo electrónico no válido').required('El correo personal es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
  telefonoParticular: Yup.string().matches(/^\d{10}$/, 'El teléfono particular debe tener exactamente 10 dígitos, solo números').required('El teléfono particular es obligatorio').test('no-spaces', 'No se permiten espacios en blanco', noSpacesValidation),
});

export default validationSchemaStep1;



