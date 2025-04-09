import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0249e3' },
  label: { marginTop: 16, marginBottom: 8, fontSize: 16 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 10, color: '#0249e3' },
  fuelContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  fuelButton: { padding: 10, borderRadius: 8, backgroundColor: '#eee', marginBottom: 10 },
  fuelButtonSelected: { backgroundColor: '#0249e3' },
  fuelText: { color: '#0249e3' },
  fuelTextSelected: { color: '#fff' },
  imagePreview: { width: '100%', height: 200, marginTop: 10, borderRadius: 8 },
  observacoesInput: { height: 120, textAlignVertical: 'top', borderColor: '#ddd', borderWidth: 1, marginTop: 12, padding: 10 },
  card: { backgroundColor: '#f1f1f1', borderRadius: 10, padding: 15, marginBottom: 15 },
});
