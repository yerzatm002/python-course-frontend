import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { router } from 'expo-router';
import { register as registerApi } from '../../api/auth';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !name) return;
    try {
      setLoading(true);
      await registerApi(email, password, name);
      router.replace('/auth/login');
    } catch (err: any) {
      Alert.alert('Қате', err?.response?.data?.error || 'Тіркелу сәтсіз');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        Тіркелу
      </Text>

      <TextInput
        label="Аты"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Электрондық пошта"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Құпия сөз"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button loading={loading} mode="contained" onPress={handleRegister} style={styles.btn}>
        Тіркелу
      </Button>

      <Button onPress={() => router.replace('/auth/login')} textColor="#666">
        Кіру бетіне өту
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  btn: {
    marginTop: 8,
  },
});
