// utils.js

export const getCsrfToken = () => {
  let csrfToken = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === 'csrftoken=') {
        csrfToken = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return csrfToken;
};



export const municipiosPorRegion = {
  '01.Tula': [
    '005 Ajacuba', '010 Atitalaquia', '013 Atotonilco de Tula', '063 Tepeji del Río de Ocampo',
    '064 Tepetitlán', '065 Tetepango', '067 Tezontepec de Aldama', '070 Tlahuelilpan', '074 Tlaxcoapan', '076 Tula de Allende'
  ],
  '02.Tulancingo': [
    '001 Acatlán', '002 Acaxochitlán', '004 Agua Blanca de Iturbide', '016 Cuautepec de Hinojosa', '027 Huehuetla',
    '035 Metepec', '053 San Bartolo Tutotepec', '056 Santiago Tulantepec de Lugo Guerrero', '057 Singuilucan', '060 Tenango de Doria', '077 Tulancingo de Bravo'
  ],
  '03.Pachuca': ['048 Pachuca de Soto', '052 San Agustin Tlaxiaca', '082 Zapotlán de Juárez'],
  '04.Huejutla': [
    '028 Huejutla de Reyes', '011 Atlapexco', '014 Calnali', '025 Huautla', '026 Huazalingo', '032 Jaltocán', '034 Lolotla',
    '046 San Felipe Orizatlán', '073 Tlanchinol', '078 Xochiatipan', '080 Yahualica'
  ],
  '05.Mineral de la Reforma': [
    '051 Mineral de la Reforma', '022 Epazoyucan', '024 Huasca de Ocampo', '038 Mineral del Chico', '039 Mineral del Monte', '045 Omitlán de Juárez'
  ],
  '06.Tizayuca': ['069 Tizayuca', '066 Villa de Tezontepec', '075 Tolcayuca', '083 Zempoala'],
  '07.Actopan': [
    '003 Actopan', '009 El Arenal', '023 Francisco I. Madero', '041 Mixquiahuala de Juárez', '050 Progreso de Obregón',
    '054 San Salvador', '055 Santiago de Anaya'
  ],
  '08.Ixmiquilpan': [
    '030 Ixmiquilpan', '006 Alfajayucan', '015 Cardonal', '019 Chilcuautla', '043 Nicolás Flores', '058 Tasquillo', '084 Zimapán'
  ],
  '09.Zacualtipán': [
    '081 Zacualtipán de Ángeles', '012 Atotonilco el Grande', '020 Eloxochitlán', '033 Juárez Hidalgo',
    '036 San Agustín Metzquititlán', '037 Metztitlán', '042 Molango de Escamilla', '062 Tepehuacán de Guerrero',
    '068 Tianguistengo', '071 Tlahuiltepa', '079 Xochicoatlán'
  ],
  '10.Apan': [
    '008 Apan', '007 Almoloya', '021 Emiliano Zapata', '061 Tepeapulco', '072 Tlanalapa'
  ],
  '11.Huichapan': [
    '029 Huichapan', '017 Chapantongo', '044 Nopala de Villagrán', '059 Tecozautla'
  ],
  '12.Jacala': [
    '031 Jacala de Ledezma', '018 Chapulhuacán', '040 La Misión', '047 Pacula', '049 Pisaflores'
  ]
};

