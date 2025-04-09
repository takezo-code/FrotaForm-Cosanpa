import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../estilos/estilos';

export default function BotaoCombustivel({ tipo, selecionado, aoSelecionar }) {
  return (
    <TouchableOpacity
      style={[styles.fuelButton, selecionado && styles.fuelButtonSelected]}
      onPress={() => aoSelecionar(tipo)}
    >
      <Text style={selecionado ? styles.fuelTextSelected : styles.fuelText}>
        {tipo}
      </Text>
    </TouchableOpacity>
  );
}
