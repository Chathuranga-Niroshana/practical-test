import QuantitySlider from '@/components/inputs/Slider'
import DetailsHeader from '@/components/ui/DetailsHeader'
import { addToCart } from '@/slices/cartSlice'
import { fetchProductById } from '@/slices/productSlice'
import { AppDispatch, type RootState } from '@/store'
import { FontAwesome } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router/build/hooks'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

const ProductDetails = () => {
    const { id } = useLocalSearchParams()
    const { selectedProduct, loading, error } = useSelector((state: RootState) => state.product)
    const [quantity, setQuantity] = useState<number>(1)

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(fetchProductById(Number(id)))
    }, [id, dispatch])

    const calculateTotalPrice = () => {
        return (selectedProduct?.price ?? 0) * quantity;
    };

    const addToCartHandle = () => {
        if (!selectedProduct) return
        dispatch(addToCart({ ...selectedProduct, quantity }))
    }

    if (loading) {
        return (
            <View className='flex-1 items-center justify-center bg-white'>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text className='text-xl font-semibold'>Loading product details...</Text>
            </View>
        )
    }
    if (error) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-semibold text-red-500">
                    Failed to load product.
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView>
                <View className='bg-gray-200 pb-10'>
                    <DetailsHeader />
                    <Image
                        source={{ uri: selectedProduct?.thumbnail }}
                        className='w-full h-96 object-cover rounded-lg'
                    />
                </View>

                <View className='bg-white px-10 py-4 pb-20'>
                    <View className='flex flex-row justify-between items-center'>
                        <View className=' overflow-hidden w-1/2'>
                            <Text className='text-2xl font-bold'>{selectedProduct?.title} </Text>
                            <View className=' bg-orange-100 px-3 mt-2 py-1 w-2/3 text-center rounded-full flex items-center justify-center'>
                                <Text className='font-semibold text-orange-400'>{selectedProduct?.category}</Text>
                            </View>
                        </View>
                        <View className='flex flex-row items-center gap-2 bg-orange-100 px-2 py-1 rounded-full'>
                            <FontAwesome key="half" name="star" size={20} color="#facc10" />
                            <Text className='text-2xl font-semibold text-orange-400'>{selectedProduct?.rating}</Text>
                        </View>
                    </View>
                    <View>
                        <Text className='mt-2 text-lg tracking-wide font-medium text-gray-400'>{selectedProduct?.description}</Text>
                    </View>
                    <View>
                        <Text className='mt-4 text-2xl font-bold leading-loose'>Tags</Text>
                        <Text className=' text-lg  font-medium text-gray-400'>#{selectedProduct?.tags.join(', #')}</Text>
                    </View>

                    <View>
                        <Text className='mt-4 text-2xl font-bold leading-loose'>Quantity</Text>
                        <View>
                            <QuantitySlider quantity={quantity} setQuantity={setQuantity} maximumValue={Number(selectedProduct?.stock)} />
                        </View>
                    </View>

                    <View className='flex-row items-center justify-between mt-4'>
                        <View>
                            <Text className='mt-4 text-lg font-semibold leading-loose'>Total Price</Text>
                            <Text className='text-4xl font-bold text-black'>${calculateTotalPrice()?.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity onPress={addToCartHandle} className='bg-black px-10 py-6 rounded-full flex items-center justify-center'>
                            <Text className='text-white text-lg font-semibold'>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ProductDetails