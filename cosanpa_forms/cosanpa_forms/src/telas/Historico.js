import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { ChamadosContext } from '../contexto/ChamadosContext';
import { styles } from '../estilos/estilos';

export default function Historico() {
  const { chamados } = useContext(ChamadosContext);
  const finalizados = chamados.filter(c=>c.finalizado);

  const exportarCSV = async()=>{
    if(finalizados.length===0) return alert('Sem chamados finalizados');
    const header='Nome,CPF,Placa,Marca,Modelo,Combustível,KM Inicial,KM Final\n';
    const rows=finalizados.map(c=>`${c.nome},${c.cpf},${c.placa},${c.marca},${c.modelo},${c.combustivel},${c.kmInicial},${c.kmFinal}`);
    const csv=header+rows.join('\n');
    const path=FileSystem.documentDirectory+'historico.csv';
    await FileSystem.writeAsStringAsync(path,csv,{encoding:FileSystem.EncodingType.UTF8});
    await Sharing.shareAsync(path);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Histórico</Text>
      {finalizados.map((c,i)=>(
        <View key={i} style={styles.card}>
          <Text><Text style={styles.label}>Nome:</Text> {c.nome}</Text>
          <Text><Text style={styles.label}>CPF:</Text> {c.cpf}</Text>
          <Text><Text style={styles.label}>Placa:</Text> {c.placa}</Text>
          <Text><Text style={styles.label}>Marca:</Text> {c.marca}</Text>
          <Text><Text style={styles.label}>Modelo:</Text> {c.modelo}</Text>
          <Text><Text style={styles.label}>KM Inicial:</Text> {c.kmInicial}</Text>
          <Text><Text style={styles.label}>KM Final:</Text> {c.kmFinal}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={exportarCSV} style={{marginTop:20,backgroundColor:'#0249e3',padding:15,borderRadius:8,alignItems:'center'}}>
        <Text style={{color:'#fff',fontWeight:'bold'}}>Upload CSV</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
