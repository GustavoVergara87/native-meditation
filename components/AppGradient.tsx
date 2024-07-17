import { SafeAreaView } from 'react-native';
import SafeViewAndroid from '@/components/SafeViewAndroid';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

const AppGradient = ({ children, colors }: { children: React.ReactNode,colors:string[] }) => {
    return (
        <LinearGradient className="flex-1 w-full" colors={colors}>
            <SafeAreaView className="flex-1 mx-5 my-12 justify-between" style={SafeViewAndroid.AndroidSafeArea}>
                {children}
            </SafeAreaView>
        </LinearGradient>
    );
};

export default AppGradient;
