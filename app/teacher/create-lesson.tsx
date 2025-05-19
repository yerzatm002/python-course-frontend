import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator } from 'react-native-paper';
import { createLesson } from '../../api/lessons';

export default function CreateLessonScreen() {
  const { courseId } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [material, setMaterial] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content || !courseId) return;

    setLoading(true);
    try {
      await createLesson({
        title,
        content,
        material,
        videoUrl,
        courseId: courseId as string,
      });
      router.replace(`/teacher/course/${courseId}`);
    } catch (err) {
      console.error('Ошибка при создании урока', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>➕ Жаңа сабақ</Text>

      <TextInput
        label="Сабақтың атауы"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Контент (код)"
        value={content}
        onChangeText={setContent}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <TextInput
        label="Материал (HTML немесе текст)"
        value={material}
        onChangeText={setMaterial}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <TextInput
        label="Бейне сілтеме (опционально)"
        value={videoUrl}
        onChangeText={setVideoUrl}
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        Сабақ қосу
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { marginBottom: 16, textAlign: 'center' },
  input: { marginBottom: 12 },
  button: { marginTop: 8 },
});
