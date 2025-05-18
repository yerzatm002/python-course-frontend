import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Snackbar, Card, ActivityIndicator } from 'react-native-paper';
import { getTask, submitTask } from '../../api/tasks';
import { useProgressStore } from '../../store/progress';
import { useUserStore } from '../../store/user';
import { TextInput } from 'react-native-paper';
import { Platform } from 'react-native';
import { addProgress } from '../../api/progress';

export default function TaskScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();
  const { addXP, completeTask } = useProgressStore();

  const [task, setTask] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getTask(id as string).then(setTask).finally(() => setLoading(false));
  }, [id]);

  const handleCheck = async () => {
        console.log(user)

    if (!user || !answer.trim()) return;

    try {
      setSubmitting(true);
      const result = await submitTask(id as string, user.id, answer.trim());

      if (result.correct) {
        addXP(10);
        completeTask(task.id);
        setFeedback('✅ Дұрыс жауап!');
        // await addProgress(user.id, task.id);
      } else {
        setFeedback(`❌ Қате. Нәтиже: ${result.output || 'Бос жауап'}`);
      }

      setSuccess(result.correct);
      setVisible(true);
    } catch (err) {
      setFeedback('❌ Жіберу кезінде қате пайда болды');
      setSuccess(false);
      setVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswer('');
    setVisible(false);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;
  if (!task) return <Text style={{ padding: 16 }}>❌ Тапсырма табылмады</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Title title={task.title} />
        <Card.Content>
          <Text style={styles.desc}>{task.description}</Text>

<TextInput
  label="Python коды"
  value={answer}
  onChangeText={setAnswer}
  multiline
  mode="outlined"
  numberOfLines={6}
  style={{
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 14,
    backgroundColor: '#f3f4f6',
    minHeight: 140,
  }}
  placeholder="print('Сәлем әлем')"
/>


          <Button
            mode="contained"
            onPress={handleCheck}
            style={styles.button}
            disabled={submitting || !answer.trim()}
            loading={submitting}
          >
            Тексеру
          </Button>

          <Button onPress={handleReset} style={styles.reset} textColor="#666">
            Тазалау
          </Button>
        </Card.Content>
      </Card>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2500}
        style={{ backgroundColor: success ? '#4ade80' : '#f87171' }}
      >
        {feedback}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { marginBottom: 16 },
  desc: { marginBottom: 12 },
  code: {
    height: 160,
    fontSize: 14,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  button: { marginTop: 8 },
  reset: { marginTop: 4 },
});
