import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import footerImage from '../../assets/images/pdf/footer_pdf.png';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 0,
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
      <Image src={footerImage} style={styles.footer} />
    </Page>
  </Document>
);

export default ProjectReport;
