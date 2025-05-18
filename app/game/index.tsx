import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import { useProgressStore } from '../../store/progress';
import { getAllGames } from '../../api/game';

const { width } = Dimensions.get('window');

export default function GameScreen() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [resultMap, setResultMap] = useState<Record<string, string>>({});
  const { addXP } = useProgressStore();

  useEffect(() => {
    getAllGames().then((data) => {
      setQuestions(data || []);
      setLoading(false);
    });
  }, []);

  const handleAnswer = (q: any, choice: string) => {
    if (resultMap[q.id]) return;

    const isCorrect =
      typeof q.correct === 'number'
        ? q.options[q.correct] === choice
        : q.correct === choice;

    setAnswers((prev) => ({ ...prev, [q.id]: choice }));
    setResultMap((prev) => ({
      ...prev,
      [q.id]: isCorrect ? '✅ Дұрыс!' : `❌ Қате! Дұрыс: ${typeof q.correct === 'number' ? q.options[q.correct] : q.correct}`,
    }));

    if (isCorrect) addXP(5);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;
  if (!questions.length) return <Text style={styles.empty}>❌ Сұрақтар табылмады</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {questions.map((q, idx) => (
        <Card key={q.id} style={styles.card}>
          <Card.Title title={`🧠 Сұрақ ${idx + 1}`} />
          <Card.Content>
            <Text variant="titleMedium" style={styles.question}>{q.question}</Text>
            {q.code && <Text style={styles.code}>{q.code}</Text>}

            {q.options.map((opt: string, i: number) => (
              <Button
                key={i}
                mode={answers[q.id] === opt ? 'contained' : 'outlined'}
                style={styles.option}
                onPress={() => handleAnswer(q, opt)}
                disabled={!!resultMap[q.id]}
              >
                {opt}
              </Button>
            ))}

            {resultMap[q.id] && (
              <Text style={styles.feedback}>{resultMap[q.id]}</Text>
            )}
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 60 },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#E0F2FE',
    width: width - 32,
    alignSelf: 'center',
  },
  question: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '500',
  },
  code: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    fontFamily: 'monospace',
    fontSize: 15,
    marginVertical: 8,
  },
  option: {
    marginVertical: 4,
    borderColor: '#3B82F6',
  },
  feedback: {
    marginTop: 12,
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 64,
    fontSize: 16,
    color: '#9CA3AF',
  },
});
