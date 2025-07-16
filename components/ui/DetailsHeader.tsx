import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const DetailsHeader = () => {
    const router = useRouter()

    return (
        <View className="w-full px-6 py-5 flex-row items-center justify-between ">
            <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full">
                <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-3xl font-bold text-black">Product Details</Text>
            <View className="p-2 opacity-0">
                <Ionicons name="arrow-back" size={24} />
            </View>
        </View>
    )
}

export default DetailsHeader
