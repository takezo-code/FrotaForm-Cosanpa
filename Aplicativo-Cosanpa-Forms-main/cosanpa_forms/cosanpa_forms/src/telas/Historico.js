import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ChamadosContext } from '../contexto/ChamadosContext';
import { styles } from '../estilos/estilos';

export default function Historico() {
  const { chamados } = useContext(ChamadosContext);
  const finalizados = chamados.filter(c => c.finalizado);

  const exportarCSV = async () => {
    if (finalizados.length === 0) return alert('Sem chamados finalizados');

    const header = [
      'Matrícula',
      'Nome',
      'Vínculo',
      'Placa',
      'Tipo de Veículo',
      'Modelo',
      'Fabricante',
      'Contrato',
      'Tipo de Frota',
      'KM Inicial',
      'KM Final',
      'Observações',
      'Horário Final',
      'Destino Final',
      'Foto KM Inicial',
      'Foto KM Final'
    ].join(',') + '\n';

    const rows = finalizados.map(c => {
      return [
        c.matricula,
        c.nome,
        c.vinculo,
        c.placa,
        c.tipoVeiculo,
        c.modelo,
        c.fabricante,
        c.contrato,
        c.tipoFrota,
        c.kmInicial,
        c.kmFinal || '',
        c.observacoes || '',
        c.horarioFinal || '',
        c.destinoFinal || '',
        c.fotoKmInicial ? 'Foto disponível' : 'Sem foto',
        c.fotoKmFinal ? 'Foto disponível' : 'Sem foto'
      ].join(',');
    });

    const csv = header + rows.join('\n');

    // Adiciona BOM para Excel reconhecer UTF-8 corretamente
    const csvComBOM = '\uFEFF' + csv;

    const path = FileSystem.documentDirectory + 'Formulario.csv';
    await FileSystem.writeAsStringAsync(path, csvComBOM, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(path);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      {finalizados.map((c, i) => (
        <View key={i} style={styles.card}>
          <Text><Text style={styles.label}>Matrícula:</Text> {c.matricula}</Text>
          <Text><Text style={styles.label}>Nome:</Text> {c.nome}</Text>
          <Text><Text style={styles.label}>Vínculo:</Text> {c.vinculo}</Text>
          <Text><Text style={styles.label}>Placa:</Text> {c.placa}</Text>
          <Text><Text style={styles.label}>Tipo de Veículo:</Text> {c.tipoVeiculo}</Text>
          <Text><Text style={styles.label}>Modelo:</Text> {c.modelo}</Text>
          <Text><Text style={styles.label}>Fabricante:</Text> {c.fabricante}</Text>
          <Text><Text style={styles.label}>Contrato:</Text> {c.contrato}</Text>
          <Text><Text style={styles.label}>Tipo de Frota:</Text> {c.tipoFrota}</Text>
          <Text><Text style={styles.label}>KM Inicial:</Text> {c.kmInicial}</Text>
          <Text><Text style={styles.label}>KM Final:</Text> {c.kmFinal || '-'}</Text>
          <Text><Text style={styles.label}>Horário Final:</Text> {c.horarioFinal || '-'}</Text>
          <Text><Text style={styles.label}>Destino Final:</Text> {c.destinoFinal || '-'}</Text>
          <Text><Text style={styles.label}>Observações:</Text> {c.observacoes || '-'}</Text>
          <Text><Text style={styles.label}>Foto KM Inicial:</Text> {c.fotoKmInicial ? 'Foto disponível' : 'Sem foto'}</Text>
          <Text><Text style={styles.label}>Foto KM Final:</Text> {c.fotoKmFinal ? 'Foto disponível' : 'Sem foto'}</Text>
        </View>
      ))}

      <TouchableOpacity
        onPress={exportarCSV}
        style={{
          marginTop: 20,
          backgroundColor: '#0249e3',
          padding: 15,
          borderRadius: 8,
          alignItems: 'center'
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar ✅</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
