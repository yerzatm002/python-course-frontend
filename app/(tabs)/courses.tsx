import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CourseCard from '../../components/CourseCard';
import { getAllCourses } from '../../api/courses';
import { useUserStore } from '../../store/user';

export default function CoursesScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={styles.loading} />;

  const userLevel = user?.difficulty?.toLowerCase() || '';

  const levelMap = {
    'easy': 'Жеңіл',
    'medium': 'Орташа',
    'hard': 'Қиын',
  };

  const filteredByUser = courses.filter(
    c => c.difficulty?.toLowerCase().includes(userLevel)
  );

  const visibleCourses = selectedLevel === 'all'
    ? courses
    : courses.filter((c) =>
        c.difficulty?.toLowerCase().includes(selectedLevel)
      );

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>📚 Курстар</Text>

      <Text style={styles.section}>✅ Сіздің деңгейіңізге сай</Text>
      <FlatList
        data={filteredByUser}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            image={item.imageUrl}
            level={item.difficulty}
            lessonCount={item.lessons?.length || 0}
            onPress={() => router.push(`/lessons/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Сәйкес курстар табылмады</Text>}
      />

      <Text style={styles.section}>📘 Курстар деңгей бойынша</Text>
      <SegmentedButtons
        value={selectedLevel}
        onValueChange={setSelectedLevel}
        buttons={[
          { label: 'Барлығы', value: 'all' },
          { label: 'Жеңіл', value: 'жеңіл' },
          { label: 'Орташа', value: 'орташа' },
          { label: 'Қиын', value: 'қиын' },
        ]}
        style={{ marginBottom: 8 }}
      />

      <FlatList
        data={visibleCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            image={item.imageUrl}
            level={item.difficulty}
            lessonCount={item.lessons?.length || 0}
            onPress={() => router.push(`/lessons/${item.id}`)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Курстар табылмады</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 12 },
  title: { textAlign: 'center', marginBottom: 8 },
  section: { marginVertical: 12, fontWeight: 'bold', fontSize: 16 },
  empty: { color: '#9CA3AF', textAlign: 'center', marginVertical: 8 },
  loading: { marginTop: 64 },
});
