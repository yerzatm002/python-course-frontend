import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useUserStore } from '../../store/user';
import { getAchievements, getDailyStreak, completeDailyTask, getLeaderboard } from '../../api/achievements';
import AchievementCard from '../../components/AchievementCard';
import LeaderboardItem from '../../components/LeaderboardItem';

export default function AchievementsScreen() {
  const { user } = useUserStore();
  const [achievements, setAchievements] = useState([]);
  const [daily, setDaily] = useState(null);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    const [ach, dailyData, top] = await Promise.all([
      getAchievements(user!.id),
      getDailyStreak(user!.id),
      getLeaderboard()
    ]);
    setAchievements(ach);
    setDaily(dailyData);
    setLeaders(top);
  };

  const handleCompleteDaily = async () => {
    if (!user) return;
    setLoading(true);
    await completeDailyTask(user.id);
    await loadData();
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>🎯 Жетістіктер</Text>

      <Card style={styles.dailyCard}>
        <Card.Title title="🔥 Daily Streak" subtitle={`Күндер қатарынан: ${daily?.streak || 0}`} />
        <Card.Content>
          {!daily?.completedToday && (
            <Button
              mode="contained"
              onPress={handleCompleteDaily}
              disabled={loading}
              loading={loading}
            >
              Бүгінгі тапсырманы аяқтау
            </Button>
          )}
          {daily?.completedToday && <Text>✅ Бүгінгі тапсырма орындалды</Text>}
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={{ marginBottom: 8 }}>🏆 Лидерборд</Text>
      <FlatList
        data={leaders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LeaderboardItem {...item} index={index} />
        )}
        style={{ marginBottom: 24 }}
      />

      <Text variant="titleMedium" style={{ marginBottom: 8 }}>✅ Достижения</Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AchievementCard
            title={item.title}
            description={item.description}
            achieved={item.unlocked}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9FAFB' },
  title: { textAlign: 'center', marginBottom: 16 },
  dailyCard: { marginBottom: 20 },
});
