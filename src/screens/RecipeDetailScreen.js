import { View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CachedImage from '../helpers/image'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, UserIcon } from 'react-native-heroicons/outline';
import { FireIcon, HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated,{FadeIn, FadeInDown} from 'react-native-reanimated';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourate, setIsFavourate] = useState(false)
    const navigation = useNavigation()
    const [meal, setMeal] = useState(null)
    const [loading, setLaoding] = useState(true)



    useEffect(() => {
        getMealData(item.idMeal)
    }, [])

    const getMealData = async (id) => {
        try {

            const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data) {
                const data = await response.data.meals[0];
                // console.log(data);
                setMeal(data)
                setLaoding(false)
            }

        } catch (error) {
            console.log('error', error.message);
        }
    }
          


    const ingredientsIndex = (meal) => {
        if(!meal) return [];
        let indexes = []

        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i)
            }
        }
        return indexes
    }


    const getYoutubeVideoId = url => {
        const regex = /[?&]v=([^&]+)/;
        const match  = url.match(regex);
        if(match && match[1]){
            return match[1]
        }
        return null
    }




    return (
        <ScrollView
            className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar style={"light"} />

            <View
                className="flex-row justify-center"
            >
                <CachedImage uri={item.strMealThumb} style={{ width: wp(98), height: hp(50), borderRadius: 45, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }} />

            </View>

            <Animated.View entering={FadeIn.delay(200).duration(1000)}
                className="w-full absolute flex-row justify-between items-center pt-14"
            >
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 rounded-full ml-5 bg-white">
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourate(!isFavourate)} className="p-2 rounded-full mr-5 bg-white">
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourate ? "red" : "gray"} />
                </TouchableOpacity>

            </Animated.View>

            {
                loading ? (
                    <Loading size="larger" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 pt-8">
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700">
                                {meal?.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500">
                                {meal?.strArea}
                            </Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)}  className="flex-row justify-around ">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View height={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center p-2">
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">35</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">Mins</Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View height={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center p-2">
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">03</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">Servings</Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View height={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center p-2">
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">104</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">Cal</Text>
                                </View>
                            </View>

                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View height={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center p-2">
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="gray" />
                                </View>
                                <View className="flex items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">104</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700">Easy</Text>
                                </View>
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}  className="space-y-4">
                        <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Ingredients</Text>
                            <View className="space-y-2 ml-3">
                                   {
                                    ingredientsIndex(meal).map(i=>{
                                        return(
                                            <View key={i} className="flex-row space-x-4">
                                            <View style={{height:hp(1.5), width:hp(1.5)}} className="bg-amber-300 rounded-full"/>
                                            <View className="flex-row space-x-2">
                                            <Text style={{fontSize:hp(1.7)}} className="font-extrabold text-neutral-700">{meal['strMeasure'+i]}</Text>
                                            <Text style={{fontSize:hp(1.7)}} className="font-medium text-neutral-600">{meal['strIngredient'+i]}</Text>
                                             </View>
                                            </View>
                                        )
                                    })
                                   }
                            </View>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)}  className="space-y-4">
                        <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Instruction</Text>
                            <Text style={{fontSize:hp(1.6)}} className="text-neutral-700">
                                {meal?.strInstructions}
                            </Text>
                        </Animated.View>
                    

                    {
                        meal.strYoutube && (
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)}  className="space-y-4"> 
                            <Text style={{fontSize:hp(2.5)}} className="font-bold flex-1 text-neutral-700">Recipe Video</Text>
                            <View>
                                <YoutubeIframe videoId={getYoutubeVideoId(meal.strYoutube)} height={hp(30)}/>
                            </View>
                            </Animated.View>

                        )
                    }
                        
                    </View>
                )
            }


        </ScrollView>
    )
}