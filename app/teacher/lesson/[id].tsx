import { useEffect, useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { getLessonById } from '../../../api/lessons';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getLessonById(id as string).then(setLesson).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;
  if (!lesson) return <Text style={styles.empty}>❌ Сабақ табылмады</Text>;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>📘 {lesson.title}</Text>

      <Text variant="bodyLarge" style={styles.section}>{lesson.content}</Text>

      {lesson.material && (
        <Card style={styles.card}>
          <Card.Title title="📖 Теория" />
          <Card.Content>
            <Text>{lesson.material}</Text>
          </Card.Content>
        </Card>
      )}

      {lesson.videoUrl && (
        <Button
          mode="outlined"
          style={styles.videoBtn}
          onPress={() => Linking.openURL(lesson.videoUrl)}
        >
          🎬 Видеоны көру
        </Button>
      )}

      <Button
        mode="contained"
        style={styles.addBtn}
        onPress={() => router.push(`/teacher/create-task?lessonId=${lesson.id}`)}
      >
        ➕ Жаңа тапсырма құру
      </Button>

      <Text variant="titleMedium" style={styles.subtitle}>🧩 Тапсырма:</Text>

      {lesson.task ? (
        <Card style={styles.card}>
          <Card.Title title={lesson.task.title} subtitle={lesson.task.description} />
        </Card>
      ) : (
        <Text style={styles.empty}>Әлі тапсырмалар жоқ</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  title: { textAlign: 'center', marginBottom: 12 },
  section: { marginBottom: 16 },
  subtitle: { marginTop: 16, marginBottom: 8 },
  card: { marginBottom: 12 },
  videoBtn: { marginVertical: 8 },
  addBtn: { marginTop: 8 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 16 },
});
