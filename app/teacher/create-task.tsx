import { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Snackbar } from 'react-native-paper';
import { createTask } from '../../api/tasks';

export default function CreateTaskScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState('');

  const handleSubmit = async () => {
    if (!lessonId || !title || !description || !expectedOutput) {
      setSnackbar('Барлық өрістерді толтырыңыз');
      return;
    }

    try {
      setLoading(true);
      await createTask({
        title,
        description,
        expectedOutput,
        lesson: {
          connect: { id: lessonId as string },
        },
      });
      router.back(); // Возвращение к странице урока
    } catch (err) {
      console.error(err);
      setSnackbar('Қате пайда болды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>🧩 Жаңа тапсырма</Text>

      <TextInput
        label="Тақырыбы"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Сипаттамасы"
        value={description}
        onChangeText={setDescription}
        multiline
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Күтілетін нәтиже"
        value={expectedOutput}
        onChangeText={setExpectedOutput}
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
        Жасау
      </Button>

      <Snackbar
        visible={!!snackbar}
        onDismiss={() => setSnackbar('')}
        duration={2500}
        style={{ backgroundColor: '#f87171' }}
      >
        {snackbar}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { marginBottom: 20, textAlign: 'center' },
  input: { marginBottom: 16 },
  button: { marginTop: 8 },
});
