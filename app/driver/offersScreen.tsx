import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Modal, Pressable, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider';
import { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import ScreenLayout from '@/common/components/ScreenLayout'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppDispatch, RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getLoads } from '@/store/slices/loads';
import OfferCardDriver from '@/common/components/OfferCardDriver';
import CustomPicker from '@/common/components/CustomPicker';
import { AllProvinciasArray } from '@/common/interfaces/provinciasType';



export default function OfferScreen() {

  const {loads, loading, error}= useSelector( (state: RootState) => state.loads)
 const dispatch = useDispatch<AppDispatch>()  
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState(10);
  const [localidad, setLocalidad] = useState(null)
  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={false} />,
      tabBarLabel: 'Ofertas',
    })
  }, []);

  useEffect(() => {
        dispatch(getLoads(true))
  }, [])
  if(loading === 'pending') return <ActivityIndicator size={'large'} color={APPCOLORS.primary} style={{flex: 1}}/>
  return (
    <View style={{ flex: 1, backgroundColor: APPCOLORS.tertiary, }} >
      <ScreenHeader onPress={toggleModal}  />
      <ScreenLayout backgroundColor={APPCOLORS.tertiary} margin={5}>
        <ScrollView style={{ flex: 1, backgroundColor: APPCOLORS.tertiary, }} contentContainerStyle={{ justifyContent: 'center', gap: 15 }}>
          {/*Listado de cargas */}
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
          {/* <OfferCard /> */}
          {
            loads.map((load, index) => (
              <OfferCardDriver key={index} load={load} />
            ))
          }
           
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </ScreenLayout>

      <Modal visible={openModal} transparent={true} animationType='fade'>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.32)' }}>
          <View style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.30,
            elevation: 13,
            backgroundColor: 'white',
            padding: 20,
            height: 340,
            borderRadius: 30,
            margin: 20
          }}>
            <Text style={{ 
              alignSelf: 'center', 
              color: APPCOLORS.primary, 
              fontWeight: 'bold', 
              marginTop: 8, 
              fontSize: 18 
              
            }}>Filtrar Ofertas:</Text>
            <Text style={{ 
              alignSelf: 'center', 
              color: APPCOLORS.primary, 
              fontWeight: '500', 
              marginTop: 8, 
              fontSize: 18 
              
            }}>Por Kms</Text>
           
              <Slider
                style={{width: '100%', height: 40, marginTop: 30}}
                step={10}
                minimumValue={10}
                maximumValue={100}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#acacac"
                onValueChange={setValue}
                />
              <Text style={{alignSelf: 'center', color: APPCOLORS.primary, fontWeight: '500', marginTop: 8, fontSize: 18}}>{value} Kms</Text>
                    <View style={styles.inputContent}>
                      <View>
                        <Ionicons name='location-outline' size={20} color={APPCOLORS.textGray} style={{ marginLeft: 8 }} />
                      </View>
                      <CustomPicker selectedValue={localidad} onValueChange={(item) => setLocalidad(item as any)} data={AllProvinciasArray} placeholder='Provincia' />
                    </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>


                <Pressable   
                  style={styles.filterBtn}
                  onPress={toggleModal}>
                  <Text style={{color:'white', fontWeight: '600'}}>Aplicar</Text>
                </Pressable>
                <Pressable   
                  style={styles.filterBtnCancel}
                  onPress={toggleModal}>
                  <Text style={{color:'white', fontWeight: '600'}}>Cancelar</Text>
                </Pressable>
                </View>
          </View>
        </View>
                    </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const ScreenHeader = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.screenTitleContainer}>
      <View>
        <Text style={styles.screenTitle}>Cargas</Text>
        <Text style={styles.screenSubtitle}>Ofertas de cargas disponibles:</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => onPress()}>
          <Ionicons name='filter' size={30} color={APPCOLORS.textBlue} />
        </TouchableOpacity>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  screenTitleContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'

  },
  screenTitle: {
    fontSize: 20,
    color: APPCOLORS.textBlue,
    fontWeight: 'bold'
  },
  screenSubtitle: {
    fontSize: 14,
    color: APPCOLORS.textGray,
    fontWeight: '600'
  },
  filterBtn: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: APPCOLORS.primary,
    borderRadius: 12,
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnCancel: {
    width: 90,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b51a25',
    borderRadius: 12,
    alignContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    alignSelf: 'flex-end'
  },
  filterBtnTitle: {
    fontSize: 14,
    color: APPCOLORS.textWhite,
    fontWeight: '500'
  },
  offerCard: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: APPCOLORS.darkGray,
    borderRadius: 12,
    padding: 10,
    width: '90%',
    height: 170,
    backgroundColor: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    height: 55,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 2,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary

  },
  inputContent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 12,
    marginVertical: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: APPCOLORS.tertiary
  },
})