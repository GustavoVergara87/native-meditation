import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import React from 'react';
import beachImage from '@/assets/meditation-images/beach.webp';

import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';
import { router, useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';

const App = () => {
    const route = useRouter();
    return (
        <View className="flex-1 items-center justify-center">
            <ImageBackground source={beachImage} resizeMode="cover" className="flex-1 w-full">
                <AppGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}>
                    <View>
                        <Text className="text-center text-white font-bold text-4xl">Simple Meditation</Text>
                        <Text className="text-white text-center text-xl mt-3">Simplifying Meditation for Everyone</Text>
                    </View>
                    <View>
                        <CustomButton onPress={() => router.push('/nature-meditate')} title={'Get Started'} />
                    </View>
                </AppGradient>
            </ImageBackground>
            <StatusBar style="light" />
        </View>
    );
};

export default App;
