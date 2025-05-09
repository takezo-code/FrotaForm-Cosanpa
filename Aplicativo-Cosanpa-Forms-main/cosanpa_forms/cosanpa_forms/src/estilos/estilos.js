import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: '#F7F9FC' // Fundo mais suave e claro
  },
  title: {
    fontSize: 24,
    fontWeight: '700', // Título mais impactante
    marginBottom: 20,
    color: '#1A3D8D', // Azul escuro
    fontFamily: 'Poppins', // Fonte mais moderna (caso esteja instalada)
  },
  label: { 
    marginTop: 16, 
    marginBottom: 8, 
    fontSize: 16, 
    color: '#333' // Cor mais suave para os labels
  },
  input: {
    height: 40,
    borderColor: '#ccc', // Borda mais suave
    borderWidth: 1,
    borderRadius: 8, // Bordas arredondadas
    marginBottom: 12,
    paddingLeft: 8,
    fontFamily: 'Roboto', // Fonte moderna (caso esteja instalada)
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#1A3D8D', // Azul escuro
    fontFamily: 'Poppins', // Fonte moderna
  },
  fuelContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  fuelButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#E0E4FF', // Fundo mais claro para botões
    marginBottom: 10,
    transition: 'background-color 0.3s ease', // Animação de transição suave
  },
  fuelButtonSelected: { 
    backgroundColor: '#0249E3' // Azul vibrante
  },
  fuelText: { 
    color: '#1A3D8D', // Azul escuro
    fontFamily: 'Roboto', // Fonte moderna
  },
  fuelTextSelected: { 
    color: '#fff' // Texto branco quando selecionado
  },
  imagePreview: { 
    width: '100%', 
    height: 200, 
    marginTop: 10, 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#ddd' // Borda suave
  },
  observacoesInput: {
    height: 120,
    textAlignVertical: 'top',
    borderColor: '#ccc', // Borda mais suave
    borderWidth: 1,
    borderRadius: 8, // Bordas arredondadas
    marginTop: 12,
    padding: 10,
    fontFamily: 'Roboto', // Fonte moderna
  },
  card: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000', // Adicionando sombra
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Para dispositivos Android
  },
});
