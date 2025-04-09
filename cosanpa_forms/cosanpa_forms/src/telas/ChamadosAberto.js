import React, { useContext } from 'react';
import { ScrollView, View, Text, Button } from 'react-native';
import { ChamadosContext } from '../contexto/ChamadosContext';
import { styles } from '../estilos/estilos';

export default function ChamadosAbertos({ navigation }) {
  const { chamados } = useContext(ChamadosContext);
  const abertos = chamados.filter(c=>!c.finalizado);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chamados Abertos</Text>
      {abertos.length===0 
        ? <Text>Sem chamados abertos</Text>
        : abertos.map(ch=>(
          <View key={ch.id} style={styles.card}>
            <Text><Text style={styles.label}>Nome:</Text> {ch.nome}</Text>
            <Text><Text style={styles.label}>CPF:</Text> {ch.cpf}</Text>
            <Text><Text style={styles.label}>Placa:</Text> {ch.placa}</Text>
            <Text><Text style={styles.label}>Marca:</Text> {ch.marca}</Text>
            <Text><Text style={styles.label}>Modelo:</Text> {ch.modelo}</Text>
            <Button title="Finalizar" onPress={()=>navigation.navigate('Chamado Aberto',{chamado:ch})}/>
          </View>
        ))
      }
    </ScrollView>
  );
}
