import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const URL_API = 'https://jsonplaceholder.typicode.com/posts/1';

export default function App() {
  const [post, setPost] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  async function buscarPost() {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await axios.get(URL_API);
      setPost(resposta.data);
    } catch (e) {
      if (e.response) {
        setErro(`A API respondeu com erro ${e.response.status}.`);
      } else if (e.request) {
        setErro('Sem resposta do servidor. Verifique sua conexão com a internet.');
      } else {
        setErro(`Erro inesperado: ${e.message}`);
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    buscarPost();
  }, []);

  if (carregando) {
    return (
      <SafeAreaView style={styles.centro}>
        <ActivityIndicator size="large" color="#1F4E79" />
        <Text style={styles.textoCarregando}>Carregando publicação...</Text>
      </SafeAreaView>
    );
  }

  if (erro) {
    return (
      <SafeAreaView style={styles.centro}>
        <Text style={styles.textoErro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={buscarPost}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <Text style={styles.cabecalho}>Publicação #{post.id}</Text>

        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Título</Text>
          <Text style={styles.titulo}>{post.title}</Text>

          <Text style={styles.rotulo}>Conteúdo</Text>
          <Text style={styles.corpo}>{post.body}</Text>
        </View>

        <TouchableOpacity style={styles.botao} onPress={buscarPost}>
          <Text style={styles.textoBotao}>Recarregar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#EEF3F8',
  },
  conteudo: {
    padding: 24,
    paddingTop: 56,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#EEF3F8',
  },
  cabecalho: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F4E79',
    marginBottom: 16,
  },
  cartao: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#1F4E79',
  },
  rotulo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7A8A',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B2733',
    marginBottom: 18,
  },
  corpo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#33414F',
  },
  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
    color: '#33414F',
  },
  textoErro: {
    fontSize: 16,
    color: '#B3261E',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#1F4E79',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
