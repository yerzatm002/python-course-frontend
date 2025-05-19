import { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, Button, Chip, Surface, IconButton, TextInput } from 'react-native-paper';
import { useUserStore } from '../../store/user';
import { fetchMe, updateProfile } from '../../api/auth';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useUserStore();
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [difficulty, setDifficulty] = useState(user?.difficulty || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMe(); // обновить данные при входе
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile({ name, avatar, difficulty });
      Alert.alert('✅', 'Профиль жаңартылды');
    } catch (err: any) {
      Alert.alert('Қате', err?.response?.data?.error || 'Сақтау қатесі');
    } finally {
      setLoading(false);
    }
  };

    const handleLogout = async () => {
      setLoading(true);
      logout;
      router.replace('/auth/login');
    };

  if (!user) return null;

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={3}>
        <Image source={{ uri: avatar }} style={styles.avatar} />

        <TextInput
          label="Аты"
          value={name}
          onChangeText={setName}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Аватар сілтемесі"
          value={avatar}
          onChangeText={setAvatar}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Деңгей (жеңіл / орташа / қиын)"
          value={difficulty}
          onChangeText={setDifficulty}
          style={styles.input}
          mode="outlined"
        />

        <View style={styles.infoRow}>
          <IconButton icon="calendar-check" size={20} />
          <Chip>Үздіксіз оқу күні: {user.streak}</Chip>
        </View>

        <Button mode="contained" onPress={handleSave} loading={loading} style={styles.button}>
          Өзгерістерді сақтау
        </Button>

        <Button mode="text" onPress={handleLogout} textColor="#EF4444">
          Шығу
        </Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#3B82F6',
    borderWidth: 2,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 8,
  },
  button: {
    marginTop: 12,
    width: '100%',
  },
});
