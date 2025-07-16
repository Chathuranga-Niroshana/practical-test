import type { RootState } from '@/store';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';

const getGreeting = (): string => {
    const now = new Date();
    const srilankaOffset = 5.5 * 60;
    const localTime = new Date(now.getTime() + (srilankaOffset - now.getTimezoneOffset()) * 60000);
    const hour = localTime.getHours();

    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
};

const Header: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const router = useRouter();

    return (
        <View className="w-full px-10 py-10 flex-row items-center justify-between">
            <View className="flex-row items-center gap-4">
                <Image
                    source={{ uri: user?.image }}
                    className="w-20 h-20 rounded-full"
                />
                <View>
                    <Text className="text-xl text-gray-500">{getGreeting()}</Text>
                    <Text className="text-4xl font-bold text-black">
                        {user?.firstName}!
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                className="relative bg-gray-100 p-3 rounded-xl"
            // onPress={() => router.push('/cart')}
            >
                <AntDesign name="shoppingcart" size={28} color="black" />
                <View className="absolute -top-3 -right-3 bg-red-500 w-8 h-8 rounded-full items-center justify-center">
                    <Text className="text- text-white font-bold">2</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Header;
