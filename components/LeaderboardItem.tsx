import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';

export default function LeaderboardItem({ name, avatar, xp, level, index }: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.index}>{index + 1}</Text>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.details}>Lvl {level} • {xp} XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  index: { width: 24, fontWeight: 'bold' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  name: { fontSize: 16 },
  details: { color: '#6B7280', fontSize: 13 },
});
