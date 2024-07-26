import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0, // Asegurarse de que no haya padding
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
  image: {
    width: 200,
    height: 50,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    width: '100%',
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 232,
    height: 551,
    borderTopWidth: 0, // Sin borde superior
    borderLeftWidth: 0, // Sin borde izquierdo
    borderBottomWidth: 2, // Borde inferior
    borderRightWidth: 2, // Borde derecho
    borderColor: '#691B32', // Color del borde
    borderStyle: 'solid',
    borderBottomRightRadius: 40, // Radio del borde en la esquina inferior derecha
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 }, // Incrementar sombra para efecto 3D
    shadowOpacity: 0.5, // Incrementar opacidad de la sombra
    shadowRadius: 15, // Incrementar radio de la sombra
    elevation: 10,
  },
});

const ProjectReport = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.rectangle}></View>
      <View style={styles.header}>
        <Text style={styles.title}>Ficha del Proyecto</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>ID del Proyecto:</Text>
        <Text style={styles.value}>{project.project_id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.value}>{project.descripcion}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Situación Sin Proyecto:</Text>
        <Text style={styles.value}>{project.situacion_sin_proyecto}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Objetivos:</Text>
        <Text style={styles.value}>{project.objetivos}</Text>
      </View>
      {/* Añade más campos según sea necesario */}
      <Image src="https://bibliotecadigitaluplaph.hidalgo.gob.mx/img_banco/pdf/footer_pdf.png" style={styles.footer} />
    </Page>
  </Document>
);

export default ProjectReport;
