<div>
                <SectionTitle title="Datos Generales" />
                <div className="DatosGenerales">
                  <div className="form-group projectDate">
                    <label>Fecha de Registro</label>
                    <Field type="text" name="fechaRegistro" value={new Date().toISOString().split('T')[0]} readOnly />
                  </div>

                  <div className="formThree">
                    <div className="form-group projectName">
                      <label>Nombre del Proyecto</label>
                      <Field type="text" name="projectName" />
                      <ErrorMessage name="projectName" component="div" className="error" />
                    </div>
                    <div className="form-group sector">
                      <label>Sector</label>
                      <Field as="select" name="sector" onChange={(e) => {
                        setFieldValue('sector', e.target.value);
                        const tipoProyecto = tipoProyectoOptions[e.target.value] || '';
                        setFieldValue('tipoProyecto', tipoProyecto);
                      }}>
                        <option value="">Seleccione</option>
                        {sectorOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="sector" component="div" className="error" />
                    </div>
                    <div className="form-group tipoProyecto">
                      <label>Tipo de Proyecto</label>
                      <Field type="text" name="tipoProyecto" readOnly />
                      <ErrorMessage name="tipoProyecto" component="div" className="error" />
                    </div>
                  </div>

                  <div className="formTwo">
                    <div className="form-group entityType">
                      <label>Tipo de Entidad</label>
                      <Field as="select" name="entityType" onChange={(e) => {
                        const newEntityType = e.target.value;
                        setEntityType(newEntityType);
                        if (newEntityType === 'Municipio') {
                          setFieldValue('planSectorial', 'No Aplica');
                        }
                      }}>
                        <option value="">Seleccione</option>
                        <option value="Dependencia">Dependencia</option>
                        <option value="Organismo">Organismo</option>
                        <option value="Municipio">Municipio</option>
                        <option value="Petición Personal">Petición Personal</option>
                      </Field>
                      <ErrorMessage name="entityType" component="div" className="error" />
                    </div>

                    {entityType === 'Dependencia' && (
                      <div className="form-group dependencia">
                        <label>Dependencia</label>
                        <Field as="select" name="dependencia" onChange={(e) => {
                          setFieldValue('dependencia', e.target.value);
                          const programaSectorial = programasSectorialesOptions[e.target.value] || 'No Aplica';
                          setFieldValue('planSectorial', programaSectorial);
                        }}>
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
                        <Field as="select" name="organismo" onChange={(e) => {
                          setFieldValue('organismo', e.target.value);
                          const programaSectorial = programasSectorialesOptions[e.target.value] || 'No Aplica';
                          setFieldValue('planSectorial', programaSectorial);
                        }}>
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
                        <ErrorMessage name="municipioEnd" component="div" className="error" />
                      </div>
                    )}

                    {entityType === 'Petición Personal' && (
                      <div className="form-group PeticionPersonal">
                        <label>Petición Personal</label>
                        <Field type="text" name="PeticionPersonal" />
                        <ErrorMessage name="PeticionPersonal" component="div" className="error" />
                      </div>
                    )}
                  </div>

                  <div className="formTwo">
                    <div className="form-group unidadResponsable">
                      <label>Unidad Responsable</label>
                      <Field as="select" name="unidadResponsable" onChange={(e) => {
                        setFieldValue('unidadResponsable', e.target.value);
                        setFieldValue('unidadPresupuestal', ''); // Reset unidadPresupuestal cuando unidadResponsable changes
                      }}>
                        <option value="">Seleccione</option>
                        {unidadesResponsables.map((unidad) => (
                          <option key={unidad} value={unidad}>{unidad}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="unidadResponsable" component="div" className="error" />
                    </div>

                    {values.unidadResponsable && (
                      <div className="form-group unidadPresupuestal">
                        <label>Unidad Presupuestal</label>
                        <Field as="select" name="unidadPresupuestal">
                          <option value="">Seleccione</option>
                          {unidadPresupuestalPorUnidadResponsable[values.unidadResponsable]?.map((unidad) => (
                            <option key={unidad} value={unidad}>{unidad}</option>
                          ))}
                        </Field>
                        <ErrorMessage name="unidadPresupuestal" component="div" className="error" />
                      </div>
                    )}
                  </div>

                  <div className="form-group ramoPresupuestal">
                    <label>Ramo Presupuestal</label>
                    <Field as="select" name="ramoPresupuestal">
                      <option value="">Seleccione</option>
                      <optgroup label="Ramos Autónomos">
                        <option value="Legislativo">Legislativo</option>
                        <option value="Judicial">Judicial</option>
                        <option value="Electoral">Electoral</option>
                        <option value="Derechos Humanos">Derechos Humanos</option>
                        <option value="Acceso a la Información Pública Gubernamental">Acceso a la Información Pública Gubernamental</option>
                        <option value="Justicia Electoral">Justicia Electoral</option>
                      </optgroup>
                      <optgroup label="Ramos Administrativos">
                        <option value="Despacho del Poder Ejecutivo">Despacho del Poder Ejecutivo</option>
                        <option value="Gobierno">Gobierno</option>
                        <option value="Hacienda Pública">Hacienda Pública</option>
                        <option value="Bienestar e Inclusión Social">Bienestar e Inclusión Social</option>
                        <option value="Infraestructura Pública y Desarrollo Urbano Sostenible">Infraestructura Pública y Desarrollo Urbano Sostenible</option>
                        <option value="Medio Ambiente y Recursos Naturales">Medio Ambiente y Recursos Naturales</option>
                        <option value="Desarrollo Económico">Desarrollo Económico</option>
                        <option value="Agricultura y Desarrollo Rural">Agricultura y Desarrollo Rural</option>
                        <option value="Turismo">Turismo</option>
                        <option value="Contraloría">Contraloría</option>
                        <option value="Educación Pública">Educación Pública</option>
                        <option value="Salud">Salud</option>
                        <option value="Seguridad Pública">Seguridad Pública</option>
                        <option value="Trabajo y Previsión Social">Trabajo y Previsión Social</option>
                        <option value="Movilidad y Transporte">Movilidad y Transporte</option>
                        <option value="Cultura">Cultura</option>
                        <option value="Planeación y Prospectiva">Planeación y Prospectiva</option>
                        <option value="Administración">Administración</option>
                        <option value="Justicia">Justicia</option>
                      </optgroup>
                      <optgroup label="Ramos Generales">
                        <option value="Transferencias">Transferencias</option>
                        <option value="Participaciones a Municipios">Participaciones a Municipios</option>
                        <option value="Contingencias">Contingencias</option>
                        <option value="Provisiones Salariales">Provisiones Salariales</option>
                        <option value="Deuda Pública">Deuda Pública</option>
                        <option value="Adeudos de Ejercicios Fiscales Anteriores">Adeudos de Ejercicios Fiscales Anteriores</option>
                        <option value="Aportaciones a Municipios">Aportaciones a Municipios</option>
                        <option value="Erogaciones para las Operaciones y Programas de Saneamiento Financiero">Erogaciones para las Operaciones y Programas de Saneamiento Financiero</option>
                        <option value="Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca">Erogaciones para los Programas de Apoyo a Ahorradores y Deudores de la Banca</option>
                        <option value="Inversión en Municipios">Inversión en Municipios</option>
                      </optgroup>
                    </Field>
                    <ErrorMessage name="ramoPresupuestal" component="div" className="error" />
                  </div>
                </div>

                <SectionTitle title="Fuentes de Financiamiento" />
                <div className="FuentesFinanciamiento">
                  <p>Si no recibes financiamiento de alguna de las siguientes fuentes, por favor, déjalo en cero.</p>
                  <div className="formFour">
                    <div className="form-group montoFederal">
                      <label>Monto Federal</label>
                      <Field type="number" name="montoFederal" min="0" onChange={(e) => {
                        setFieldValue('montoFederal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal({ ...values, montoFederal: e.target.value }));
                      }} />
                      <ErrorMessage name="montoFederal" component="div" className="error" />
                    </div>
                    <div className="form-group montoEstatal">
                      <label>Monto Estatal</label>
                      <Field type="number" name="montoEstatal" min="0" onChange={(e) => {
                        setFieldValue('montoEstatal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal({ ...values, montoEstatal: e.target.value }));
                      }} />
                      <ErrorMessage name="montoEstatal" component="div" className="error" />
                    </div>
                    <div className="form-group montoMunicipal">
                      <label>Monto Municipal</label>
                      <Field type="number" name="montoMunicipal" min="0" onChange={(e) => {
                        setFieldValue('montoMunicipal', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal({ ...values, montoMunicipal: e.target.value }));
                      }} />
                      <ErrorMessage name="montoMunicipal" component="div" className="error" />
                    </div>
                    <div className="form-group montoOtros">
                      <label>Otros</label>
                      <Field type="number" name="montoOtros" min="0" defaultValue="N/A" onChange={(e) => {
                        setFieldValue('montoOtros', e.target.value);
                        setFieldValue('inversionEstimada', calculateTotal({ ...values, montoOtros: e.target.value }));
                      }} />
                      <ErrorMessage name="montoOtros" component="div" className="error" />
                    </div>
                  </div>

                  <div className="form-group inversionEstimada">
                    <label>Inversión Estimada</label>
                    <Field type="text" name="inversionEstimada" readOnly value={formatNumberWithCommas(values.inversionEstimada)} />
                  </div>
                </div>

                <SectionTitle title="Descripción del Proyecto" />
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

                  <div className="formTwo">
                    <div className="form-group gastoProgramable">
                      <label>Gasto Programable</label>
                      <Field as="select" name="gastoProgramable" onChange={(e) => setFieldValue('gastoProgramable', e.target.value)}>
                        <option value="">Seleccione</option>
                        {gastoProgramableOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="gastoProgramable" component="div" className="error" />
                    </div>
                    <div className="form-group programaPresupuestario">
                      <label>Programa Presupuestario</label>
                      <Field as="select" name="programaPresupuestario">
                        <option value="">Seleccione</option>
                        {programaPresupuestarioOptions[values.gastoProgramable]?.map((prog) => (
                          <option key={prog} value={prog}>{prog}</option>
                        ))}
                      </Field>
                      <ErrorMessage name="programaPresupuestario" component="div" className="error" />
                    </div>
                  </div>

                  <div className="formTwo">
                    <div className="form-group beneficiarios">
                      <label>Beneficiarios</label>
                      <Field type="number" name="beneficiarios" min="1" />
                      <ErrorMessage name="beneficiarios" component="div" className="error" />
                    </div>
                    <div className="form-group alineacionNormativa">
                      <label>Leyes Aplicables Vigentes</label>
                      <Field as="textarea" name="alineacionNormativa" maxLength="1500" placeholder="Leyes, Lineamientos, Manuales, Reglamentos, etc., que faciliten la implementación efectiva de los programas y/o proyectos." />
                      <ErrorMessage name="alineacionNormativa" component="div" className="error" />
                      <div>Máximo 1500 caracteres</div>
                    </div>
                  </div>
                </div>

                <SectionTitle title="Territorio y Georreferenciación" />
                <div className="formFour">
                  <div className="form-group region">
                    <label>Región</label>
                    <Field as="select" name="region" onChange={(e) => {
                      setSelectedRegion(e.target.value);
                      setFieldValue('region', e.target.value);
                      setFieldValue('municipio', '');
                    }}>
                      <option value="">Seleccione</option>
                      {Object.keys(municipiosPorRegion).map((region) => (
                        <option key={region} value={region}>{region}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="region" component="div" className="error" />
                  </div>
                  <div className="form-group municipio">
                    <label>Municipio</label>
                    <Field as="select" name="municipio">
                      <option value="">Seleccione</option>
                      {municipiosPorRegion[selectedRegion]?.map((mun) => (
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
                    <Field type="number" name="latitud" step="any" placeholder="Latitud (+), ej: 20.1224" />
                    <ErrorMessage name="latitud" component="div" className="error" />
                  </div>
                  <div className="form-group longitud">
                    <label>Longitud</label>
                    <Field type="number" name="longitud" step="any" placeholder="Longitud (-), ej: -98.7368" />
                    <ErrorMessage name="longitud" component="div" className="error" />
                  </div>
                </div>

                <div className="form-group municipiosImpacto">
                  <label>Municipios de Impacto</label>
                  <p>Por favor, selecciona los municipios en los que se localiza el proyecto. Es importante que indiques todas las áreas de impacto para asegurarnos de que la información esté completa y precisa. En caso de que no fuera el caso seleccionar "No Aplica".</p>
                  <Select
                    name="municipiosImpacto"
                    options={municipiosOptions}
                    isMulti
                    onChange={(selectedOptions) => handleMunicipiosImpactoChange(selectedOptions, setFieldValue)}
                    value={values.municipiosImpacto}
                    placeholder="Municipios"
                  />
                  <ErrorMessage name="municipiosImpacto" component="div" className="error" />
                </div>

                <SectionTitle title="Alineación Estratégica" />
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
                    </Field>
                    <ErrorMessage name="planEstatal" component="div" className="error" />
                  </div>
                </div>

                <div>
                  {entityType === 'Municipio' && (
                    <div className="form-group planMunicipal">
                      <label>Plan Municipal</label>
                      <Field as="textarea" name="planMunicipal" maxLength="500" />
                      <ErrorMessage name="planMunicipal" component="div" className="error" />
                      <div>Máximo 500 caracteres</div>
                    </div>
                  )}
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
                    <label>Programa Sectorial/Institucional/Especial</label>
                    <Field type="text" name="planSectorial" readOnly />
                    <ErrorMessage name="planSectorial" component="div" className="error" />
                  </div>
                </div>

                <SectionTitle title="Mecanismos de Evaluación y Seguimiento a Proyectos" />
                <div className="formTwo">
                  <div className="form-group indicadoresEstrategicos">
                    <label>Indicadores Estratégicos</label>
                    <Field as="select" name="indicadoresEstrategicos">
                      <option value="">Seleccione</option>
                      {indicadoresEstrategicosOptions[values.planEstatal]?.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </Field>
                    <ErrorMessage name="indicadoresEstrategicos" component="div" className="error" />
                  </div>
                  <div className="form-group indicadoresTacticos">
                    <label>Indicadores Tácticos</label>
                    {entityType === 'Dependencia' && values.dependencia !== 'Secretaría del Despacho del Gobernador' ? (
                      <Field as="select" name="indicadoresTacticos">
                        <option value="">Seleccione</option>
                        {indicadoresTacticosOptions[values.dependencia]?.map((ind) => (
                          <option key={ind} value={ind}>{ind}</option>
                        ))}
                        <option value="No Aplica">No Aplica</option> {/* Añadir la opción "No Aplica" */}
                      </Field>
                    ) : (
                      <Field type="text" name="indicadoresTacticos" value="No Aplica" readOnly />
                    )}
                    <ErrorMessage name="indicadoresTacticos" component="div" className="error" />
                  </div>
                </div>

                <div className="formTwo">
                  <div className="form-group indicadoresDesempeno">
                    <label>Indicadores de Desempeño</label>
                    <Field as="textarea" name="indicadoresDesempeno" maxLength="1000" />
                    <ErrorMessage name="indicadoresDesempeno" component="div" className="error" />
                  </div>
                  <div className="form-group indicadoresRentabilidad">
                    <label>Indicadores de Rentabilidad</label>
                    <Field as="textarea" name="indicadoresRentabilidad" maxLength="1000" />
                    <ErrorMessage name="indicadoresRentabilidad" component="div" className="error" />
                  </div>
                </div>

                <SectionTitle title="Prospectiva del Programa" />
                <div className="formTwo">
                  <div className="form-group estadoInicial">
                    <label>Estado Inicial (Fotografía)</label>
                    <input
                      type="file"
                      name="estadoInicial"
                      onChange={(event) => {
                        setFieldValue("estadoInicial", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                    />
                    <ErrorMessage name="estadoInicial" component="div" className="error" />
                  </div>
                  <div className="form-group estadoConProyecto">
                    <label>Estado con Proyecto (Proyección)</label>
                    <input
                      type="file"
                      name="estadoConProyecto"
                      onChange={(event) => {
                        setFieldValue("estadoConProyecto", event.currentTarget.files[0]);
                      }}
                      accept=".jpeg,.jpg,.png"
                    />
                    <ErrorMessage name="estadoConProyecto" component="div" className="error" />
                  </div>
                </div>

                <SectionTitle title="Rentabilidad / Estudios de Viabilidad Carga de Documentación" />
                <p>Si tienes algún estudio complementario, anéxalo en el campo que más se adecue.</p>
                <div className="RENTABILIDAD">
                  {[
                    { label: 'Estudios Prospectivos', field: 'estudiosProspectivos' },
                    { label: 'Estudios de Factibilidad', field: 'estudiosFactibilidad' },
                    { label: 'Análisis de Alternativas', field: 'analisisAlternativas' },
                    { label: 'Validación Normativa', field: 'validacionNormativa' },
                    { label: 'Liberación de Derecho de Vía', field: 'liberacionDerechoVia' },
                    { label: 'Estado Inicial (Complemento)', field: 'situacionSinProyectoFotografico' },
                    { label: 'Estado con Proyecto (Complemento)', field: 'situacionConProyectoProyeccion' },
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
                              <button type="button" onClick={() => push(null)} className="add-file-button">
                                Agregar Archivo
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                      <ErrorMessage name={field} component="div" className="error" />
                    </div>
                  ))}
                </div>

                <SectionTitle title="Observaciones y Comentarios" />
                <div className="form-group observaciones">
                  <label>Observaciones</label>
                  <Field as="textarea" name="observaciones" maxLength="1000" />
                  <ErrorMessage name="observaciones" component="div" className="error" />
                  <div>Máximo 1000 caracteres</div>
                </div>

                

              </div>