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

    // Cabeçalhos para cada tabela de chamado
    const header = 'Matrícula, Nome, Vínculo, Placa, Tipo de Veículo, Modelo, Fabricante, Contrato, Tipo de Frota, KM Inicial, Foto KM Inicial\n';
    
    // Organizando os dados em uma estrutura de "tabelas" separadas por chamados
    const rows = finalizados.map(c => {
      return `
      | Matrícula: ${c.matricula} |
      |---------------------------|
      | Nome: ${c.nome}           |
      | Vínculo: ${c.vinculo}     |
      | Placa: ${c.placa}         |
      | Tipo de Veículo: ${c.tipoVeiculo} |
      | Modelo: ${c.modelo}       |
      | Fabricante: ${c.fabricante} |
      | Contrato: ${c.contrato}   |
      | Tipo de Frota: ${c.tipoFrota} |
      | KM Inicial: ${c.kmInicial} |
      | Foto KM Inicial: ${c.fotoKmInicial ? 'Foto disponível' : 'Sem foto'} |
      ----------------------------\n`;
    });

    // Combinando cabeçalhos com as linhas em formato de tabela separada
    const csv = header + rows.join('\n');
    
    // Caminho para salvar o arquivo CSV
    const path = FileSystem.documentDirectory + 'Formulário.csv';

    // Escrevendo o arquivo CSV
    await FileSystem.writeAsStringAsync(path, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    // Compartilhando o arquivo
    await Sharing.shareAsync(path);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      {/* Exibição dos chamados finalizados */}
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
          <Text><Text style={styles.label}>Foto KM Inicial:</Text> {c.fotoKmInicial ? 'Foto disponível' : 'Sem foto'}</Text>
        </View>
      ))}

      {/* Botão de exportação */}
      <TouchableOpacity onPress={exportarCSV} style={{
        marginTop: 20,
        backgroundColor: '#0249e3',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
      }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar ✅</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
