import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, Divider, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/python-logo.png')} style={styles.image} />

      <Text variant="headlineLarge" style={styles.title}>
        Қош келдіңіз!
      </Text>

      <Text variant="bodyLarge" style={styles.subtitle}>
        Python тілін үйреніп, тапсырмалар арқылы шеберлігіңізді арттырыңыз.
      </Text>

      <Divider style={styles.divider} />

      <Button
        mode="contained"
        onPress={() => router.push('/courses')}
        icon="play"
        style={styles.button}
      >
        Сабақты бастау
      </Button>

      <Button
        mode="text"
        onPress={() => router.push('/game')}
        icon="gamepad-variant"
        style={styles.secondary}
      >
        Мини-ойынмен қайталау
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#374151',
    marginBottom: 8,
  },
  divider: {
    width: '80%',
    marginVertical: 16,
  },
  button: {
    width: '80%',
    marginBottom: 8,
  },
  secondary: {
    width: '80%',
  },
});
