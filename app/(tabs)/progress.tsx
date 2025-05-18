import { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Divider } from 'react-native-paper';
import { useProgressStore } from '../../store/progress';
import { useUserStore } from '../../store/user';
import XPIndicator from '../../components/XPIndicator';

export default function ProgressScreen() {
  const { user } = useUserStore();
  const { xp, level, completedTasks, loadProgress } = useProgressStore();

  useEffect(() => {
    if (user?.id) loadProgress(user.id);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        📈 Сіздің прогрессіңіз
      </Text>

      <XPIndicator xp={xp} level={level} />
      <Divider style={{ marginVertical: 16 }} />

      <Text variant="titleMedium" style={styles.sectionTitle}>
        ✅ Аяқталған тапсырмалар:
      </Text>

      <FlatList
        data={completedTasks}
        keyExtractor={(item) => item.taskId}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Title title={item.title} subtitle={`Тапсырма ID: ${item.taskId}`} />
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Тапсырмалар әлі аяқталған жоқ</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { textAlign: 'center', marginBottom: 16 },
  sectionTitle: { marginBottom: 8 },
  card: { marginBottom: 8 },
  empty: { textAlign: 'center', marginTop: 32, color: '#9CA3AF' },
});
