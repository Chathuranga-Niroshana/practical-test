import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          backgroundColor: 'black',
          borderRadius: 30,
          width: 220,
          height: 64,
          left: '50%',
          marginLeft: 90,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="home"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
              {focused && (
                <View
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="search"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
              {focused && (
                <View
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profileScreen"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <View className="items-center justify-center">
              <Ionicons
                name="person"
                size={24}
                color={focused ? 'white' : 'gray'}
              />
              {focused && (
                <View
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}