import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Alert, TouchableOpacity, TextInput } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import api, { Expense } from '../services/api';
import { Ionicons } from '@expo/vector-icons';
import useApi from '../services/api';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

type Props = StackScreenProps<RootStackParamList, 'ExpenseList'>;

const ExpenseListScreen: React.FC<Props> = ({ navigation }) => {
    const { getAllExpenses, deleteExpenseById } = useApi();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchExpenses = async () => {
        setLoading(true);
        try {
            const response = await getAllExpenses();
            setExpenses(response.data);
            setFilteredExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredExpenses(expenses);
        } else {
            const filtered = expenses.filter(expense =>
                expense.categoryName.toLowerCase().includes(query.toLowerCase()) ||
                expense.establishmentName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExpenses(filtered);
        }
    };

    const deleteExpense = async (id: string) => {
        Alert.alert(
            'Confirmação',
            'Deseja realmente excluir este custo?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await deleteExpenseById(id);
                            fetchExpenses();
                        } catch (error) {
                            console.error('Error deleting expense:', error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Custos</Text>

            <TextInput
                style={styles.searchInput}
                placeholder="Pesquisar por categoria ou estabelecimento"
                value={searchQuery}
                onChangeText={handleSearch}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={filteredExpenses}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <View style={styles.itemInfo}>
                                <Text style={styles.category}>{item.categoryName}</Text>
                                <Text style={styles.establishment}>{item.establishmentName}</Text>
                                <Text style={styles.amount}>R$ {item.amount.toFixed(2)}</Text>
                                <Text style={styles.date}>{formatDate(item.createDt)}</Text>
                            </View>
                            <TouchableOpacity onPress={() => deleteExpense(item._id)} style={styles.deleteButton}>
                                <Ionicons name="trash-outline" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <View style={styles.footer}>
                <Button title="Incluir Novos Custos" onPress={() => navigation.navigate('Home')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    itemInfo: {
        flex: 1,
    },
    category: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    establishment: {
        fontSize: 14,
        color: '#666',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    deleteButton: {
        padding: 8,
    },
    footer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
});

export default ExpenseListScreen;
