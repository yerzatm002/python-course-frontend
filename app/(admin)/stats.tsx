import { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import axios from '../../lib/axios';

export default function AdminStatsScreen() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/admin/stats')
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>📊 Платформа статистикасы</Text>

      <Card style={styles.card}>
        <Card.Title title="👥 Жалпы пайдаланушылар" />
        <Card.Content>
          <Text>Барлығы: {stats.totalUsers}</Text>
          <Text>Оқушылар: {stats.studentsCount}</Text>
          <Text>Мұғалімдер: {stats.teachersCount}</Text>
          <Text>Админдер: {stats.adminCount}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="🏆 Ең үздік пайдаланушы" />
        <Card.Content>
          <Text>{stats.topUser.name}</Text>
          <Text>{stats.topUser.email}</Text>
          <Text>XP: {stats.topUser.xp}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="📈 Жалпы прогресс" />
        <Card.Content>
          <Text>Орташа XP: {stats.averageXp}</Text>
          <Text>Бүкіл тапсырмалар орындалған: {stats.totalTasksCompleted}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { textAlign: 'center', marginBottom: 16 },
  card: { marginBottom: 16, backgroundColor: '#FFF' },
});
