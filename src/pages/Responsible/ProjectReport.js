import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import footerImage from '../../assets/images/pdf/footer_pdf.png';
import proyectoImage from '../../assets/images/pdf/foto_proyecto.png';

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 0,
    margin: 0,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
  },
  mainContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  section: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#bc955b',
  },
  labelContainer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#bc955b',
  },
  value: {
    fontSize: 10,
    color: '#98989a',
  },
  valueContainer: {
    fontSize: 10,
    color: '#98989a',
    textAlign: 'justify',
  },
  valueInversion_estimada: {
    fontSize: 20,
    color: '#98989a',
    fontWeight: '500',
  },
  valueProject_name: {
    width: '70%',
    fontSize: 16,
    color: '#bc955b',
  },
  footer: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    height: 100,
    width: '100%',
  },
  footerImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rectangle: {
    position: 'relative',
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
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 10,
  },
  projectName: {
    width: '80%',
    backgroundColor: '#691B32',
    borderBottomRightRadius: 40,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 7,
    borderRightWidth: 7,
    borderColor: '#98989a',
    borderStyle: 'solid',
    padding: 9,
    marginVertical: 10,
    zIndex: 200,
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  projectImageContainer: {
    width: 220,
    height: 367,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  rectangleContent: {
    flexDirection: 'column',
    padding: 10,
  },
  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    width: 400,
    paddingHorizontal: 9,
  },
  imageContainer: {
    width: 220,
    height: 367,
    marginTop: -40,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  inlineSection: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
});

const ProjectReport = ({ project }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.rectangle}>
        <View style={styles.rectangleContent}>
          <View style={styles.section}>
            <Text style={styles.label}>Inversión Estimada:</Text>
            <Text style={styles.valueInversion_estimada}>{project.inversion_estimada}</Text>
          </View>
          <View style={styles.inlineSection}>
            <Text style={styles.label}>Región:</Text>
            <Text style={styles.value}>{project.region}</Text>
          </View>
          <View style={styles.inlineSection}>
            <Text style={styles.label}>Municipio:</Text>
            <Text style={styles.value}>{project.municipio}</Text>
          </View>
          <View style={styles.inlineSection}>
            <Text style={styles.label}>Beneficiarios:</Text>
            <Text style={styles.value}>{project.beneficiarios}</Text>
          </View>
          <View style={styles.inlineSection}>
            <Text style={styles.label}>Sector:</Text>
            <Text style={styles.value}>{project.sector}</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.projectName}>
          <Text style={styles.valueProject_name}>{project.project_name}</Text>
        </View>
        <View style={styles.projectContainer}>
          <View style={styles.textContainer}>
            <View style={styles.section}>
              <Text style={styles.labelContainer}>Descripción del Proyecto</Text>
              <Text style={styles.valueContainer}>{project.descripcion}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.labelContainer}>Situación Actual</Text>
              <Text style={styles.valueContainer}>{project.situacion_sin_proyecto}</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image src={proyectoImage} style={styles.projectImage} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Image src={footerImage} style={styles.footerImage} />
      </View>
    </Page>
  </Document>
);

export default ProjectReport;
