import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import CourseCard from '../../components/CourseCard';
import { getAllCourses } from '../../api/courses';

export default function CoursesScreen() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>
        📚 Курстар тізімі
      </Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            title={item.title}
            description={item.description}
            image={item.imageUrl}
            level={item.level}
            lessonCount={item.lessons?.length || 0}
            onPress={() =>
              router.push(`/lessons/${item.id}`) // нажимаем — идем к курсу
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingHorizontal: 12 },
  title: { textAlign: 'center', marginBottom: 8 },
  loading: { marginTop: 64 },
});
