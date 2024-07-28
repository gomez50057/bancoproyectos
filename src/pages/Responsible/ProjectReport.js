import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import footerImage from '../../assets/images/pdf/footer_pdf.png';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row', // Cambiado a 'row' para alinear elementos horizontalmente
    backgroundColor: '#FFFFFF',
    padding: 0,
    margin: 0,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  sectionContainer: {
    flexDirection: 'column',
    marginLeft: 250, // Espacio para alinear las secciones a la derecha del rectángulo
    padding: 30,
    flexGrow: 1, // Para ocupar el espacio disponible a la derecha del rectángulo
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 100,
    width: '100%',
    backgroundColor: 'pink',
    margin: 0,
    padding: 0,
  },
  footerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 232,
    height: 551,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#691B32',
    borderStyle: 'solid',
    borderBottomRightRadius: 40,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
});

const ProjectReport = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.rectangle}></View>
      <View style={styles.sectionContainer}>
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
      </View>
      <View style={styles.footer}>
        <Image src={footerImage} style={styles.footerImage} />
      </View>
    </Page>
  </Document>
);

export default ProjectReport;
