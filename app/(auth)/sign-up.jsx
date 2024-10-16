import { ScrollView, View, Text, Image, Alert } from 'react-native'
import React,  { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { createUser } from '../../lib/appwrite';
import  GlobalProvider from '../../context/GlobalProvider'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return; // Bu satırı ekleyerek formu durdurun
    }router
     setIsSubmitting(true);
     try{
      const result = await  createUser(form.email, form.password, form.username);

      setUser(result);
      setIsLoagged(true);

      Alert.alert("Success", "user signed in successfully")

      router.replace('/home')

     } catch (error) {
      Alert.alert('Error', error.message, "burası")
     } finally {
      setIsSubmitting(false) 
     }
     
     
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[60vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">Sign Up in to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-adress"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
        </View>
        <CustomButton 
          title="Sign Up"
          handlePress={submit}
          containerStyles="mt-0"
          isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
            Sign in
            </Link>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp