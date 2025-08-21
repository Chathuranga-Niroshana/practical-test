import type { Product } from '@/types/productTypes';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

    const router = useRouter()
    const handlePress = () => {
        router.push(`/product/${Number(product.id)}`);
    };

    const renderStars = () => {
        const fullStars = Math.floor(product.rating);
        const halfStar = product.rating % 1 >= 0.5;
        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesome key={`full-${i}`} name="star" size={20} color="#facc15" />);
        }

        if (halfStar) {
            stars.push(<FontAwesome key="half" name="star-half-empty" size={20} color="#facc15" />);
        }

        while (stars.length < 5) {
            stars.push(<FontAwesome key={`empty-${stars.length}`} name="star-o" size={20} color="#facc15" />);
        }

        return stars;
    };

    return (
        <TouchableOpacity onPress={handlePress} className="bg-gray-100 p-3 rounded-xl shadow-md m-1 w-[47%]">
            <View className='w-full bg-white h-32 flex items-center justify-center  overflow-hidden rounded-xl mb-2 p-3 '>
                <Image
                    source={{ uri: product.thumbnail }}
                    className="w-full h-32 rounded-md mb-2"
                    resizeMode="cover"
                />
            </View>
            <Text className="text-base font-semibold text-gray-800">{product.title}</Text>
            <View className="flex-row ">{renderStars()}</View>
            <Text className="text-gray-600 pr-5 text-right">${product.price}</Text>
        </TouchableOpacity>
    );
};

export default ProductCard;
