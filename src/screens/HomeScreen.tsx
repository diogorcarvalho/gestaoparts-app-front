import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import api, { Category } from '../services/api';
import useApi from '../services/api';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const { getAllCategories, postExpense } = useApi();
    
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [establishmentName, setEstablishmentName] = useState<string | null>(null);
    const [amount, setAmount] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSave = async () => {
        if (!selectedCategory || !establishmentName || !amount) {
            Alert.alert('Erro', 'Preencha todos os campos.');
            return;
        }

        try {
            await postExpense({
                categoryName: selectedCategory,
                establishmentName,
                amount,
            });

            Alert.alert('Sucesso', 'Custo cadastrado com sucesso!');
            setSelectedCategory(null);
            setEstablishmentName(null);
            setAmount(null);
        } catch (error) {
            console.error('Error saving expense:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar.');
        }
    };

    const isValidNumber = (value: any): boolean => {
        if (value === undefined && value === null) return false;
        const numberValue = parseFloat(value);
        return !isNaN(numberValue) && value.trim() !== '';
    };

    const validateSubmit = (): boolean => {
        if (!selectedCategory) return false;
        if (!establishmentName) return false;
        if (!isValidNumber(amount)) return false;
        return true;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastrar Novo Custo</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.label}>Categoria</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione uma categoria" value={null} />
                        {categories.map((category) => (
                            <Picker.Item key={category.name} label={category.name} value={category.name} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Nome do Estabelecimento</Text>
                    <TextInput
                        style={styles.input}
                        value={establishmentName || ''}
                        onChangeText={setEstablishmentName}
                        placeholder="Digite o nome do estabelecimento"
                    />

                    <Text style={styles.label}>Valor</Text>
                    <TextInput
                        style={styles.input}
                        value={String(amount || '')}
                        onChangeText={setAmount}
                        keyboardType="numeric"
                        placeholder="Digite o valor"
                    />

                    <View style={styles.buttonContainer}>
                        <Button title="Ver Lista de Custos" onPress={() => navigation.navigate('ExpenseList')} />
                        <Button title="Salvar" onPress={handleSave} disabled={!validateSubmit()} />
                    </View>
                </>
            )}
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
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    picker: {
        height: 50,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
});

export default HomeScreen;
