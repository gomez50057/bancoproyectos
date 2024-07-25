// src/components/PDFGenerator.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 12,
  },
  header: {
    backgroundColor: '#691B32',
    color: 'white',
    textAlign: 'center',
    padding: 10,
    marginBottom: 20,
  },
});

const PDFGenerator = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.header}>
        <Text>Reporte de Proyecto</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.title}>{`Proyecto: ${project.project_name}`}</Text>
        <Text style={styles.text}>{`ID del Proyecto: ${project.project_id}`}</Text>
        <Text style={styles.text}>{`Descripción: ${project.descripcion}`}</Text>
        <Text style={styles.text}>{`Objetivos: ${project.objetivos}`}</Text>
        <Text style={styles.text}>{`Monto Federal: $${project.monto_federal}`}</Text>
        <Text style={styles.text}>{`Monto Estatal: $${project.monto_estatal}`}</Text>
        <Text style={styles.text}>{`Monto Municipal: $${project.monto_municipal}`}</Text>
        <Text style={styles.text}>{`Monto Otros: $${project.monto_otros}`}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFGenerator;
