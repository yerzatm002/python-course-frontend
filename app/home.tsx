import { View, StyleSheet } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Қош келдіңіз, оқушы!
      </Text>

      <Text variant="bodyLarge" style={styles.subtitle}>
        Python тілін үйренуді бүгіннен баста!
      </Text>

      <Divider style={styles.divider} />

      <Button mode="contained" onPress={() => alert('Сабақты бастайық!')}>
        Бірінші сабақты бастау
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    marginBottom: 20,
  },
});
