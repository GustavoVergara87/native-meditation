import { View, Text, ImageBackground, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import MEDIDATION_IMAGES from '@/constants/meditation-images';
import AppGradient from '@/components/AppGradient';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData';
import CustomButton from '@/components/CustomButton';
import { Audio } from 'expo-av';
import { TimerContext } from '@/context/TimerContext';

const Meditate = () => {
    const { id } = useLocalSearchParams();
    const { duration: secondsRemaining, setDuration: setSecondsRemaining } = useContext(TimerContext);

    const [isMeditating, setIsMeditating] = useState(false);
    const [audioSound, setAudioSound] = useState<Audio.Sound>();
    const [isPlayingAudio, setPlayingAudio] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        //Exit
        if (secondsRemaining === 0) {
            toggleMeditationSessionStatus()
            return;
        }

        if (isMeditating) {
            timerId = setTimeout(() => {
                setSecondsRemaining(secondsRemaining - 1);
            }, 1000);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [secondsRemaining, isMeditating]);

    useEffect(() => {
        return () => {
            setSecondsRemaining(10)
            audioSound?.unloadAsync();
        };
    }, [audioSound]);

    //Format the time left to ensure two digits are displayed
    const formattedTimeMinutes = String(Math.floor(secondsRemaining / 60)).padStart(2, '0');

    const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0');

    const toggleMeditationSessionStatus = async () => {
        if (secondsRemaining === 0) setSecondsRemaining(10);
        setIsMeditating(!isMeditating);
        await toggleSound();
    };

    const toggleSound = async () => {
        const sound = audioSound ? audioSound : await initializeSound();
        const status = await sound.getStatusAsync();

        if (status.isLoaded && !isPlayingAudio) {
            await sound.playAsync();
            setPlayingAudio(true);
        } else {
            await sound.pauseAsync();
            setPlayingAudio(false);
        }
    };

    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
        const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
        setAudioSound(sound);
        return sound;
    };

    const handleAdjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus();
        router.push('/(modal)/adjust-meditation-duration');
    };

    //flex-1 expands to the entire height of the screen
    return (
        <View className="flex-1">
            <ImageBackground source={MEDIDATION_IMAGES[Number(id) - 1]} className="flex-1">
                <AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
                    <Pressable onPress={() => router.back()} className="absolute top-16 left-6 z-10">
                        <AntDesign name="leftcircleo" size={50} color="white" />
                    </Pressable>
                    <View className="flex-1 justify-center">
                        <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
                            <Text className="text-4xl text-blue-800 font-rmono">
                                {formattedTimeMinutes}:{formattedTimeSeconds}
                            </Text>
                        </View>
                    </View>
                    <View className="mb-5">
                        <CustomButton title="Adjust duration" onPress={handleAdjustDuration} />
                        <CustomButton
                            title={`${isMeditating ? 'Stop' : 'Start Meditation'}`}
                            onPress={toggleMeditationSessionStatus}
                            containerStyles="mt-4"
                        />
                    </View>
                    <Text>{MEDITATION_DATA.find((m) => m.id === Number(id))?.title}</Text>
                </AppGradient>
            </ImageBackground>
        </View>
    );
};

export default Meditate;
