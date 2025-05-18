import { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { router } from 'expo-router';
import { login as loginApi } from '../../api/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      setLoading(true);
      await loginApi(email, password);
      router.replace('/');
    } catch (err: any) {
      Alert.alert('Қате', err?.response?.data?.error || 'Кіру сәтсіз аяқталды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Кіру</Text>

      <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" />
      <TextInput
        label="Құпия сөз"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
      />

      <Button loading={loading} mode="contained" onPress={handleLogin} style={styles.btn}>
        Кіру
      </Button>

      <Button onPress={() => router.replace('/auth/register')}>Тіркелу</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', gap: 12 },
  btn: { marginTop: 12 },
});
