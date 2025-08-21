import SearchHeader from '@/components/ui/SearchHeader';
import ProductCard from '@/components/widgets/ProductCard';
import { fetchSearchProduct } from '@/slices/productSlice';
import type { AppDispatch, RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const SearchScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.searchedProducts) ?? [];

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (searchQuery.length >= 3) {
                dispatch(fetchSearchProduct(searchQuery));
            }
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchQuery, dispatch]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <SearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                }
                renderItem={({ item }) => <ProductCard product={item} />}
            />
        </SafeAreaView>
    );
};

export default SearchScreen;
