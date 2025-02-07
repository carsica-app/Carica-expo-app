import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Modal, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router'
import CustomHeader from '@/common/components/Header'
import ScreenLayout from '@/common/components/ScreenLayout'
import { APPCOLORS } from '@/common/utils/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import OfferCard from '@/common/components/OfferCard'
import TruckCard from '@/common/components/TruckCard';
import { AddTruckModal } from '../../common/components/AddTruckModal';
import { Platform } from 'react-native';
import fetchTrucks from '@/common/supabase/trucks/fetchTrucks';
import { AppDispatch, RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Truck } from '@/common/interfaces/truckType';
import { useDispatch } from 'react-redux';
import { getTrucks } from '@/store/slices/trucks';



export default function CreateTrucks() {
  const navigation = useNavigation();
  const [openModal, setOpenModal] = useState(false);
  const { trucks, loading } = useSelector( (state: RootState) => state.trucks)
  const dispatch = useDispatch<AppDispatch>()
  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  useEffect(() => {
   dispatch(getTrucks(''))
  }, [])
  
  useEffect(() => {
    
  },[trucks])
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader hasBack={false} />,
      tabBarLabel: 'Mis Equipos',
    })
  }, [])
    if(loading === 'pending') return <ActivityIndicator size={'large'} color={APPCOLORS.primary} style={{flex: 1}}/>
  return (
    <View style={{ flex: 1, backgroundColor: APPCOLORS.tertiary }}>

      <ScreenHeader onPress={toggleModal} />
      <ScreenLayout backgroundColor={APPCOLORS.tertiary} margin={10}>
        {/*Listado de cargas */}

        <ScrollView style={{ flex: 1, flexDirection: 'column' }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>

          {
            trucks?.map((truck) => {
              return (
                <TruckCard key={truck.id} truck={truck} />
              )
            })
          }

          <View style={{ height: 50 }} />
        </ScrollView>

        <AddTruckModal openModal={openModal} toggleModal={toggleModal} />
      </ScreenLayout>
    </View>
  )
}

const ScreenHeader = ({ onPress }: { onPress: () => void }) => {
  return (
    <View style={styles.screenTitleContainer}>
      <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', width: '100%' }}>
        <View>
          <Text style={styles.screenTitle}>Mis Equipos</Text>
          <Text style={styles.screenSubtitle}>Mis Camiones:</Text>
        </View>
        <TouchableOpacity onPress={() => onPress()}>
          <Ionicons name='add-circle-outline' size={40} color={APPCOLORS.textBlue} style={{ alignSelf: 'flex-end', marginRight: 10 }} />
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
    height: 190,
    backgroundColor: 'white'
  }
})