export const municipiosDeHidalgo = [
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

export const unidadesResponsables = [
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

export const dependencias = [
  'Secretaría del Despacho del Gobernador', 'Oficialía Mayor', 'Unidad de Planeación y Prospectiva',
  'Secretaría de Gobierno', 'Secretaría de Hacienda', 'Secretaría de Bienestar e Inclusión Social',
  'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible', 'Secretaría de Desarrollo Económico',
  'Secretaría de Medio Ambiente y Recursos Naturales', 'Secretaría de Agricultura y Desarrollo Rural',
  'Secretaría de Turismo', 'Secretaría de Contraloría', 'Secretaría de Educación Pública',
  'Secretaría de Salud', 'Secretaría de Seguridad Pública', 'Secretaría del Trabajo y Previsión Social',
  'Secretaría de Movilidad y Transporte', 'Secretaría de Cultura', 'Procuraduría de General de Justicia'
];

export const organismos = [
  'Centro de Justicia para Mujeres del Estado de Hidalgo', 'Ciudad de las Mujeres', 'Instituto Hidalguense de las Mujeres',
  'Instituto Hidalguense para el Desarrollo Municipal', 'Instituto Catastral del Estado de Hidalgo',
  'Instituto para Devolver al Pueblo lo Robado', 'Centro Estatal de Maquinaria para el Desarrollo',
  'Comisión de Agua y Alcantarillado del Sistema Valle del Mezquital', 'Comisión de Agua y Alcantarillado de Sistemas Intermunicipales',
  'Comisión Estatal del Agua y Alcantarillado', 'Comisión Estatal de Vivienda', 'Policía Industrial Bancaria del Estado de Hidalgo',
  'Consejo Estatal para la Cultura y las Artes de Hidalgo', 'Escuela de Música del Estado de Hidalgo',
  'Servicios de Salud de Hidalgo', 'Agencia de Desarrollo Valle de Plata', 'Agencia Estatal de Energía',
  'Corporación de Fomento de Infraestructura Industrial', 'Corporación Internacional Hidalgo',
  'Instituto Hidalguense de Competitividad Empresarial', 'Comisión Estatal de Biodiversidad de Hidalgo',
  'Centro de Conciliación Laboral del Estado de Hidalgo', 'Instituto de Capacitación para el Trabajo del Estado de Hidalgo',
  'Operadora de Eventos del Estado de Hidalgo', 'Bachillerato del Estado de Hidalgo',
  'Colegio de Bachilleres del Estado de Hidalgo', 'Colegio de Educación Profesional Técnica del Estado de Hidalgo',
  'Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo', 'El Colegio del Estado de Hidalgo',
  'Instituto Hidalguense de Educación', 'Instituto Hidalguense de Educación para Adultos',
  'Instituto Hidalguense de Financiamiento a la Educación Superior', 'Instituto Hidalguense de la Infraestructura Física Educativa',
  'Instituto Hidalguense del Deporte', 'Instituto Tecnológico Superior de Huichapan',
  'Instituto Tecnológico Superior del Occidente del Estado de Hidalgo', 'Instituto Tecnológico Superior del Oriente del Estado de Hidalgo',
  'Radio y Televisión de Hidalgo', 'Universidad Intercultural del Estado de Hidalgo',
  'Universidad Politécnica de Francisco I. Madero', 'Universidad Politécnica de Huejutla',
  'Universidad Politécnica de la Energía', 'Universidad Politécnica de Pachuca',
  'Universidad Politécnica de Tulancingo', 'Universidad Politécnica Metropolitana de Hidalgo',
  'Universidad Tecnológica de la Huasteca Hidalguense', 'Universidad Tecnológica de la Sierra Hidalguense',
  'Universidad Tecnológica de la Zona Metropolitana del Valle de México', 'Universidad Tecnológica de Mineral de la Reforma',
  'Universidad Tecnológica de Tulancingo', 'Universidad Tecnológica de Tula-Tepeji',
  'Universidad Tecnológica del Valle del Mezquital', 'Universidad Tecnológica Minera de Zimapán',
  'Instituto Hidalguense de la Juventud', 'Instituto para la Atención de las y los Adultos Mayores del Estado de Hidalgo',
  'Sistema de Convencional', 'Sistema de Masivo', 'Comisión Estatal Para el Desarrollo Sostenible de los Pueblos Indígenas',
  'Consejo de Ciencia, Tecnología e Innovación de Hidalgo', 'Consejo Rector de Pachuca Ciudad del Conocimiento y la Cultura',
  'Museo Interactivo para la Niñez y la Juventud "El Rehilete"', 'Secretaría Técnica del Sistema Estatal Anticorrupción',
  'Distrito de Educación, Salud, Ciencia, Tecnología e Innovación', 'Sistema para el Desarrollo Integral de las Familia del Estado de Hidalgo',
  'Universidad Digital del Estado de Hidalgo'
];

export const ramoPresupuestalOptions = [
  {
    label: 'Ramos Autónomos',
    options: [
      { value: 'Legislativo', label: 'Legislativo' },
      { value: 'Judicial', label: 'Judicial' },
      { value: 'Electoral', label: 'Electoral' },
      { value: 'Derechos Humanos', label: 'Derechos Humanos' },
      { value: 'Acceso a la Información Pública Gubernamental', label: 'Acceso a la Información Pública Gubernamental' },
      { value: 'Justicia Electoral', label: 'Justicia Electoral' },
    ],
  },
  {
    label: 'Ramos Administrativos',
    options: [
      { value: 'Despacho del Poder Ejecutivo', label: 'Despacho del Poder Ejecutivo' },
      { value: 'Gobierno', label: 'Gobierno' },
      { value: 'Hacienda Pública', label: 'Hacienda Pública' },
      { value: 'Bienestar e Inclusión Social', label: 'Bienestar e Inclusión Social' },
      { value: 'Infraestructura Pública y Desarrollo Urbano Sostenible', label: 'Infraestructura Pública y Desarrollo Urbano Sostenible' },
      { value: 'Medio Ambiente y Recursos Naturales', label: 'Medio Ambiente y Recursos Naturales' },
      { value: 'Desarrollo Económico', label: 'Desarrollo Económico' },
      { value: 'Agricultura y Desarrollo Rural', label: 'Agricultura y Desarrollo Rural' },
      { value: 'Turismo', label: 'Turismo' },
      { value: 'Contraloría', label: 'Contraloría' },
      { value: 'Educación Pública', label: 'Educación Pública' },
      { value: 'Salud', label: 'Salud' },
      { value: 'Seguridad Pública', label: 'Seguridad Pública' },
      { value: 'Trabajo y Previsión Social', label: 'Trabajo y Previsión Social' },
      { value: 'Movilidad y Transporte', label: 'Movilidad y Transporte' },
      { value: 'Cultura', label: 'Cultura' },
      { value: 'Planeación y Prospectiva', label: 'Planeación y Prospectiva' },
      { value: 'Administración', label: 'Administración' },
      { value: 'Justicia', label: 'Justicia' },
    ],
  },
  {
    label: 'Ramos Generales',
    options: [
      { value: 'Transferencias', label: 'Transferencias' },
      { value: 'Participaciones a Municipios', label: 'Participaciones a Municipios' },
      { value: 'Contingencias', label: 'Contingencias' },
      { value: 'Provisiones Salariales', label: 'Provisiones Salariales' },
      { value: 'Deuda Pública', label: 'Deuda Pública' },
      { value: 'Adeudos de Ejercicios Fiscales Anteriores', label: 'Adeudos de Ejercicios Fiscales Anteriores' },
      { value: 'Aportaciones a Municipios', label: 'Aportaciones a Municipios' },
      { value: 'Erogaciones para las Operaciones y Programas de Saneamiento Financiero', label: 'Erogaciones para las Operaciones y Programas de Saneamiento Financiero' },
      { value: 'Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca', label: 'Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca' },
      { value: 'Inversión en Municipios', label: 'Inversión en Municipios' },
    ],
  },
];

export const unidadPresupuestalPorUnidadResponsable = {
  '01.Poder Legislativo': [
    '01.Presidencia de la Junta de Gobierno',
    '02.Asamblea del Congreso',
    '03.Secretaría de Servicios Legislativos',
    '04.Auditoría Superior del Estado de Hidalgo',
    '05.Dirección General de Servicios Administrativos',
    '06.Coordinación de Asesoría',
    '07.Instituto de Estudios Legislativos',
    '08.Instituto para el Desarrollo y Fortalecimiento Municipal',
    '09.Dirección de Comunicación Social',
    '10.Comisión para la revisión integral del marco legal del Estado de Hidalgo'
  ],
  '02.Poder Judicial': [
    '01.Tribunal Superior de Justicia',
    '03.Tribunal de Justicia Administrativa'
  ],
  '03.Instituto Estatal Electoral': [
    '01.Instituto Estatal Electoral'
  ],
  '04.Comisión de Derechos Humanos del Estado': [
    '01.Comisión de Derechos Humanos del Estado'
  ],
  '05.Instituto de Transparencia, Acceso a la Información Pública Gubernamental y Protección de Datos Personales del Estado de Hidalgo': [
    '01.Instituto de Transparencia, Acceso a la Información Pública Gubernamental y Protección de Datos Personales del Estado de Hidalgo'
  ],
  '06.Tribunal Electoral del Estado de Hidalgo': [
    '01.Tribunal Electoral del Estado'
  ],
  '10.Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado': [
    '01.Secretaría del Despacho de la Persona Titular del Poder Ejecutivo del Estado',
    '02.Dirección General de Relaciones Públicas',
    '15.Secretaría Técnica del Despacho del Gobernador',
    '16.Dirección General de Estudios Legislativos',
    '17.Coordinación de Agenda y Audiencia Pública',
    '18.Dirección General de Giras',
    '19.Dirección General de Atención al Pueblo',
    '20.Dirección General de Desarrollo Institucional',
    '21.Coordinación de Seguimiento',
    '22.Coordinación de Gestión y Vinculación de Proyectos Especiales',
    '23.Coordinación de Operación Institucional'
  ],
  '11.Secretaría de Gobierno': [
    '01.Secretaría de Gobierno',
    '02.Subsecretaría de Gobernación',
    '04.Dirección General de Investigaciones Políticas y Sociales',
    '09.Dirección General de Asuntos Agrarios',
    '10.Subsecretaría de Gobierno en la Huasteca Hidalguense',
    '12.Subsecretaría de Gobierno en el Valle del Mezquital',
    '13.Subsecretaría de Desarrollo Político',
    '14.Dirección General de Desarrollo Político',
    '15.Coordinación General Jurídica',
    '16.Dirección General Jurídica',
    '17.Subsecretaría de Protección Civil y Gestión de Riesgos',
    '18.Dirección General de Protección Civil y Gestión de Riesgos',
    '19.Central Estatal de Información, Investigación e Inteligencia',
    '24.Consejo Estatal de Población',
    '27.Instituto de la Defensoría Pública del Estado de Hidalgo',
    '28.Dirección General del Mando Coordinado',
    '29.Dirección General del Instituto de la Función Registral',
    '30.Secretaría Ejecutiva del Sistema Estatal de Protección Integral de los derechos de Niñas, Niños y Adolescentes del Estado de Hidalgo',
    '31.Secretariado Ejecutivo del Consejo Estatal de Seguridad Pública',
    '33.Dirección General de Asuntos Religiosos',
    '34.Dirección General de Unidades de Servicios Estatales',
    '35.Coordinación General de Comunicación Gubernamental',
    '36.Dirección General de Derechos Humanos',
    '37.Dirección General del Registro del Estado Familiar',
    '38.Dirección General de Archivo General de Notarías',
    '39.Comisión de Búsqueda de Personas del Estado de Hidalgo',
    '40.Dirección General Editorial'
  ],
  '12.Secretaría de Hacienda': [
    '01.Secretaría de Hacienda',
    '02.Coordinación de Planeación Financiera',
    '03.Procuraduría Fiscal del Estado de Hidalgo',
    '05.Unidad Técnica de Evaluación del Desempeño',
    '08.Subsecretaría de Egresos',
    '09.Dirección General de Contabilidad Gubernamental',
    '10.Dirección General de Tesorería',
    '11.Dirección General de Normatividad Contable Presupuestal',
    '13.Dirección General de Atención y Seguimiento a Auditorías',
    '14.Subsecretaría de Ingresos',
    '15.Dirección General de Auditoría Fiscal',
    '16.Dirección General de Recaudación',
    '23.Coordinación de Tecnologías de la Información',
    '25.Dirección General de Atención al Contribuyente',
    '26.Coordinación del Gasto de Inversión',
    '27.Subsecretaría de Programación y Presupuesto del Gasto de Inversión',
    '28.Dirección General de Programación',
    '29.Dirección General de Validación Técnica de Estudios y Proyectos',
    '30.Dirección General de Monitoreo y Seguimiento al Recurso Público',
    '31.Coordinación de Representación Institucional',
    '32.Unidad de Inteligencia Patrimonial y Económica',
    '33.Dirección General de Administración'
  ],
  '13.Secretaría de Bienestar e Inclusión Social': [
    '01.Secretaría de Bienestar e Inclusión Social',
    '04.Dirección General de Fomento Artesanal',
    '05.Subsecretaría de Inclusión y Desarrollo',
    '06.Dirección General de Operación y Logística de Programas',
    '07.Dirección General de Atención al Migrante',
    '08.Dirección General de Asistencia, Atención y Protección',
    '12.Dirección General de Prospectiva, Planeación y Evaluación de los Programas Sociales',
    '13.Subsecretaría de Participación Social y Fomento Artesanal',
    '14.Dirección General de Inclusión para las Personas con Discapacidad',
    '15.Subsecretaría de Desarrollo Social y Humano'
  ],
  '15.Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible': [
    '01.Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible',
    '02.Subsecretaría de Infraestructura Pública',
    '03.Dirección General de Obras Públicas e Infraestructura',
    '04.Dirección General de Infraestructura y Vías de Comunicación',
    '05.Dirección General de Conservación de Carreteras Estatales',
    '06.Subsecretaría de Desarrollo Urbano Sostenible',
    '07.Dirección General de Imagen y Desarrollo Urbano Sostenible',
    '08.Subsecretaría de Gestión de Proyectos',
    '09.Dirección General de Estudios y Proyectos',
    '10.Dirección General de Supervisión Estratégica y Evaluación',
    '11.Dirección General de Tecnologías de Información y Mejora Continua',
    '12.Dirección General de Asuntos Jurídicos',
    '13.Dirección General de Administración',
    '14.Dirección General de Atención y Vinculación Institucional'
  ],
  '16.Secretaría de Medio Ambiente y Recursos Naturales': [
    '01.Secretaría de Medio Ambiente y Recursos Naturales',
    '02.Subsecretaría de Política Ambiental',
    '03.Dirección General de Ordenamiento Ecológico Territorial',
    '04.Dirección General de Recursos Naturales',
    '06.Dirección General de Gestión de Calidad del Aire',
    '07.Consejo de Administración del Parque Nacional "El Chico"',
    '09.Procuraduría Estatal de Protección al Ambiente',
    '10.Dirección General de Normatividad Ambiental',
    '11.Dirección General de Cuencas y Planeación Hídrica',
    '12.Subsecretaría de Sustentabilidad y Cambio Climático',
    '13.Dirección General de Cambio Climático'
  ],
  '17.Secretaría de Desarrollo Económico': [
    '01.Secretaría de Desarrollo Económico',
    '02.Subsecretaría de Inversiones y Economía Sectorial',
    '03.Dirección General de Economía Sectorial',
    '04.Dirección General de Inversiones',
    '05.Subsecretaría de Fomento Económico',
    '06.Dirección General de Fomento al Empleo',
    '07.Dirección General de Fomento Económico'
  ],
  '18.Secretaría de Agricultura y Desarrollo Rural': [
    '01.Secretaría de Agricultura y Desarrollo Rural',
    '02.Subsecretaría de Desarrollo Agropecuario',
    '03.Dirección General de Agricultura',
    '04.Dirección General de Ganadería',
    '07.Dirección General de Desarrollo Rural',
    '08.Dirección General de Silvicultura, Fruticultura, Acuacultura y del Maguey',
    '09.Dirección General de Infraestructura y Maquinaria',
    '10.Subsecretaría de Agronegocios',
    '11.Dirección General de Comercialización y Mercadotecnia',
    '12.Subsecretaría de Planeación y Evaluación Sectorial',
    '13.Dirección General de Evaluación y Programas Estratégicos',
    '14.Dirección General de Fomento al Crédito',
    '15.Dirección General de Fomento Lechero',
    '16.Dirección General de Desarrollo de la Cafeticultura'
  ],
  '19.Secretaría de Turismo': [
    '01.Secretaría de Turismo',
    '02.Dirección General de Productos Turísticos y Pueblos Mágicos',
    '04.Dirección General de Promoción y Mercadotecnia',
    '05.Dirección General de Formación y Competitividad Turística',
    '06.Dirección General de Programas Turísticos y Alianzas Estratégicas',
    '07.Dirección de Planeación y Evaluación',
    '08.Subsecretaría de Turismo',
    '09.Dirección de Innovación, Desarrollo de Productos Turísticos e Infraestructura'
  ],
  '20.Secretaría de Contraloría': [
    '01.Secretaría de Contraloría',
    '02.Dirección General de Órganos de Control y Vigilancia',
    '03.Dirección General de Inspección y Vigilancia de Obras y Acciones',
    '08.Dirección General de Normatividad',
    '10.Dirección General de Responsabilidades Administrativas',
    '11.Dirección General de Vinculación',
    '12.Dirección General de Auditoría Gubernamental'
  ],
  '21.Secretaría de Educación Pública': [
    '01.Secretaría de Educación Pública',
    '02.Subsecretaría de Administración y Finanzas',
    '03.Subsecretaría de Educación Básica',
    '04.Subsecretaría de Educación Media Superior y Superior',
    '05.Subsecretaría de Planeación y Evaluación',
    '06.Centro Estatal de Lenguas y Culturas Indígenas'
  ],
  '22.Secretaría de Salud': [
    '01.Secretaría de Salud',
    '02.Subsecretaría de Salud Pública',
    '03.Subsecretaría de Servicios de Salud',
    '04.Subsecretaría de Administración, Finanzas y Planeación',
    '07.Comisión de Arbitraje Médico del Estado de Hidalgo',
    '14.Comisión para la Protección contra Riesgos Sanitarios del Estado de Hidalgo',
    '17.Dirección General de Proyectos Estratégicos de Salud',
    '20.Centro Estatal de Trasplantes de Órganos, Tejidos y Células de Humanos para el Estado de Hidalgo'
  ],
  '23.Secretaría de Seguridad Pública': [
    '01.Secretaría de Seguridad Pública',
    '02.Subsecretaría de Prevención y Reinserción Social',
    '03.Dirección General de Prevención y Reinserción Social',
    '04.Subsecretaría de C5i',
    '05.Dirección General de Servicios Aéreos',
    '06.Subsecretaría de Prevención y Coordinación Institucional',
    '07.Dirección General del Centro Estatal de Prevención Social de la Violencia y la Delincuencia',
    '08.Dirección General de Asuntos Jurídicos y Derechos Humanos',
    '10.Subsecretaría de Operación Policial',
    '15.Instituto de Formación Profesional',
    '16.Centro Estatal de Evaluación y Control de Confianza',
    '17.Unidad de Medidas Cautelares',
    '18.Dirección General de Ayudantía Personal',
    '19.Dirección General de Supervisión e Inspección Interna'
  ],
  '24.Secretaría del Trabajo y Previsión Social': [
    '01.Secretaría del Trabajo y Previsión Social',
    '02.Dirección General del Trabajo y Previsión Social',
    '03.Dirección General del Servicio Nacional de Empleo',
    '04.Junta Local de Conciliación y Arbitraje',
    '05.Tribunal de Arbitraje',
    '06.Procuraduría Estatal de la Defensa del Trabajo'
  ],
  '26.Secretaría de Movilidad y Transporte': [
    '01.Secretaría de Movilidad y Transporte',
    '02.Subsecretaría de Movilidad y Transporte',
    '03.Dirección General de Normatividad',
    '04.Dirección General de Movilidad Sustentable'
  ],
  '27.Secretaría de Cultura': [
    '01.Secretaría de Cultura',
    '02.Dirección General de Diversidad Cultural y Fomento a la Lectura, Escritura y Oralidad',
    '04.Dirección General de Cultura Digital',
    '06.Dirección General de Vinculación, Programación y Difusión Cultural',
    '07.Subsecretaría de Desarrollo Cultural',
    '08.Dirección General de Cultura Originaria, Popular y Urbana',
    '10.Dirección General de Patrimonio Cultural'
  ],
  '28.Unidad de Planeación y Prospectiva': [
    '01.Unidad de Planeación y Prospectiva',
    '03.Coordinación General de Normatividad y Entidades Paraestatales',
    '04.Dirección General de Consulta y Normatividad',
    '05.Dirección General de Control y Seguimiento a Entidades Paraestatales',
    '07.Coordinación General de Planeación y Proyectos',
    '08.Dirección General de Análisis Geográfico y Mejora a las Políticas Públicas',
    '09.Dirección General de Planeación y Participación Ciudadana',
    '10.Dirección General de Desarrollo Regional y Metropolitano',
    '11.Coordinación General de Evaluación y Políticas Públicas',
    '12.Dirección General de Evaluación',
    '14.Dirección General de Monitoreo',
    '15.Dirección General de Percepción e Impacto Ciudadano',
    '16.Dirección General de Proyectos, Estudios y Prospectiva',
    '17.Comisión Estatal de Mejora Regulatoria'
  ],
  '29.Oficialía Mayor': [
    '01.Oficialía Mayor',
    '02.Dirección General de Compras Públicas',
    '03.Dirección General de Patrimonio Inmobiliario',
    '04.Dirección General de Recursos Materiales y Servicios',
    '05.Dirección General de Recursos Humanos',
    '07.Archivo General del Estado de Hidalgo',
    '08.Dirección General de Innovación Gubernamental',
    '09.Coordinación General de la Oficialía Mayor'
  ],
  '30.Procuraduría General de Justicia': [
    '01.Procuraduría General de Justicia',
    '02.Subprocuraduría Oriente',
    '04.Dirección General del Sistema Mixto',
    '05.Fiscalía Especializada en Delitos Electorales',
    '06.Subprocuraduría de Delitos de Género, Desaparición de Personas e Impacto Social',
    '09.Visitaduría General',
    '12.Unidad Especializada en el Combate al Secuestro',
    '13.Oficialía Mayor',
    '15.Subprocuraduría Poniente',
    '23.Fiscalía Especializada en Delitos de Corrupción',
    '25.Subprocuraduría Jurídica y de Derechos Humanos',
    '26.Unidad de Recuperación de Vehículos',
    '27.Agencia de investigación Criminal',
    '28.Centro de Justicia Restaurativa',
    '29.Órgano Interno de Control'
  ],
  '40.Organismos Descentralizados': [
    '01.Radio y Televisión de Hidalgo',
    '03.Instituto Hidalguense para el Desarrollo Municipal',
    '05.Instituto Catastral del Estado de Hidalgo',
    '07.Instituto Hidalguense de las Mujeres',
    '08.Instituto Hidalguense de la Juventud',
    '09.Instituto para la Atención de las y los Adultos Mayores del Estado de Hidalgo',
    '14.Centro Estatal de Maquinaria para el Desarrollo',
    '16.Comisión Estatal de Vivienda',
    '18.Comisión Estatal del Agua y Alcantarillado',
    '19.Comisión de Agua y Alcantarillado de Sistemas Intermunicipales',
    '20.Comisión de Agua y Alcantarillado del Sistema Valle del Mezquital',
    '21.Instituto de Vivienda, Desarrollo Urbano y Asentamientos Humanos',
    '22.Sistema de Autopistas, Servicios Conexos y Auxiliares del Estado de Hidalgo',
    '23.Corporación Internacional Hidalgo',
    '24.Corporación de Fomento de Infraestructura Industrial',
    '26.Operadora de Eventos del Estado de Hidalgo',
    '27.Instituto Hidalguense de Competitividad Empresarial',
    '28.Agencia de Desarrollo Valle de Plata',
    '34.Consejo Estatal para la Cultura y las Artes de Hidalgo',
    '36.Instituto Hidalguense de Educación',
    '38.Instituto Hidalguense de Educación para Adultos',
    '39.Universidad Politécnica de Tulancingo',
    '40.Universidad Politécnica de Pachuca',
    '41.Universidad Politécnica de Francisco I. Madero',
    '42.Universidad Politécnica de Huejutla',
    '43.Universidad Politécnica Metropolitana de Hidalgo',
    '44.Universidad Tecnológica de Tula–Tepeji',
    '45.Universidad Tecnológica de Tulancingo',
    '46.Universidad Tecnológica de la Huasteca Hidalguense',
    '47.Universidad Tecnológica del Valle del Mezquital',
    '48.Universidad Tecnológica de la Sierra Hidalguense',
    '49.Universidad Tecnológica de la Zona Metropolitana del Valle de México',
    '50.Instituto Tecnológico Superior de Huichapan',
    '51.Instituto Tecnológico Superior del Occidente del Estado de Hidalgo',
    '52.Instituto Tecnológico Superior del Oriente del Estado de Hidalgo',
    '53.Universidad Intercultural del Estado de Hidalgo',
    '54.Colegio de Bachilleres del Estado de Hidalgo',
    '55.Bachillerato del Estado de Hidalgo',
    '56.Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo',
    '57.Colegio de Educación Profesional Técnica del Estado de Hidalgo',
    '58.El Colegio del Estado de Hidalgo',
    '59.Escuela de Música del Estado de Hidalgo',
    '60.Instituto Hidalguense de Financiamiento a la Educación Superior',
    '61.Instituto Hidalguense del Deporte',
    '63.Instituto Hidalguense de la Infraestructura Física Educativa',
    '65.Servicios de Salud de Hidalgo',
    '68.Instituto de Capacitación para el Trabajo del Estado de Hidalgo',
    '69.Policía Industrial Bancaria del Estado de Hidalgo',
    '70.Centro de Justicia para Mujeres del Estado de Hidalgo',
    '71.Sistema de Transporte Convencional de Hidalgo',
    '72.Sistema Integrado de Transporte Masivo de Hidalgo',
    '73.Universidad Tecnológica Minera de Zimapán',
    '76.Universidad Tecnológica de Mineral de la Reforma',
    '77.Universidad Politécnica de la Energía',
    '80.Ciudad de las Mujeres',
    '81.Agencia Estatal de Energía de Hidalgo',
    '82.Centro de Conciliación Laboral del Estado de Hidalgo',
    '83.Comisión Estatal de Biodiversidad de Hidalgo',
    '84.Universidad Digital del Estado de Hidalgo',
    '85.Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo',
    '86.Instituto Hidalguense para Devolver al Pueblo lo Robado'
  ],
  '50.Organismos Descentralizados no Sectorizados': [
    '01.Secretaría Técnica del Sistema Estatal Anticorrupción de Hidalgo',
    '02.Sistema para el Desarrollo Integral de la Familia del Estado de Hidalgo',
    '03.Comisión Estatal para el Desarrollo Sostenible de los Pueblos Indígenas (CEDSPI)',
    '04.Consejo de Ciencia, Tecnología e Innovación de Hidalgo (CITNOVA)',
    '05.Universidad Autónoma del Estado de Hidalgo',
    '06.Museo Interactivo para la Niñez y la Juventud Hidalguense “El Rehilete”',
    '08.Consejo Ejecutivo del Complejo Científico y Tecnológico Sincrotrón en el Estado de Hidalgo',
    '09.Coordinación General del Distrito de Educación, Salud, Ciencia, Tecnología e Innovación'
  ],
  '60.Municipios': [
    '01.Acatlán',
    '02.Acaxochitlán',
    '03.Actopan',
    '04.Agua Blanca de Iturbide',
    '05.Ajacuba',
    '06.Alfajayucan',
    '07.Almoloya',
    '08.Apan',
    '09.El Arenal',
    '10.Atitalaquia',
    '11.Atlapexco',
    '12.Atotonilco el Grande',
    '13.Atotonilco de Tula',
    '14.Calnali',
    '15.Cardonal',
    '16.Cuautepec de Hinojosa',
    '17.Chapantongo',
    '18.Chapulhuacán',
    '19.Chilcuautla',
    '20.Eloxochitlán',
    '21.Emiliano Zapata',
    '22.Epazoyucan',
    '23.Francisco I. Madero',
    '24.Huasca de Ocampo',
    '25.Huautla',
    '26.Huazalingo',
    '27.Huehuetla',
    '28.Huejutla de Reyes',
    '29.Huichapan',
    '30.Ixmiquilpan',
    '31.Jacala de Ledezma',
    '32.Jaltocán',
    '33.Juárez Hidalgo',
    '34.Lolotla',
    '35.Metepec',
    '36.San Agustín Metzquititlán',
    '37.Metztitlán',
    '38.Mineral del Chico',
    '39.Mineral del Monte',
    '40.La Misión',
    '41.Mixquiahuala de Juárez',
    '42.Molango de Escamilla',
    '43.Nicolás Flores',
    '44.Nopala de Villagrán',
    '45.Omitlán de Juárez',
    '46.San Felipe Orizatlán',
    '47.Pacula',
    '48.Pachuca de Soto',
    '49.Pisaflores',
    '50.Progreso de Obregón',
    '51.Mineral de la Reforma',
    '52.San Agustín Tlaxiaca',
    '53.San Bartolo Tutotepec',
    '54.San Salvador',
    '55.Santiago de Anaya',
    '56.Santiago Tulantepec de Lugo Guerrero',
    '57.Singuilucan',
    '58.Tasquillo',
    '59.Tecozautla',
    '60.Tenango de Doria',
    '61.Tepeapulco',
    '62.Tepehuacán de Guerrero',
    '63.Tepeji del Río de Ocampo',
    '64.Tepetitlán',
    '65.Tetepango',
    '66.Villa de Tezontepec',
    '67.Tezontepec de Aldama',
    '68.Tianguistengo',
    '69.Tizayuca',
    '70.Tlahuelilpan',
    '71.Tlahuiltepa',
    '72.Tlanalapa',
    '73.Tlanchinol',
    '74.Tlaxcoapan',
    '75.Tolcayuca',
    '76.Tula de Allende',
    '77.Tulancingo de Bravo',
    '78.Xochiatipan',
    '79.Xochicoatlán',
    '80.Yahualica',
    '81.Zacualtipán de Ángeles',
    '82.Zapotlán de Juárez',
    '83.Zempoala',
    '84.Zimapán'
  ]
};

export const gastoProgramableOptions = [
  { label: '1. Gobierno', value: 'Gobierno' },
  { label: '2. Hacienda', value: 'Hacienda' },
  { label: '3. Bienestar e Inclusión Social', value: 'Bienestar e Inclusión Social' },
  { label: '4. Infraestructura Pública y Desarrollo Urbano Sostenible', value: 'Infraestructura Pública y Desarrollo Urbano Sostenible' },
  { label: '5. Medio Ambiente y Recursos Naturales', value: 'Medio Ambiente y Recursos Naturales' },
  { label: '6. Desarrollo Económico', value: 'Desarrollo Económico' },
  { label: '7. Agricultura y Desarrollo Rural', value: 'Agricultura y Desarrollo Rural' },
  { label: '8. Turismo Sostenible', value: 'Turismo Sostenible' },
  { label: '9. Contraloría', value: 'Contraloría' },
  { label: '10. Educación', value: 'Educación' },
  { label: '11. Salud', value: 'Salud' },
  { label: '12. Seguridad Pública', value: 'Seguridad Pública' },
  { label: '13. Trabajo y Previsión Social', value: 'Trabajo y Previsión Social' },
  { label: '14. Movilidad y Transporte', value: 'Movilidad y Transporte' },
  { label: '15. Cultura', value: 'Cultura' },
  { label: '16. Planeación y Prospectiva', value: 'Planeación y Prospectiva' },
  { label: '17. Oficialía Mayor', value: 'Oficialía Mayor' },
  { label: '18. Procuración de Justicia', value: 'Procuración de Justicia' },
  { label: '19. Organismos No Sectorizados', value: 'Organismos No Sectorizados' },
  { label: '20. Inversión', value: 'Inversión' },
  { label: '21. Otros', value: 'Otros' },
  { label: '22. Gasto No Programable', value: 'Gasto No Programable' }
];

export const programaPresupuestarioOptions = {
  '01.Gobierno': [
    '01.Gobernabilidad y Gobernanza',
    '02.Protección Civil y Gestión de Riesgos',
    '03.Certeza y Seguridad Jurídica',
    '04.Desarrollo de Capacidades Institucionales Municipales',
    '05.Población y Dinámica Demográfica',
    '06.Acceso de las Mujeres a una Vida Libre de Violencia (Justicia para las mujeres)',
    '07.Igualdad Sustantiva entre Mujeres y Hombres',
    '08.Desarrollo y Protección Integral de Niñas, Niños y Adolescentes',
    '09.Comunicación Gubernamental',
    '10.Acceso a la Reparación Integral del Daño a Víctimas del Delito y Violación a Derechos Humanos',
    '11.Búsqueda, localización e identificación de personas desaparecidas y no localizadas',
    '12.Preservación de la paz social'
  ],
  '02.Hacienda': [
    '01.Diseño y Conducción de la Política de Gasto',
    '02.Diseño y Conducción de la Política de Ingresos',
    '03.Desarrollo y Modernización Catastral',
    '04.Administración y Gestión de Activos',
    '05.Apoyo a la Función Pública y Buen Gobierno'
  ],
  '03.Bienestar e Inclusión Social': [
    '01.Acciones para Fortalecer el sector Desarrollo Social para el Bienestar',
    '02.Fomento Artesanal',
    '03.Atención a Migrantes',
    '04.Fomento al Desarrollo de la Participación Social para el Bienestar',
    '05.Inclusión para las Personas con Discapacidad',
    '06.Atención a Adultos Mayores',
    '07.Atención a la Juventud',
    '08.Apoyo para el Bienestar y el Desarrollo',
    '09.Bienestar de Madres Solteras',
    '10.Universalidad de la Pensión para el Bienestar de las Personas con Discapacidad',
    '11.Desarrollo Inclusivo',
    '12.Bienestar y Producción',
    '13.Atención al Pueblo'
  ],
  '04.Infraestructura Pública y Desarrollo Urbano Sostenible': [
    '01.Infraestructura Pública',
    '02.Gestión Sostenible del Territorio, Imagen Urbana y Espacios Públicos',
    '03.Vivienda Asequible',
    '04.Agua Potable y Saneamiento para Todas y Todos'
  ],
  '05.Medio Ambiente y Recursos Naturales': [
    '01.Planeación y Gestión Ambiental',
    '02.Preservación y Aprovechamiento Sostenible de la Biodiversidad y los Recursos Naturales',
    '03.Procuración y Acceso a la Justicia Ambiental',
    '04.Mitigación y Adaptación al Cambio Climático',
    '05.Manejo Integrado de Recursos Hídricos'
  ],
  '06.Desarrollo Económico': [
    '01.Fomento a la Actividad Económica con una Visión Regional',
    '02.Promoción, Instalación y Consolidación de Empresas Nacionales e Internacionales',
    '03.Fomento y Promoción del Desarrollo Energético',
    '04.Impulso a las MiPyMes y Emprendedores',
    '05.Transformando con la Juventud',
    '06.Tu Experiencia Transforma'
  ],
  '07.Agricultura y Desarrollo Rural': [
    '01.Desarrollo de la Agricultura',
    '02.Ganadería',
    '03.Desarrollo Rural',
    '04.Agronegocios y Fomento al Crédito',
    '05.Rescate de la Cafeticultura Hidalguense',
    '06.Fortalecimiento a la Cadena Productiva de Leche',
    '07.Desarrollo Agropecuario'
  ],
  '08.Turismo Sostenible': [
    '01.Mercadotecnia y Promoción Turística',
    '02.Capacitación y Certificación Turística',
    '03.Gestión de Desarrollo Turístico',
    '04.Planeación, promoción y operación de eventos artísticos, culturales y sociales.'
  ],
  '09.Contraloría': [
    '01.Fiscalización Estatal y Auditoría Gubernamental',
    '02.Inspección y Vigilancia de Obras y Acciones Públicas',
    '03.Responsabilidades Administrativas, Asuntos Jurídicos y Situación Patrimonial',
    '04.Mecanismos de Participación Social y Transparencia',
    '05.Regulación de Procedimientos de Contratación',
    '06.Control y Vigilancia de Dependencias y Entidades',
    '07.Coordinación de Funciones Sustantivas de Contraloría y Anticorrupción'
  ],
  '10.Educación': [
    '01.Educación Básica',
    '02.Educación Inclusiva y Equidad',
    '03.Gestión Educativa',
    '04.Educación Media Superior',
    '05.Educación Superior',
    '06.Cultura Física y Deporte',
    '07.Infraestructura Física Educativa',
    '08.Apoyos Sociales a la Educación',
    '09.Fortalecimiento a la Educación'
  ],
  '11.Salud': [
    '01.Conducción Sectorial en Salud',
    '02.Promoción y Rectoría de la Salud',
    '03.Fortalecimiento a la Prestación de Servicios de Salud Gratuitos'
  ],
  '12.Seguridad Pública': [
    '01.Prevención de las Causas del Delito',
    '02.Evaluación y Profesionalización de las Corporaciones Policiales Estatales y Municipales',
    '03.Atención, Combate al Delito y Seguridad Ciudadana',
    '04.Reinserción Social y Unidad de Medidas Cautelares'
  ],
  '13.Trabajo y Previsión Social': [
    '01.Impartición y Procuración de Justicia Laboral',
    '02.Vigilancia a las Disposiciones en Materia Laboral',
    '03.Vinculación Laboral',
    '04.Capacitación Laboral',
    '05.Conciliación Laboral'
  ],
  '14.Movilidad y Transporte': [
    '01.Movilidad y Transporte Sostenible',
    '02.Sistema Integrado de Transporte Masivo',
    '03.Transporte Convencional Regulado'
  ],
  '15.Cultura': [
    '01.Innovación y Cultura Digital',
    '02.Fortalecimiento de la Infraestructura Cultural',
    '03.Red Estatal de Bibliotecas y Fomento a la Lectura',
    '04.Investigaciones y Conservación del Patrimonio Cultural Material e Inmaterial',
    '05.Arte, Cultura, Interculturalidad, Difusión y Vinculación'
  ],
  '16.Planeación y Prospectiva': [
    '01.Planeación, Estudios y Proyectos para el Desarrollo Regional y Metropolitano',
    '02.Monitoreo y Evaluación de la Política Pública',
    '03.Normatividad, Concertación y Vinculación para la Planeación',
    '04.Mejora Regulatoria y Simplificación Administrativa'
  ],
  '17.Oficialía Mayor': [
    '01.Administración Eficiente de los Recursos para la Productividad Gubernamental',
    '02.Fortalecimiento del Patrimonio Público Estatal'
  ],
  '18.Procuración de Justicia': [
    '01.Gestión de la trazabilidad para la Procuración de Justicia',
    '02.Atención Especializada en Procesos Penales en Delitos de Alto Impacto',
    '03.Intervención de la Agencia de Investigación Criminal',
    '04.Intervención de los Procedimientos Penales Regionales'
  ],
  '19.Organismos No Sectorizados': [
    '01.Fortalecimiento del Sistema Estatal Anticorrupción',
    '02.Atención a Pueblos Indígenas',
    '03.La Salud es Primero',
    '04.Formación para Todas y Todos',
    '05.Alimentación para el Pueblo',
    '06.Cercanía con Grupos Prioritarios',
    '07.Desarrollo Científico, Tecnológico e Innovación de Alto Impacto para el Desarrollo de Sectores Estratégicos',
    '08.Desarrollo de Habilidades Formativas',
    '09.Educación para el Desarrollo Científico y Tecnológico'
  ],
  '22.Otros': [
    '01.Atención Integral de la Oficina del Titular del Ejecutivo Estatal al Pueblo Hidalguense',
    '02.Trabajos Legislativos',
    '03.Impartición de Justicia',
    '04.Organización y Desarrollo de Procesos Electorales',
    '05.Protección, Defensa, Promoción y Difusión de los Derechos Humanos',
    '06.Garantías en Transparencia, Acceso a la Información Pública Gubernamental y Protección de Datos',
    '07.Justicia en los Procesos Electorales'
  ]
  // '23.Gasto No Programable': [
  //   '01.Municipios',
  //   '02.Deuda',
  //   '03.Adeudos de Ejercicios Fiscales Anteriores (ADEFAS)'
  // ]  
};

export const indicadoresEstrategicosOptions = {
  'Acuerdo para un Gobierno Cercano, Justo y Honesto': [
    'Porcentaje de satisfacción general al realizar trámites, pagos y servicios generales',
    'Puntaje en la Dimensión de Democracia de los Ciudadanos del Índice de Desarrollo Democrático',
    'Posición en el Subíndice Gobiernos Eficientes y Eficaces del Índice de Competitividad',
    'Tasa de prevalencia de corrupción al realizar un trámite personal',
    'Porcentaje de la población de 18 años y más víctima de corrupción',
    'Índice de avance de implementación del PbR-SED',
    'Deuda pública como porcentaje del PIB Estatal',
    'Índice de Estado de Derecho en México',
    'Índice de Paz',
    'Tasa de incidencia delictiva',
    'Porcentaje de personas de 18 años y más que identifica a la policía estatal y considera algo efectivo o muy efectivo el trabajo de la policía estatal',
    'Índice Estatal de Desempeño de Procuradurías y Fiscalías'
  ],
  'Acuerdo para el Bienestar del Pueblo': [
    'Carencia por acceso a los servicios de salud',
    'Índice de Gobierno Abierto',
    'Porcentaje de población con carencia por acceso a la alimentación',
    'Índice de progreso social',
    'Tasa de variación del promedio de carencias sociales presentadas por las personas con discapacidad permanente que forman parte de la población objetivo',
    'Población de 60 y más años de edad, afiliada a alguna institución que brinda servicios de salud',
    'Porcentaje de jóvenes ocupados',
    'Índice de Intensidad Migratoria',
    'Tarjetas de residente permanente (trp) y tarjetas de residente temporal (trt) emitidas en Hidalgo',
    'Porcentaje de población indígena en situación de pobreza',
    'Población indígena con ingreso inferior a la línea de pobreza extrema por ingresos',
    'Brecha de género en la tasa de participación laboral',
    'Prevalencia de la violencia por tipo entre las mujeres de 15 años y más a lo largo de su vida',
    'Porcentaje de la población de 18 y más años de edad activa físicamente en tiempo libre según el nivel de suficiencia para obtener beneficios en la salud, por lugar de práctica físico deportiva.',
    'Tasa de mortalidad infantil',
    'Tasa de trabajo infantil'
  ],
  'Acuerdo para el Desarrollo Económico': [
    'Indicador Trimestral de la actividad económica Estatal',
    'Tasa de desempleo',
    'Tasa de informalidad',
    'Índice trimestral de la actividad económica del Estado de Hidalgo - sector primario',
    'Llegada de turistas (nacionales/internacionales)',
    'Estadía en el Estado',
    'Porcentaje de ocupación hotelera en la entidad',
    'Índice de recursos culturales',
    'Carencia por rezago educativo',
    'Eficiencia del Sistema Educativo Estatal',
    'Grado promedio de escolaridad'
  ],
  'Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora': [
    'Porcentaje de población con carencia por calidad y espacios de vivienda',
    'Longitud de la Red Nacional de Carreteras según superficie de rodamiento en Hidalgo',
    'Porcentaje de Instrumentos de Planeación de Ordenamiento Territorial y Desarrollo Urbano.',
    'Satisfacción con el transporte público',
    'Máximo de las concentraciones de los promedios móviles de 8 h de ozono',
    'Subíndice de Medio Ambiente del Índice de Competitividad Estatal'
  ]
};

export const indicadoresTacticosOptions = {
  'Secretaría del Despacho del Gobernador': [
    // Agrega las opciones aquí
  ],
  'Oficialía Mayor': [
    'Porcentaje de acciones de fortalecimiento institucional para las y los trabajadores del poder ejecutivo.',
    'Porcentaje de acciones para la modernización de la administración de los recursos humanos del poder ejecutivo.',
    'Porcentaje de acciones de cobertura de mantenimiento menor de inmuebles del poder ejecutivo.',
    'Porcentaje de acciones de regularización del patrimonio inmobiliario propiedad del gobierno del Estado.',
    'Porcentaje de acciones de capacitación para las y los servidores públicos del poder ejecutivo.',
    'Porcentaje de procesos de licitación pública transparentados oportunamente.',
    'Promedio de cumplimiento en materia de archivos en el estado de Hidalgo.',
    'Porcentaje de acciones de rediseño organizacional aplicadas en las dependencias y organismos de la administración pública.',
    'Porcentaje de sistemas, apps y portales gestionados.',
    'Porcentaje de acciones realizadas para la mejora de la gestión pública.'
  ],
  'Unidad de Planeación y Prospectiva': [
    'Porcentaje de instrumentos de planeación publicados en el estado de Hidalgo.',
    'Porcentaje de acuerdos vinculados derivados de las reuniones de gobernanza metropolitana.',
    'Porcentaje de proyectos con impacto regional que cuentan con análisis de congruencia para vinculación institucional.',
    'Índice anual de efectividad en el avance y cumplimiento de los objetivos y metas de los instrumentos de planeación.',
    'Razón entre el número de dictámenes y otros instrumentos de información generados a través de análisis estadísticos y geográficos, sobre el número total de instrumentos solicitados por las dependencias de la administración pública estatal.',
    'Porcentaje de asesorías jurídicas con respuesta generada.',
    'Porcentaje de cumplimiento en la implementación del marco regulatorio en las dependencias y entidades de la administración pública estatal y municipal.',
    'Porcentaje de avance de metas de los indicadores de los programas, proyectos y políticas públicas, de las dependencias y entidades para la toma de decisiones.'
  ],
  'Secretaría de Gobierno': [
    'Porcentaje sobre los asuntos socio-políticos atendidos que realizan los ciudadanos del estado de Hidalgo a la Subsecretaría de Desarrollo Político.',
    'Porcentaje de acciones concretadas del programa de trabajo del Secretariado Ejecutivo del Consejo Estatal de Seguridad Pública.',
    'Porcentaje de la población total mayor de 18 años del estado de Hidalgo atendida en trámites y servicios por la Dirección General de Unidades de Servicios Estatales.',
    'Esperanza de vida al nacer.',
    'Porcentaje de registros de nacimiento realizados de manera oportuna de niñas y niños del estado de Hidalgo.',
    'Porcentaje de asesoría jurídica otorgadas con calidad a personas de escasos recursos económicos.',
    'Trámites y servicios públicos atendidos por la Coordinación General Jurídica, para garantizar certeza jurídica a la ciudadanía hidalguense.',
    'Trámites y servicios públicos atendidos por la Coordinación General Jurídica, para garantizar certeza jurídica a la ciudadanía hidalguense.',
    'Tiempo promedio en la inscripción de escrituras públicas ante el Instituto de la Función Registral del estado de Hidalgo.',
    'Tiempo de expedición de solicitudes administrativas de trámites recepcionados en la Dirección General de Archivo General de Notarías.',
    'Porcentaje del avance de la incorporación de la transversalidad de la perspectiva de género.',
    'Porcentaje de servicios otorgados a mujeres y hombres que contribuyen a la igualdad sustantiva.',
    'Calificación promedio que las mujeres otorgan a los servicios recibidos en el Centro de Justicia para Mujeres del Estado de Hidalgo.',
    'Tasa de variación de recomendaciones de derechos humanos dirigidas a autoridades de la Administración Pública Estatal y aceptadas por la persona titular del poder ejecutivo del estado de Hidalgo.',
    'Porcentaje de unidades municipales de protección civil, con calificación mayor o igual a ochenta puntos para la obtención de constancias de participación en las capacitaciones en materia de protección civil.',
    'Razón de réplica de los contenidos gubernamentales a través de los diferentes canales de comunicación.',
    'Porcentaje de municipios que mejoran su desarrollo institucional a través del programa de desempeño municipal.',
    'Porcentaje de asociaciones religiosas informadas en el marco jurídico de libertad de creencias religiosas y su aplicación en la convivencia social, para abonar en la construcción de paz.',
    'Porcentaje de víctimas atendidas por delitos y violaciones a derechos humanos.',
    'Porcentaje de acciones y actividades de difusión para la de búsqueda y/o no localización de personas.',
    'Porcentaje de niñas, niños y adolescentes a los que les han vulnerado sus derechos, vinculados ante diversas dependencias o entidades para su atención.'
  ],
  'Secretaría de Hacienda': [
    'Porcentaje de los ingresos propios respecto al total de ingresos del estado.',
    'Porcentaje de recursos comprometidos respecto de los recursos federales etiquetados.',
    'Porcentaje de recursos obtenidos en subsidios y convenios respecto del total del gasto programable.',
    'Porcentaje de recursos destinados a inversión respecto del total del gasto programable',
    'Deuda pública Per Cápita.',
    'Porcentaje del gasto de operación respecto al Presupuesto de Egresos ejercido.',
    'Índice de acciones realizadas para contribuir a la consolidación del Presupuesto Basado en Resultados y del Sistema Estatal de Evaluación del Desempeño.'
  ],
  'Secretaría de Bienestar e Inclusión Social': [
    'Porcentaje de personas adultas mayores atendidas con acciones de atención gerontológica integral y ambulatoria.',
    'Porcentaje de personas beneficiadas con acciones de fomento para el desarrollo de la participación social para el bienestar.',
    'Porcentaje de personas en situación de pobreza atendidas con los programas de Pensión para el Bienestar.',
    'Porcentaje de personas con discapacidad total y permanente beneficiarias del programa que reciben apoyos económicos.',
    'Porcentaje de personas artesanas atendidas con apoyos gubernamentales.',
    'Porcentaje de población de 12 a 29 años con participación en el Programa de Atención a la Juventud.',
    'Porcentaje de atención integral a la población migrante hidalguense y sus familias.'
  ],
  'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible (SIP)': [
    'Porcentaje de kilómetros de vías de comunicación en el estado construidas, ampliadas y/o modernizadas',
    'Porcentaje de kilómetros de carreteras reconstruidas del estado en regulares y malas condiciones.',
    'Porcentaje de población atendida que presenta bajo y muy bajo grado de accesibilidad a carretera pavimentada, a través del Programa Construye tu Camino.',
    'Porcentaje de población atendida con infraestructura hidráulica.',
    'Porcentaje de población atendida con infraestructura de alcantarillado sanitario.',
    'Porcentaje del caudal tratado de aguas residuales por cada mil habitantes en el Estado.',
    'Porcentaje de instrumentos normativos actualizados en materia de ordenamiento territorial y desarrollo urbano.',
    'Porcentaje de población atendida con acciones de vivienda en municipios de alta y muy alta marginación.',
    'Porcentaje de población beneficiada con el rescate de espacios públicos, que contribuye a generar ciudades inclusivas, resilientes y sostenibles.'
  ],
  'Secretaría de Desarrollo Económico': [
    'Porcentaje de regiones del estado cubiertas con personas de 60 años o más que son beneficiadas con una beca económica.',
    'Porcentaje de jóvenes incorporados al mercado laboral.',
    'Porcentaje de unidades económicas de impacto significativo concretadas con vinculaciones.',
    'Empresas industriales capacitadas en la adopción de un modelo de economía circular.',
    'Porcentaje de empresas consolidadas con compradores internacionales.',
    'Porcentaje de MiPyMes que lograron contratarse con empresas tractoras.',
    'Porcentaje de cobertura de municipios apoyados con la implementación de estrategias para el fortalecimiento de la economía local.',
    'Tasa de crecimiento anual de los financiamientos otorgados a emprendedores, micro, pequeñas y medianas empresas.',
    'Porcentaje de cobertura de unidades económicas de la industria minera beneficiadas.',
    'Porcentaje de grupos sociales formalizados.',
    'Hectáreas con empresas instaladas y en operación en parques y zonas industriales.',
    'Porcentaje de cobertura de unidades económicas del sector abasto beneficiadas.',
    'Hectáreas urbanizadas para fortalecer el crecimiento de la industria transformadora y proyectos estratégicos.',
    'Proporción de energía renovable en el conjunto de fuentes energéticas del Estado de Hidalgo.',
    'Porcentaje de población beneficiada con conectividad a internet con despliegue de infraestructura en el Estado.'
  ],
  'Secretaría de Medio Ambiente y Recursos Naturales': [
    'Grado de presión sobre el recurso hídrico en Hidalgo.',
    'Porcentaje de convenios implementados para la elaboración de programas de ordenamiento ecológico territorial local.',
    'Porcentaje de regulación ambiental de unidades económicas de competencia estatal.',
    'Porcentaje de audiencias públicas atendidas en materia ambiental con nivel satisfactorio.',
    'Porcentaje de denuncias ciudadanas en materia ambiental por acuerdos de competencia atendidas con nivel satisfactorio.',
    'Porcentaje de vehículos con verificación vehicular aprobatoria.',
    'Porcentaje de avance en la implementación del Programa de Gestión para Mejorar la Calidad del Aire del Estado de Hidalgo.',
    'Porcentaje de residuos sólidos urbanos y de manejo especial manejados integralmente.',
    'Porcentaje de emisiones de gases de efecto invernadero mitigadas.',
    'Porcentaje de programas proambientales implementados.',
    'Porcentaje de superficie protegida por esquemas de conservación y manejo sostenible.',
    'Promedio de tiempo de respuesta en la atención de incendios forestales.',
    'Porcentaje de acuerdos/convenios implementados para aprovechar la ciencia e investigación en la atención de problemas ambientales.',
    'Promedio anual del Índice Estatal de Rendición de Cuentas de la SEMARNATH.',
    'Porcentaje de cumplimiento de las obligaciones en materia de transparencia y acceso a la información pública.'
  ],
  'Secretaría de Agricultura y Desarrollo Rural': [
    'Porcentaje de municipios integrados al Programa de Detección de Necesidades.',
    'Tasa de cambio anual de productores beneficiados por programas de inversión.',
    'Tasa de cambio anual de servicios de asistencia técnica.',
    'Porcentaje de municipios con grado de rezago social alto o medio impactados.',
    'Tasa de cambio anual de unidades de producción acuícola atendidas.',
    'Tasa de cambio anual de Unidades de Producción Pecuarias impactadas por programas de la secretaría.',
    'Cantidad de hectáreas reforestadas de café.',
    'Cantidad de hectáreas reforestadas de maguey.',
    'Cantidad de hectáreas reforestadas de árboles frutales.',
    'Porcentaje del estado cubierto por análisis de fertilidad de suelo.',
    'Tasa anual de cambio de unidades de producción certificadas en buenas prácticas.'
  ],
  'Secretaría de Turismo': [
    'Porcentaje de diagnósticos de potencialidad turística realizados.',
    'Porcentaje de acuerdos de las sesiones del Consejo Consultivo para el Desarrollo Turístico Sustentable de Hidalgo.',
    'Índice de diversificación de la oferta turística estatal.',
    'Porcentaje de cumplimiento de requisitos de la UNESCO para el Geoparque Mundial Comarca Minera.',
    'Porcentaje de proyectos de infraestructura en las regiones con vocación turística elaborados.',
    'Porcentaje de acciones para el posicionamiento turístico.',
    'Tasa de variación de prestadores de servicios turísticos inscritos en el Registro Nacional de Turismo.',
    'Porcentaje de prestadores de servicios turísticos con carta compromiso del “Código de Conducta Nacional para la Protección de las Niñas, Niños y Adolescentes en el Sector de los Viajes y el Turismo.”'
  ],
  'Secretaría de Contraloría': [
    'Porcentaje de factores de riesgo detectados en las acciones de supervisión, evaluación, control interno y vigilancia.',
    'Porcentaje de cumplimiento de reportes de procedimientos de contratación por los municipios.',
    'Porcentaje de auditorías realizadas con carácter de representatividad.',
    'Porcentaje de cumplimiento de las obligaciones que en materia de transparencia tiene el Poder Ejecutivo del Estado de Hidalgo.',
    'Porcentaje de obras públicas con irregularidad física relevante detectada.',
    'Porcentaje de efectividad en la sensibilización de las personas servidoras públicas a través del mecanismo del usuario simulado.',
    'Porcentaje de cumplimiento de los programas estatales de trabajo formalizados en materia de contraloría social y vigilancia ciudadana.',
    'Porcentaje de trámites y servicios que ofrece la Secretaría de Contraloría en línea.'
  ],
  'Secretaría de Educación Pública': [
    'Porcentaje de cobertura en Educación Preescolar.',
    'Eficiencia terminal en Educación Media Superior.',
    'Porcentaje de cobertura en Educación Superior.',
    'Porcentaje de absorción en Educación Superior.',
    'Porcentaje de la población analfabeta de 15 años y más.',
    'Porcentaje de abandono escolar en Educación Secundaria.',
    'Porcentaje de abandono en Educación Media Superior.',
    'Porcentaje de abandono escolar en Educación Superior.',
    'Eficiencia terminal en Educación Secundaria.',
    'Porcentaje de planteles educativos construidos, rehabilitados y/o equipados en educación básica, media superior y superior.',
    'Porcentaje de planteles educativos públicos de sostenimiento federal transferido y estatal con acceso a internet en educación básica, media superior y superior.',
    'Porcentaje de alumnas y alumnos de educación básica impactados con acciones para disminuir el sedentarismo.',
    'Porcentaje de Profesoras y Profesores de Tiempo Completo (PTC) que participan en los cuerpos académicos de las Instituciones Públicas de Educación Superior sectorizadas a la Secretaría de Educación Pública de Hidalgo.',
    'Porcentaje de escuelas públicas intervenidas con acciones para la educación socioemocional, cultura para la paz e igualdad sustantiva, en todos los tipos educativos.',
    'Promedio de proyectos de investigación realizados por las Instituciones Públicas de Educación Superior sectorizadas a la Secretaría de Educación Pública de Hidalgo.',
    'Porcentaje de cumplimiento de la guía para la Integración y Rendición de los Informes de Gestión Financiera y Cuenta Pública por ejercicio fiscal.'
  ],
  'Secretaría de Salud': [
    'Porcentaje de recetas surtidas en forma completa en las instituciones de salud (IMSS Ordinario, IMSS Bienestar e ISSSTE).',
    'Índice de insumos para la salud recibidos de la compra consolidada federal.',
    'Notificación oportuna de brotes de enfermedades de interés epidemiológico.',
    'Cobertura de vacunación con esquema completo en niñas y niños menores de un año de edad en el estado.',
    'Promedio diario de consultas otorgadas en las Unidades Médicas Móviles (UMM).',
    'Médicos generales y familiares por cada 1,000 habitantes.',
    'Razón de muerte materna.',
    'Tasa de mortalidad en menores de 5 años.',
    'Promedio anual de terapias de rehabilitación en el Centro de Rehabilitación e Inclusión Teletón (CRIT) Hidalgo.',
    'Tasa de variación de quejas atendidas por la Comisión de Arbitraje Médico del Estado de Hidalgo (CAMEH).',
    'Incremento porcentual de teleconsultas otorgadas por las unidades médicas del sector salud del estado de Hidalgo.',
    'Porcentaje de cumplimiento de los 48 rubros del artículo 69 de la Ley de Transparencia.'
  ],
  'Secretaría de Seguridad Pública': [
    'Porcentaje de acciones realizadas en materia de prevención social de la violencia, la delincuencia y participación ciudadana en las regiones de mayor prevalencia delictiva.',
    'Porcentaje de expedientes dictaminados correspondiente a las quejas y/o denuncias formuladas por ciudadanos o autoridades en contra de las y los integrantes de las instituciones policiales.',
    'Porcentaje de integrantes de las instituciones del Estado profesionalizados.',
    'Porcentaje de evaluaciones de control de confianza realizadas a los integrantes de las instituciones de seguridad pública del Estado.',
    'Porcentaje de operativos de coordinación interinstitucional, ejecutados en el territorio Hidalguense.',
    'Porcentaje de acciones que se llevan a cabo al interior de los Centros de Reinserción Social para mejorar las condiciones de habitabilidad.',
    'Porcentaje de denuncias anónimas atendidas en el servicio 0-89 Hidalgo.',
    'Porcentaje de acciones para prevenir y combatir el delito en beneficio de la población del estado de Hidalgo.',
    'Porcentaje de autorizaciones otorgadas para la prestación de servicios de seguridad privada.',
    'Porcentaje de acciones realizadas para atender la violencia de mujeres, niñas, niños, adolescentes y grupos vulnerables.'
  ],
  'Secretaría del Trabajo y Previsión Social': [
    'Porcentaje de personas vinculadas a un empleo formal por los programas, estrategias y servicios que opera el SNEH.',
    'Tasa de variación de personas vinculadas para recibir capacitación laboral.',
    'Tasa de crecimiento en el número de inspecciones a centros de trabajo de competencia local.',
    'Porcentaje de expedientes de demandas concluidas del sector público.',
    'Porcentaje de abatimiento de expedientes de la Junta Local de Conciliación y Arbitraje.',
    'Tasa de variación de personas con discapacidad apoyadas para su inserción a un empleo formal.',
    'Tasa de informalidad en adultos mayores.',
    'Tasa de desocupación de personas de 15 a 29 años.',
    'Tasa de variación de población indígena atendida con acciones de inserción a un trabajo digno.',
    'Porcentaje de participación de las mujeres en el empleo formal.',
    'Porcentaje de acciones realizadas en beneficio de las niñas, niños y adolescentes.'
  ],
  'Secretaría de Movilidad y Transporte': [
    'Percepción de la población usuaria sobre la infraestructura ciclista de las Zonas Metropolitanas de Hidalgo.',
    'Porcentaje de rutas del Sistema de Transporte Convencional de Hidalgo verificadas.',
    'Porcentaje de quejas recibidas, sobre la percepción del servicio público de transporte masivo.',
    'Porcentaje de acciones implementadas para promover el respeto a los derechos humanos en la movilidad.'
  ],
  'Secretaría de Cultura': [
    'Porcentaje de bienes del patrimonio cultural catalogados.',
    'Porcentaje de municipios atendidos con bienes y servicios artísticos y culturales.',
    'Porcentaje de incremento de espacios culturales funcionales.',
    'Porcentaje de incremento de apoyos sociales otorgados para fortalecer las expresiones artísticas y culturales.',
    'Porcentaje de incremento de convenios oficializados y con vigencia para fortalecer el desarrollo del sector cultural.',
    'Porcentaje de bibliotecas atendidas con el programa de lectura, escritura y oralidad.',
    'Porcentaje de incremento de programas educativos artísticos con certificado y validez oficial.',
    'Porcentaje de sistemas de información cultural en operación.'
  ],
  'Procuraduría General de Justicia del Estado de Hidalgo': [
    'Porcentaje de carpetas de investigación determinadas por el ministerio público.',
    'Porcentaje en la resolución de carpetas de investigación por delitos de violencia a niñas, niños, adolescentes y adultos mayores, y de feminicidio.',
    'Porcentaje en la resolución de carpetas de investigación por delitos de impacto extraordinario e impacto alto.',
    'Porcentaje de acuerdos reparatorios generados.',
    'Porcentaje en la resolución de carpetas de investigación por delitos de corrupción.',
    'Porcentaje de medidas de protección para víctimas del delito otorgadas y solicitadas por el Ministerio Público, y cumplidas por la División de Investigación.',
    'Porcentaje de cumplimiento de órdenes de aprehensión.',
    'Porcentaje de intervenciones periciales realizadas.',
    'Porcentaje de cumplimiento en la producción de análisis de la información.',
    'Porcentaje de quejas y denuncias por la posible comisión de conductas indebidas en las que incurran las y los servidores públicos concluidas.'
  ]
};

export const sectorOptions = [
  { value: 'Agua', label: 'Agua' },
  { value: 'Comunicaciones y transportes', label: 'Comunicaciones y transportes' },
  { value: 'Electricidad', label: 'Electricidad' },
  { value: 'Hidrocarburos', label: 'Hidrocarburos' },
  { value: 'Turismo', label: 'Turismo' },
  { value: 'Educación', label: 'Educación' },
  { value: 'Ciencia y tecnología', label: 'Ciencia y tecnología' },
  { value: 'Cultura', label: 'Cultura' },
  { value: 'Deportes', label: 'Deportes' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Seguridad social', label: 'Seguridad social' },
  { value: 'Urbanización y vivienda', label: 'Urbanización y vivienda' },
  { value: 'Asistencia social', label: 'Asistencia social' },
  { value: 'Seguridad nacional', label: 'Seguridad nacional' },
  { value: 'Seguridad pública', label: 'Seguridad pública' },
  { value: 'Procuración de justicia', label: 'Procuración de justicia' },
  { value: 'Otros relacionados con el desarrollo económico y social', label: 'Otros relacionados con el desarrollo económico y social' },
  { value: 'Gubernamental, Oficinas administrativas', label: 'Gubernamental, Oficinas administrativas' },
  { value: 'No identificados en las clasificaciones anteriores', label: 'No identificados en las clasificaciones anteriores' },
];

export const tipoProyectoOptions = {
  'Agua': 'Infraestructura Económica',
  'Comunicaciones y transportes': 'Infraestructura Económica',
  'Electricidad': 'Infraestructura Económica',
  'Hidrocarburos': 'Infraestructura Económica',
  'Turismo': 'Infraestructura Económica',
  'Educación': 'Infraestructura Social',
  'Ciencia y tecnología': 'Infraestructura Social',
  'Cultura': 'Infraestructura Social',
  'Deportes': 'Infraestructura Social',
  'Salud': 'Infraestructura Social',
  'Seguridad social': 'Infraestructura Social',
  'Urbanización y vivienda': 'Infraestructura Social',
  'Asistencia social': 'Infraestructura Social',
  'Seguridad nacional': 'Infraestructura Gubernamental',
  'Seguridad pública': 'Infraestructura Gubernamental',
  'Procuración de justicia': 'Infraestructura Gubernamental',
  'Otros relacionados con el desarrollo económico y social': 'Infraestructura Gubernamental',
  'Gubernamental, Oficinas administrativas': 'Inmuebles',
  'No identificados en las clasificaciones anteriores': 'Otros Proyectos de Inversión',
};

export const programasSectorialesOptions = {
  'Secretaría de Contraloría': 'Programa Sectorial de Desarrollo de Contraloría',
  'Secretaría de Cultura': 'Programa Sectorial de Desarrollo de Cultura',
  'Secretaría de Agricultura y Desarrollo Rural': 'Programa Sectorial de Desarrollo de Agricultura y Desarrollo Rural',
  'Secretaría de Desarrollo Económico': 'Programa Sectorial de Desarrollo Económico',
  'Secretaría de Bienestar e Inclusión Social': 'Programa Sectorial de Desarrollo para el Bienestar e Inclusión Social',
  'Secretaría de Educación Pública': 'Programa Sectorial de Desarrollo de Educación',
  'Secretaría de Hacienda': 'Programa Sectorial de Desarrollo de Hacienda',
  'Secretaría de Gobierno': 'Programa Sectorial de Desarrollo de Gobierno',
  'Secretaría de Medio Ambiente y Recursos Naturales': 'Programa Sectorial de Desarrollo de Medio Ambiente y Recursos Naturales',
  'Secretaría de Movilidad y Transporte': 'Programa Sectorial de Desarrollo de Movilidad y Transporte',
  'Secretaría de Salud': 'Programa Sectorial de Desarollo Salud',
  'Secretaría de Infraestructura Pública y Desarrollo Urbano Sostenible': 'Programa Sectorial de Desarrollo de Infraestructura Pública y Desarrollo Urbano Sostenible',
  'Secretaría de Seguridad Pública': 'Programa Sectorial de Desarrollo de Seguridad Pública',
  'Secretaría del Trabajo y Previsión Social': 'Programa Sectorial de Desarrollo del Trabajo y la Previsión Social',
  'Secretaría de Turismo': 'Programa Sectorial de Desarrollo de Turismo Sostenible',
  'Oficialía Mayor': 'Programa Especial de Desarrollo de Oficialía Mayor',
  'Unidad de Planeación y Prospectiva': 'Programa Especial de Desarrollo de Planeación y Prospectiva',
  'Procuraduría de General de Justicia': 'Programa Especial de Desarrollo de Procuración de Justicia',
  'Secretaría del Despacho del Gobernador': 'Programa Especial de Desarrollo de la Secretearia del Despacho de la Persona Titular del Poder Ejecutivo',
  'Secretaría Técnica del Sistema Estatal Anticorrupción': 'Programa Institucional de Desarrollo de la Secretaría Técnica del Sistema Estatal Anticorrupción de Hidalgo',
  'Distrito de Educación, Salud, Ciencia, Tecnología e Innovación': 'Programa Institucional de Desarrollo de la Coordinación General del Distrito de Educación, Salud, Ciencia, Tecnología e Innovación',
  'Sistema para el Desarrollo Integral de las Familia del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Sistema para el Desarrollo Integral de la Familia del Estado de Hidalgo',
  'Consejo de Ciencia, Tecnología e Innovación de Hidalgo': 'Programa Institucional de Desarrollo del Consejo de Ciencia, Tecnología e Innovación de Hidalgo',
  'Museo Interactivo para la Niñez y la Juventud "El Rehilete"': 'Programa Institucional de Desarrollo del Museo Interactivo para la Niñez y la Juventud “El Rehilete”',
  'Comisión Estatal Para el Desarrollo Sostenible de los Pueblos Indígenas': 'Programa Institucional de Desarrollo de la Comisión Estatal para el Desarrollo Sostenible de los Pueblos Indígenas',
  'Instituto Hidalguense de Educación': 'Programa Institucional de Desarrollo del Instituto Hidalguense de Educación',
  'Instituto Hidalguense de Educación para Adultos': 'Programa Institucional de Desarrollo del Instituto Hidalguense de Educación para Adultos',
  'Universidad Politécnica de Tulancingo': 'Programa Institucional de Desarrollo de la Universidad Politécnica de Tulancingo',
  'Universidad Politécnica de Pachuca': 'Programa Institucional de Desarrollo de la Universidad Politécnica de Pachuca',
  'Universidad Politécnica de Francisco I. Madero': 'Programa Institucional de Desarrollo de la Universidad Politécnica de Francisco I. Madero',
  'Universidad Politécnica de Huejutla': 'Programa Institucional de Desarrollo de la Universidad Politécnica de Huejutla',
  'Universidad Politécnica Metropolitana de Hidalgo': 'Programa Institucional de Desarrollo de la Universidad Politécnica Metropolitana de Hidalgo',
  'Universidad Tecnológica de Tula-Tepeji': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de Tula-Tepeji',
  'Universidad Tecnológica de la Huasteca Hidalguense': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de la Huasteca Hidalguense',
  'Universidad Tecnológica de Tulancingo': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de Tulancingo',
  'Universidad Tecnológica del Valle del Mezquital': 'Programa Institucional de Desarrollo de la Universidad Tecnológica del Valle del Mezquital',
  'Universidad Tecnológica de la Sierra Hidalguense': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de la Sierra Hidalguense',
  'Universidad Tecnológica de la Zona Metropolitana del Valle de México': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de la Zona Metropolitana del Valle de México',
  'Instituto Tecnológico Superior de Huichapan': 'Programa Institucional de Desarrollo del Instituto Tecnológico Superior de Huichapan',
  'Instituto Tecnológico Superior del Occidente del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Instituto Tecnológico Superior del Occidente del Estado de Hidalgo',
  'Instituto Tecnológico Superior del Oriente del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Instituto Tecnológico Superior del Oriente del Estado de Hidalgo',
  'Universidad Intercultural del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Universidad Intercultural del Estado de Hidalgo',
  'Colegio de Bachilleres del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Colegio de Bachilleres del Estado de Hidalgo',
  'Bachillerato del Estado de Hidalgo': 'Programa Institucional de Desarrollo de Bachillerato del Estado de Hidalgo',
  'Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Colegio de Estudios Científicos y Tecnológicos del Estado de Hidalgo',
  'El Colegio del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Colegio del Estado de Hidalgo',
  'Colegio de Educación Profesional Técnica del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Colegio de Educación Profesional Técnica del Estado de Hidalgo',
  'Instituto Hidalguense de Financiamiento a la Educación Superior': 'Programa Institucional de Desarrollo del Instituto Hidalguense de Financiamiento a la Educación Superior',
  'Instituto Hidalguense del Deporte': 'Programa Institucional de Desarrollo del Instituto Hidalguense del Deporte',
  'Universidad Tecnológica Minera de Zimapán': 'Programa Institucional de Desarrollo de la Universidad Tecnológica Minera de Zimapán',
  'Universidad Politécnica de la Energía': 'Programa Institucional de Desarrollo de la Universidad Politécnica de la Energía',
  'Universidad Tecnológica de Mineral de la Reforma': 'Programa Institucional de Desarrollo de la Universidad Tecnológica de Mineral de la Reforma',
  'Instituto Hidalguense de la Infraestructura Física Educativa': 'Programa Institucional de Desarrollo del Instituto Hidalguense de la Infraestructura Física Educativa',
  'Universidad Digital del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Universidad Digital del Estado de Hidalgo',
  'Instituto Hidalguense de las Mujeres': 'Programa Institucional de Desarrollo del Instituto Hidalguense de las Mujeres',
  'Ciudad de las Mujeres': 'Programa Institucional de Desarrollo de la Ciudad de las Mujeres',
  'Instituto Hidalguense para el Desarrollo Municipal': 'Programa Institucional de Desarrollo del Instituto Hidalguense para el Desarrollo Municipal',
  'Centro de Justicia para Mujeres del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Centro de Justicia para Mujeres del Estado de Hidalgo',
  'Radio y Televisión de Hidalgo': 'Programa Institucional de Desarrollo de la Radio y Televisión de Hidalgo',
  'Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Comisión Ejecutiva de Atención a Víctimas del Estado de Hidalgo',
  'Instituto Catastral del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Instituto Catastral del Estado de Hidalgo',
  'Instituto Hidalguense para Devolverle al Pueblo lo Robado': 'Programa Institucional de Desarrollo del Instituto Hidalguense para Devolver al Pueblo lo Robado',
  'Instituto Hidalguense de la Juventud': 'Programa Institucional de Desarrollo del Instituto Hidalguense de la Juventud',
  'Instituto para la Atención de las y los Adultos Mayores del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Instituto para la Atención de las y los Adultos Mayores del Estado de Hidalgo',
  'Operadora de Eventos del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Operadora de Eventos del Estado de Hidalgo',
  'Servicios de Salud de Hidalgo': 'Programa Institucional de Desarrollo de Servicios de Salud de Hidalgo',
  'Comisión Estatal de Vivienda': 'Programa Institucional de Desarrollo de la Comisión Estatal de Vivienda',
  'Comisión de Agua y Alcantarillado de Sistemas Intermunicipales': 'Programa Institucional de Desarrollo de la Comisión de Agua y Alcantarillado de Sistemas Intermunicipales',
  'Comisión de Agua y Alcantarillado del Sistema Valle del Mezquital': 'Programa Institucional de Desarrollo de la Comisión de Agua y Alcantarillado del Sistema Valle del Mezquital',
  'Comisión Estatal del Agua y Alcantarillado': 'Programa Institucional de Desarrollo de la Comisión Estatal del Agua y Alcantarillado',
  'Centro Estatal de Maquinaria para el Desarrollo': 'Programa Institucional de Desarrollo del Centro Estatal de Maquinaria para el Desarrollo',
  'Corporación Internacional Hidalgo': 'Programa Institucional de Desarrollo de la Corporación Internacional Hidalgo',
  'Instituto Hidalguense de Competitividad Empresarial': 'Programa Institucional de Desarrollo del Instituto Hidalguense de Competitividad Empresarial',
  'Corporación de Fomento de Infraestructura Industrial': 'Programa Institucional de Desarrollo de la Corporación de Fomento de Infraestructura Industrial',
  'Agencia de Desarrollo Valle de Plata': 'Programa Institucional de Desarrollo de la Agencia de Desarrollo Valle de Plata',
  'Agencia Estatal de Energía de Hidalgo': 'Programa Institucional de Desarrollo de la Agencia Estatal de Energía de Hidalgo',
  'Policía Industrial Bancaria del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Policía Industrial Bancaria del Estado de Hidalgo',
  'Instituto de Capacitación para el Trabajo del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Instituto de Capacitación para el Trabajo del Estado de Hidalgo',
  'Centro de Conciliación Laboral del Estado de Hidalgo': 'Programa Institucional de Desarrollo del Centro de Conciliación Laboral del Estado de Hidalgo',
  'Sistema Integrado de Transporte Masivo de Hidalgo': 'Programa Institucional de Desarrollo del Sistema Integrado de Transporte Masivo de Hidalgo',
  'Sistema de Transporte Convencional de Hidalgo': 'Programa Institucional de Desarrollo del Sistema de Transporte Convencional de Hidalgo',
  'Escuela de Música del Estado de Hidalgo': 'Programa Institucional de Desarrollo de la Escuela de Música del Estado de Hidalgo',
  'Consejo Estatal para la Cultura y las Artes de Hidalgo': 'Programa Institucional de Desarrollo del Consejo Estatal para la Cultura y las Artes de Hidalgo',
  'Comisión Estatal de Biodiversidad de Hidalgo': 'Programa Institucional de Desarrollo de la Comisión Estatal de Biodiversidad de Hidalgo',
  'Instituto de Vivienda, Desarrollo Urbano y Asentamientos Humanos': 'Programa Institucional de Desarrollo del Instituto de Vivienda, Desarrollo Urbano y Asentamientos Humanos'
};

export const planNacionalOptions = [
  'Justicia y Estado de derecho',
  'Bienestar',
  'Desarrollo económico',
  'Igualdad de género, no discriminación e inclusión',
  'Combate a la corrupción y mejora de la gestión pública',
  'Territorio y desarrollo sostenible'
];

export const planEstatalOptions = [
  'Acuerdo para un Gobierno Cercano, Justo y Honesto',
  'Acuerdo para el Bienestar del Pueblo',
  'Acuerdo para el Desarrollo Económico',
  'Acuerdo para el Desarrollo Sostenible e Infraestructura Transformadora'
];

export const acuerdosTransversalesOptions = [
  'Acuerdo Transversal por la Ciencia y Tecnología para el Desarrollo',
  'Acuerdo Transversal para Garantizar los Derechos Humanos',
  'Acuerdo Transversal por la Transparencia y Rendición de Cuentas'
];

export const odsOptions = [
  '1. Fin de la pobreza',
  '2. Hambre cero',
  '3. Salud y bienestar',
  '4. Educación de calidad',
  '5. Igualdad de género',
  '6. Agua limpia y saneamiento',
  '7. Energía asequible y no contaminante',
  '8. Trabajo decente y crecimiento económico',
  '9. Industria, innovación e infraestructura',
  '10. Reducción de las desigualdades',
  '11. Ciudades y comunidades sostenibles',
  '12. Producción y consumo responsables',
  '13. Acción por el clima',
  '14. Vida submarina',
  '15. Vida de ecosistemas terrestres',
  '16. Paz, justicia e instituciones sólidas',
  '17. Alianzas para lograr los objetivos',
];

export const programasSIEOptions = [
  'trabajando',

];

export const fieldLabels = {
  area_adscripcion: "Área de Adscripción",
  nombre_registrante: "Nombre(s) de quien registra",
  apellido_paterno: "Apellido Paterno",
  apellido_materno: "Apellido Materno",
  correo: "Correo Electrónico",
  telefono: "Teléfono",
  telefono_ext: "Extensión",
  fecha_registro: "Fecha de Registro",
  nombre_proyecto: "Nombre del Proyecto",
  sector: "Sector",
  tipo_proyecto: "Tipo de Proyecto",
  tipo_entidad: "Tipo de Entidad",
  dependencia: "Dependencia",
  organismo: "Organismo",
  municipio_ayuntamiento: "Ayuntamiento",
  unidad_responsable: "Unidad Responsable",
  unidad_presupuestal: "Unidad Presupuestal",
  inversion_federal: "Inversión Federal",
  inversion_estatal: "Inversión Estatal",
  inversion_municipal: "Inversión Municipal",
  inversion_otros: "Otras Inversiones",
  inversion_total: "Inversión Total",
  ramo_presupuestal: "Ramo Presupuestal",
  descripcion: "Descripción del Proyecto",
  situacion_sin_proyecto: "Situación Sin Proyecto",
  objetivos: "Objetivos del Proyecto",
  metas: "Metas del Proyecto",
  programa_presupuestario: "Programa Presupuestario",
  gasto_programable: "Gasto Programable",
  beneficiarios: "Número de Beneficiarios",
  tiempo_ejecucion: "Tiempo de Ejecución",
  modalidad_ejecucion: "Modalidad de Ejecución",
  normativa_aplicable: "Normativa Aplicable Vigente",
  region: "Región",
  municipio: "Municipio",
  localidad: "Localidad",
  barrio_colonia: "Barrio o Colonia",
  latitud: "Latitud",
  longitud: "Longitud",
  municipio_impacto: "Municipios de Impacto",
  plan_nacional: "Plan Nacional de Desarrollo",
  plan_estatal: "Plan Estatal de Desarrollo",
  plan_municipal: "Plan Municipal",
  acuerdos_transversales: "Acuerdos Transversales",
  ods: "Objetivos de Desarrollo Sostenible (ODS)",
  programas_SIE: "Programas Sectoriales, Institucionales y Especiales",
  indicadores_estrategicos: "Indicadores Estratégicos",
  indicadores_tacticos: "Indicadores Tácticos",
  observaciones: "Observaciones y Comentarios",
};

export const modalidadEjecucionOptions = [
  { value: 'Contrato', label: 'Contrato' },
  { value: 'Administración de Directa', label: 'Administración de Directa' }
];

export const tipoLocalidadOptions = [
  { value: 'Urbana', label: 'Urbana' },
  { value: 'Rural', label: 'Rural' }
];

export const aplicaOptions = [
  { value: 'no', label: 'No' },
  { value: 'si', label: 'Si' }
];