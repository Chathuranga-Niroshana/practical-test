import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <View className="py-16 px-8 flex justify-center items-center">
            <View className="w-full">
                <View className="relative">
                    <View className="absolute left-4 top-4 z-10">
                        <Ionicons name="search" size={20} color="#9CA3AF" />
                    </View>
                    <TextInput
                        className="w-full h-14 bg-gray-100 pl-12 pr-4 text-lg border-2 border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:bg-blue-50"
                        placeholder="Search"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            <View className="w-full mt-4">
                <Text className="text-black font-semibold text-lg">Recent searches</Text>
                <View className="mt-2 flex flex-row gap-2 flex-wrap w-full">
                    {['Apple', 'Pixel'].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setSearchQuery(item)}
                            className="bg-orange-100 px-3 mt-2 py-1 text-center rounded-full flex items-center justify-center"
                        >
                            <Text className="font-semibold text-orange-400">{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View className="w-full p-[0.5px] mt-5 bg-gray-400" />
        </View>
    );
};

export default SearchHeader;
