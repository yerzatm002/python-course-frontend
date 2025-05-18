import { Card, Text, Chip } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';

type Props = {
  title: string;
  description: string;
  image: string;
  level: string;
  lessonCount: number;
  onPress: () => void;
};

export default function CourseCard({ title, description, image, level, lessonCount, onPress }: Props) {
  return (
    <Card onPress={onPress} style={styles.card} mode="outlined">
      <View style={styles.row}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <Text variant="titleMedium">{title}</Text>
          <Text variant="bodyMedium">{description}</Text>
          <View style={styles.chips}>
            <Chip icon="school" compact>{level}</Chip>
            <Chip icon="book-open-variant" compact>{lessonCount} сабақ</Chip>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    padding: 12,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
});
