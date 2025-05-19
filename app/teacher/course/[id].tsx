import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { getCourseWithLessons } from '../../../api/courses';

export default function CourseDetailScreen() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      getCourseWithLessons(id as string).then(setCourse).finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;

  if (!course) {
    return <Text style={styles.empty}>❌ Курс табылмады</Text>;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>{course.title}</Text>
      <Text style={styles.subtitle}>{course.description}</Text>

      <Button
        mode="contained"
        style={styles.addBtn}
        onPress={() => router.push(`/teacher/create-lesson?courseId=${course.id}`)}
      >
        ➕ Жаңа сабақ қосу
      </Button>

<FlatList
  data={course.lessons}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Card style={styles.card} onPress={() => router.push(`/teacher/lesson/${item.id}`)}>
      <Card.Title title={item.title} />
      <Card.Content>
        <Text numberOfLines={2}>{item.content}</Text>
      </Card.Content>
    </Card>
  )}
  ListEmptyComponent={<Text style={styles.empty}>Сабақтар табылмады</Text>}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F3F4F6' },
  title: { marginBottom: 4, textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: 16, color: '#6B7280' },
  card: { marginBottom: 12 },
  addBtn: { marginBottom: 16 },
  empty: { textAlign: 'center', marginTop: 32, color: '#9CA3AF' },
});
