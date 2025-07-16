import Header from '@/components/ui/Header'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

const HomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView>
        <Header />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen