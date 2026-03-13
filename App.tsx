import { View, Text } from 'react-native';
import { converterTemperatura, calcularMedia } from './src/exercicios-typescript'

export default function App() {
  const media = calcularMedia({ nome: "Lara", notas: [10, 9, 8], matricula: "123" });

  return (
    <>
      <Text>Média da Lara: {media}</Text>
      <Text>Conversão: {converterTemperatura(32, "celsius")}°C</Text>
    </>
  );
}