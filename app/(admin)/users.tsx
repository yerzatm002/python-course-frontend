import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, ActivityIndicator, DataTable } from 'react-native-paper';
import axios from '../../lib/axios';

export default function AdminUsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/admin/users')
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 64 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        👥 Барлық пайдаланушылар
      </Text>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Аты</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title>Рөл</DataTable.Title>
          <DataTable.Title numeric>XP</DataTable.Title>
          <DataTable.Title numeric>Streak</DataTable.Title>
        </DataTable.Header>

        {users.map((user) => (
          <DataTable.Row key={user.id}>
            <DataTable.Cell>{user.name}</DataTable.Cell>
            <DataTable.Cell>{user.email}</DataTable.Cell>
            <DataTable.Cell>{user.role}</DataTable.Cell>
            <DataTable.Cell numeric>{user.xp}</DataTable.Cell>
            <DataTable.Cell numeric>{user.streak}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
});
