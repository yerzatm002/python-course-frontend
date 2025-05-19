import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { getAllCourses } from '../../api/courses';
import { useRouter } from 'expo-router';

export default function MyCoursesScreen() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getAllCourses().then(setCourses).finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>📚 Менің курстарым</Text>

      <Button
        mode="contained"
        icon="plus"
        onPress={() => router.push('/teacher/create-course')}
        style={styles.createButton}
      >
        Жаңа курс құру
      </Button>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/teacher/course/${item.id}`)}>
            <Card.Title title={item.title} subtitle={item.description} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { marginBottom: 16, textAlign: 'center' },
  createButton: { marginBottom: 20 },
  card: { marginBottom: 12 },
});
