import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { GalleryPreviewData } from '@/constants/Models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';

// for example /affirmations/1
const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
    const [sentences, setSentences] = useState<string[]>();

    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const element = AFFIRMATION_GALLERY[idx];
            const affirmationToStart = element.data.find((a) => a.id.toString() === itemId);
            if (affirmationToStart) {
                setAffirmation(affirmationToStart);

                const affirmationSenctences = affirmationToStart.text.split('.').filter(s=>s.trim()!=="")
                setSentences(affirmationSenctences);

                return;
            }
        }
    }, []);

    return (
        <View className="flex-1">
            <ImageBackground source={affirmation?.image} resizeMode="cover" className="flex-1">
                <AppGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']}>
                    <Pressable onPress={() => router.back()} className="absolute top-6 left-6 z-10">
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <ScrollView className="mt-20" showsVerticalScrollIndicator={false}>
                        {sentences?.map((sentence,idx) => (
                            <Text key={idx} className="text-white text-3xl mb-12 font-bold text-center">{sentence}.</Text>
                        ))}
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default AffirmationPractice;
