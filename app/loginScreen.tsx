import { login } from '@/slices/authSlice'
import { AppDispatch } from '@/store'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)

    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async () => {
        try {
            const credentials = {
                username: username,
                password: password
            }
            await dispatch(login(credentials)).unwrap()
            setError(null)
            router.replace('/(tabs)')
        } catch (error) {
            setError(`Login failed.${error}`)
        }
    }

    return (
        <ScrollView style={{ flex: 1 }} className='bg-gradient-to-br from-blue-50 to-indigo-100'>
            <View className='flex-1 min-h-screen px-6 py-12'>

                {/* Header Section */}
                <View className='flex-1 items-center justify-center mb-8'>
                    <View className='bg-white rounded-full p-6 shadow-lg mb-6'>
                        <Ionicons name="lock-closed" size={48} color="#4F46E5" />
                    </View>
                    <Text className='text-4xl font-bold text-gray-800 mb-2'>Practical Test</Text>
                    <Text className='text-lg text-gray-600'>Log in to your account</Text>
                </View>

                {/* Input Section */}
                <View className='flex-1 w-full gap-4 space-y-6 mb-8'>

                    {/* Username Input */}
                    <View className='w-full'>
                        <View className='relative'>
                            <View className='absolute left-4 top-4 z-10'>
                                <Ionicons name="person" size={20} color="#9CA3AF" />
                            </View>
                            <TextInput
                                className='w-full h-14 pl-12 pr-4 text-lg border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:border-blue-500 focus:bg-blue-50'
                                placeholder='Enter your username'
                                placeholderTextColor="#9CA3AF"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className='w-full'>
                        <View className='relative'>
                            <View className='absolute left-4 top-4 z-10'>
                                <Ionicons name="lock-closed" size={20} color="#9CA3AF" />
                            </View>
                            <TextInput
                                className='w-full h-14 pl-12 pr-14 text-lg border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:border-blue-500 focus:bg-blue-50'
                                placeholder='Enter your password'
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity
                                className='absolute right-4 top-4 z-10'
                                onPress={togglePasswordVisibility}
                            >
                                <Ionicons
                                    name={showPassword ? "eye" : "eye-off"}
                                    size={20}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {error &&
                        <View className='w-full items-center  bg-gray-100 py-5 rounded-xl border border-red-600'>
                            <Text className='text-red-500 font-semibold'>{error}</Text>
                        </View>
                    }
                </View>
                {/* Button Section */}
                <View className='space-y-4'>
                    <TouchableOpacity onPress={handleLogin} className=' w-full bg-green-500 py-5 rounded-xl items-center justify-center '>
                        <Text className='text-white text-3xl font-bold'>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='w-full h-12 rounded-xl items-center justify-center'>
                        <Text className='text-gray-600 text-lg font-medium'>Forgot Password?</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </ScrollView>
    )
}

export default LoginScreen