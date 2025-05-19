import { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { createCourse } from '../../api/courses';
import { router } from 'expo-router';

export default function CreateCourseScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !imageUrl) return;

    try {
      setLoading(true);
      const course = await createCourse({ title, description, imageUrl });
      Alert.alert('✅ Курс құрылды', 'Курс сәтті қосылды');
      router.replace(`/teacher/course/${course.id}`);
    } catch (err) {
      Alert.alert('❌ Қате', 'Курс құру кезінде қате болды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>➕ Жаңа курс</Text>

      <TextInput
        label="Атауы"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Сипаттама"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        style={styles.input}
      />

      <TextInput
        label="Сурет URL"
        value={imageUrl}
        onChangeText={setImageUrl}
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
        Құру
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { textAlign: 'center', marginBottom: 24 },
  input: { marginBottom: 16 },
  button: { marginTop: 12 },
});
