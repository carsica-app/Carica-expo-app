import { View, Text, Alert } from 'react-native'
import React from 'react'
import { supabase } from '@/lib/supabase'
import { Truck, TruckSupabaseResponse } from '@/common/interfaces/truckType';

const fetchTrucks = async (): Promise<Truck[] | undefined> => {
    const { data: dataTrucks, error } = await supabase.auth.getUser();
    if (error) throw error
    const role = dataTrucks.user!.user_metadata.rol_nombre;
    const userId = dataTrucks?.user?.id
    if (!userId) return undefined


    switch (role) {
        case 'driver':
           
            const trucksDriver = await supabase.from('camiones').select('*').eq('camionero_id', userId)
            const dataDriver = await trucksDriver.data as TruckSupabaseResponse[]
            if (!dataDriver) return undefined
            try {
                const allTrucks = Promise.all(dataDriver.map(async (truck) => {
                    const fullTrucks = await truckMapper(truck)
                    return fullTrucks as Truck
                }) || [])
                return allTrucks
            } catch (error) {
                console.log(error, 'error catch fetch trucks')
                Alert.alert('Error', 'Ocurrio un error al traer los camiones')
            }
            break;
        case 'loader':

            const {data: trucks, error} = await supabase.from('camiones').select('*')
            if(error) console.log(error)
            if(!trucks) return;
            const data = await trucks

            if (!data) return undefined
            try {
                const allTrucks = Promise.all(data.map(async (truck) => {
                    const fullTrucks = await truckMapper(truck as TruckSupabaseResponse)
                    return fullTrucks as Truck
                }) || [])
                return allTrucks
            } catch (error) {
                console.log(error, 'error catch fetch trucks')
                Alert.alert('Error', 'Ocurrio un error al traer los camiones')
            }
            break
        default:
            break;
    }


}

export default fetchTrucks

const truckMapper = async (truck: TruckSupabaseResponse): Promise<Truck | undefined> => {
    const {
        camionero_id,
        color,
        conductor_nombre,
        id,
        marca,
        patente,
        tipoequipo_id,
    } = truck
    try {
        const { data: camionero, error: errorCamionero } = await supabase.from('usuarios').select('nombre,telefono').eq('id', camionero_id).single();
        if (errorCamionero) {throw errorCamionero};
        const { data: tipoEquipo, error: errorTipoEquipo } = await supabase.from('tipoequipo').select('descripcion').eq('id', tipoequipo_id).single();
        if (errorTipoEquipo) {throw errorTipoEquipo};
        return {
            id: id!,
            marca: marca,
            patente: patente,
            color: color,
            conductor: camionero.nombre,
            camionero: camionero.telefono,
            equipo: tipoEquipo.descripcion
        }
    } catch (error) {
        console.log(error)
        return undefined
    }

}


export const editTrucks = async (truck: TruckSupabaseResponse): Promise<boolean> => {
    if (!truck) return false;
    try {

        const { data, error } = await supabase.from('camiones').update({
            camionero_id: truck.camionero_id,
            color: truck.color,
            conductor_nombre: truck.conductor_nombre,
            id: truck.id,
            marca: truck.marca,
            patente: truck.patente,
            tipoequipo_id: truck.tipoequipo_id
        }).eq('id', truck.id!);
        if (error) throw error;
        return true

    } catch {
        Alert.alert('Error', 'Ocurrio un error al editar el camion')
        return false
    }

}

export const addTruck = async (truck: TruckSupabaseResponse): Promise<boolean> => {
    console.log('data que será enviada:', truck);
    try {

        const { data, error } = await supabase.from('camiones').insert({
            camionero_id: truck.camionero_id,
            color: truck.color,
            conductor_nombre: truck.conductor_nombre,
            marca: truck.marca,
            patente: truck.patente,
            tipoequipo_id: truck.tipoequipo_id
        })
        console.log(error)
        if (error) throw error
        return true
    } catch (error) {
        console.log(error)
        Alert.alert('Error', 'Ocurrio un error al crear el camion')
        return false
    }

}

