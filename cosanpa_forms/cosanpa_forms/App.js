import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChamadosProvider } from './src/contexto/ChamadosContext';
import AbrirChamado from './src/telas/AbrirChamado';
import ChamadosAbertos from './src/telas/ChamadosAbertos';
import Historico from './src/telas/Historico';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ChamadosProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Abrir Chamado" component={AbrirChamado} />
          <Tab.Screen name="Chamados Abertos" component={ChamadosAbertos} />
          <Tab.Screen name="Histórico" component={Historico} />
        </Tab.Navigator>
      </NavigationContainer>
    </ChamadosProvider>
  );
}
