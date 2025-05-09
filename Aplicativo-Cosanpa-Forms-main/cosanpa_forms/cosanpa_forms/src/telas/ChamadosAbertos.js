// src/telas/ChamadosAbertos.js
import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ChamadosContext } from '../contexto/ChamadosContext';
import { styles } from '../estilos/estilos';

export default function ChamadosAbertos() {
  const { chamados, finalizarChamado } = useContext(ChamadosContext);
  const abertos = chamados.filter((c) => !c.finalizado);

  const [selecionado, setSelecionado] = useState(null);
  const [kmFinal, setKmFinal] = useState('');
  const [fotoKmFinal, setFotoKmFinal] = useState(null);
  const [observacoes, setObservacoes] = useState('');
  const [valido, setValido] = useState(false);

  useEffect(() => {
    setValido(
      kmFinal.trim() !== '' &&
      fotoKmFinal !== null &&
      observacoes.trim() !== ''
    );
  }, [kmFinal, fotoKmFinal, observacoes]);

  const tirarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa permitir o uso da câmera.');
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!res.canceled) {
      setFotoKmFinal(res.assets[0].uri);
    }
  };

  const handleFinalizar = () => {
    if (!valido) return;
    finalizarChamado({
      ...selecionado,
      kmFinal,
      fotoKmFinal,
      observacoes,
      finalizado: true,
    });
    Alert.alert('Sucesso', 'Chamado finalizado com sucesso!');
    // limpa estado
    setSelecionado(null);
    setKmFinal('');
    setFotoKmFinal(null);
    setObservacoes('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chamados Abertos</Text>

      {abertos.length === 0 && (
        <Text style={{ marginTop: 20 }}>Nenhum chamado em aberto.</Text>
      )}

      {abertos.map((c, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            setSelecionado(c);
            setKmFinal('');
            setFotoKmFinal(null);
            setObservacoes('');
          }}
          style={[
            styles.card,
            selecionado?.id === c.id && { borderColor: '#0249e3', borderWidth: 2 },
          ]}
        >
          <Text><Text style={styles.label}>Nome:</Text> {c.nome}</Text>
          <Text><Text style={styles.label}>CPF:</Text> {c.cpf}</Text>
          <Text><Text style={styles.label}>Placa:</Text> {c.placa}</Text>
          <Text><Text style={styles.label}>Marca:</Text> {c.marca}</Text>
          <Text><Text style={styles.label}>Modelo:</Text> {c.modelo}</Text>
        </TouchableOpacity>
      ))}

      {selecionado && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>KM Final 🛣️</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o KM final"
            value={kmFinal}
            onChangeText={setKmFinal}
            keyboardType="numeric"
          />

          <Button title="Tirar Foto do KM Final" onPress={tirarFoto} color="#0249e3" />
          {fotoKmFinal && (
            <Image source={{ uri: fotoKmFinal }} style={styles.imagePreview} />
          )}

          <Text style={styles.sectionTitle}>Observações 📝</Text>
          <TextInput
            style={styles.observacoesInput}
            placeholder="Digite observações"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
          />

          <TouchableOpacity
            onPress={handleFinalizar}
            disabled={!valido}
            style={{
              marginTop: 20,
              backgroundColor: valido ? '#0249e3' : '#ccc',
              padding: 15,
              borderRadius: 8,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Finalizar Chamado</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
