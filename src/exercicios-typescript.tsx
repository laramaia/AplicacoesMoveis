import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type UnidadeTemperatura = "celsius" | "fahrenheit";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  categoria: string;
}

interface Aluno {
  nome: string;
  notas: number[];
  matricula: string;
}

type ApiResponse<T> = {
  sucesso: boolean;
  dados: T | null;
  erro: string | null;
};

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

interface ListaTarefasProps {
  tarefas: Tarefa[];
  onToggle: (id: number) => void;
}

export function calcularIMC(peso: number, altura: number): number {
  return peso / (altura * altura);
}

export function formatarNome(nome: string, sobrenome?: string): string {
  return sobrenome ? `${nome} ${sobrenome}` : nome;
}

export function verificarMaioridade(idade: number): boolean {
  return idade >= 18;
}

export function formatarProduto(product: Produto): string {
  return `Produto: ${product.nome} - R$ ${product.preco.toFixed(2)}`;
}

export function filtrarNumerosPares(numeros: number[]): number[] {
  return numeros.filter(num => num % 2 === 0);
}

export function converterTemperatura(valor: number, unidade: UnidadeTemperatura): number {
  if (unidade === "celsius") {
    return (valor - 32) * 5 / 9;
  } else {
    return (valor * 9 / 5) + 32;
  }
}

export function contarOcorrencias<T>(array: T[], elemento: T): number {
  return array.filter(item => item === elemento).length;
}

export function calcularMedia(aluno: Aluno): number {
  const soma = aluno.notas.reduce((acc, nota) => acc + nota, 0);
  return soma / aluno.notas.length;
}

export function buscarUsuarios(): ApiResponse<Usuario[]> {
  return {
    sucesso: true,
    dados: [
      { id: 1, nome: "Lara", email: "lara@univag.com" }
    ],
    erro: null
  };
}

export default function ListaTarefas({ tarefas, onToggle }: ListaTarefasProps) {
  const [filtro, setFiltro] = useState<"todas" | "pendentes" | "concluidas">("todas");

  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === "pendentes") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  return (
    <View>
      {tarefasFiltradas.map(item => (
        <TouchableOpacity key={item.id} onPress={() => onToggle(item.id)}>
          <Text style={{ textDecorationLine: item.concluida ? 'line-through' : 'none' }}>
            {item.titulo}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}