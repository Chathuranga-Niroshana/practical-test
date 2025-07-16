import Header from '@/components/ui/Header';
import ProductCard from '@/components/widgets/ProductCard';
import { fetchProducts } from '@/slices/productSlice';
import { AppDispatch, RootState } from '@/store';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen: React.FC = () => {
  const products = useSelector((state: RootState) => state.product.products) ?? [];
  const dispatch = useDispatch<AppDispatch>();

  useFocusEffect(
    useCallback(() => {
      if (products.length === 0) {
        dispatch(fetchProducts());
      }
    }, [dispatch, products.length])
  );

  if (products.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-xl font-semibold">Loading products...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
        ListHeaderComponent={
          <>
            <Header />
            <View className="py-5">
              <Text className="text-2xl font-semibold">What&apos;s New</Text>
            </View>
          </>
        }
        renderItem={({ item }) => <ProductCard product={item} />}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
