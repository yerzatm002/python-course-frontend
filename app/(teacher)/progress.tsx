import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import axios from '../../lib/axios';

export default function TeacherProgressScreen() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/progress/all')
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        👨‍🎓 Оқушылардың прогресі
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title
              title={item.name}
              subtitle={`📧 ${item.email}`}
            />
            <Card.Content>
              <Text style={styles.stat}>Рөлі: {item.role}</Text>
              <Text style={styles.stat}>XP: {item.xp}</Text>
              <Text style={styles.stat}>Аяқталған тапсырмалар: {item.completedTasks}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Прогресс мәліметтері табылмады</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { marginBottom: 16, textAlign: 'center' },
  card: { marginBottom: 12 },
  stat: { fontSize: 14, marginBottom: 4, color: '#374151' },
  empty: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: 16,
    color: '#9CA3AF',
  },
});
