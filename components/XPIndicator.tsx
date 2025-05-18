import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';

type Props = {
  xp: number;
  level: number;
};

export default function XPIndicator({ xp, level }: Props) {
  const progress = (xp % 100) / 100;

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Деңгей: {level}</Text>
      <ProgressBar progress={progress} style={styles.bar} />
      <Text>{xp % 100} / 100 XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 16 },
  bar: { height: 10, borderRadius: 5, marginVertical: 8 },
});
