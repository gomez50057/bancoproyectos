// ProjectReport.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
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
});

const ProjectReport = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image src="https://buenaspracticas.hidalgo.gob.mx/img/Logotipo.png" style={styles.image} />
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
    </Page>
  </Document>
);

export default ProjectReport;
