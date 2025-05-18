import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';

type Props = {
  title: string;
  description: string;
  achieved: boolean;
};

export default function AchievementCard({ title, description, achieved }: Props) {
  return (
    <Card style={[styles.card, achieved && styles.achieved]}>
      <Card.Title
        title={title}
        subtitle={description}
        right={() =>
          achieved ? (
            <Badge style={styles.badge}>✔</Badge>
          ) : (
            <Badge style={[styles.badge, styles.inactive]}>✖</Badge>
          )
        }
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginVertical: 8, marginHorizontal: 16 },
  achieved: { backgroundColor: '#E8F5E9' },
  badge: { alignSelf: 'center', marginRight: 16 },
  inactive: { backgroundColor: '#FFCDD2' },
});
