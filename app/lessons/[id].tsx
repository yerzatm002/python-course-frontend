import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, Card, Button, ActivityIndicator } from 'react-native-paper';
import { getCourseWithLessons } from '../../api/courses';

export default function LessonsScreen() {
  const { id } = useLocalSearchParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourseWithLessons(id as string)
      .then(setCourse)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 64 }} />;
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        📘 {course.title}
      </Text>

      <FlatList
        data={course.lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => router.push(`/lessons/${item.id}`)}>
            <Card.Content style={styles.row}>
              <Image source={{ uri: item.image || 'https://miro.medium.com/v2/resize:fit:700/0*CcMeQhYbQKUlLRq7.png' }} style={styles.image} />

              <View style={styles.info}>
                <Text variant="titleMedium">{item.title}</Text>
<Text variant="bodySmall" style={{ marginVertical: 4 }}>
  {item.content}
</Text>

                {item.taskId && (
                  <>
                    <Text variant="labelSmall" style={{ color: '#64748B' }}>
                      Тапсырма бар
                    </Text>
                    <Button
                      mode="outlined"
                      compact
                      style={styles.button}
                      onPress={() => router.push(`/tasks/${item.taskId}`)}
                    >
                      Тапсырмаға өту
                    </Button>
                  </>
                )}
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { marginBottom: 16, textAlign: 'center' },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  image: { width: 60, height: 60, borderRadius: 6, backgroundColor: '#e5e7eb' },
  info: { flex: 1 },
  button: { marginTop: 8, alignSelf: 'flex-start' },
});
