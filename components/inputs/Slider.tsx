import Slider from '@react-native-community/slider';
import React from 'react';
import { Text, View } from 'react-native';

interface QuantitySliderProps {
    quantity: number;
    setQuantity: (value: number) => void;
}

const QuantitySlider: React.FC<QuantitySliderProps> = ({ quantity, setQuantity }) => {

    return (
        <View className=" -mt-8 flex justify-items-end items-end">
            <View className="bg-orange-100 w-10 h-10 rounded-full items-center justify-center ">
                <Text className="text-xl text-orange-400 text-center font-semibold">
                    {quantity}
                </Text>
            </View>

            <Slider
                style={{ width: '100%', height: 40 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                value={quantity}
                onValueChange={(val: number) => setQuantity(val)}
                minimumTrackTintColor="gray"
                maximumTrackTintColor="gray"
                thumbTintColor="#F97316"
            />
        </View>
    );
};

export default QuantitySlider;
