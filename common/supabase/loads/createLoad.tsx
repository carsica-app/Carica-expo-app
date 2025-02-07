import { getCityIdByName } from "@/common/interfaces/ciudadesType";
import { Load, LoadSupabaseResponse, LoadUnitWithIdEnum } from "@/common/interfaces/loadType";
import { getProvinciaIdByName } from "@/common/interfaces/provinciasType";
import { supabase } from "@/lib/supabase";
import { getUserId } from "../users/fetchUser";
import { MaterialEnum } from "@/common/interfaces/materialType";
import { Database } from "@/types/supabase";
import { Alert } from "react-native";
import { ServiceLocation } from '../../services/locationService';
export interface UbicacionSupabaseResponse {
    id:           string;
    direccion:    string;
    provincia_id: number;
    ciudad_id:    number;
    lat:          number;
    lng:          number;
}

export const createLoad = async (load: any) =>{
    console.time('a')
    let ubicacionInicial;
    let ubicacionFinal;
    const {
        tipo,
        tipoCarga,
        peso,
        tipoEquipo,
        direccionCarga,
        direccionDescarga,
        correo,
        telefono,
        puntoReferencia,
        precio,
        provinciaCarga,
        ciudadCarga,
        provinciaDescarga,
        fechaCarga, 
        fechaDescarga,
        ciudadDescarga} = load;
    const provinceLoadID  = getProvinciaIdByName(provinciaCarga);
    const cityLoadID = getCityIdByName(ciudadCarga);

    const provinceDownloadID = getProvinciaIdByName(provinciaDescarga);
    const cityDownloadID = getCityIdByName(ciudadDescarga);
    let coordsCarga;
    let coordsDescarga;
    const newDirectionLoad = `${direccionCarga} ${ciudadCarga} ${provinciaCarga}`;
    const newDirectionDownload = `${direccionDescarga} ${ciudadDescarga} ${provinciaDescarga}`; 
    console.log({
        newDirectionLoad,
        newDirectionDownload
    })
    try {
        //obtiene coord carga
        const {data:latLngCarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionLoad);
        coordsCarga = latLngCarga;
        if(!coordsCarga) throw new Error('No se pudo crear la carga/ubicacion')
        //obtiene coord descarga
        const {data:latLngDescarga} = await ServiceLocation.getGoogleGeocodingLatLng(newDirectionDownload);
        coordsDescarga = latLngDescarga;
        if(!coordsDescarga) throw new Error('No se pudo crear la carga/ubicacion')
    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga/ubicacion')
        console.log(error);
    }
    try {
        const { data: ubicacionCarga, error: ubicacionCargaError } = await supabase.from('ubicaciones').insert({
            direccion: direccionCarga!,
            provincia_id: provinceLoadID!,
            ciudad_id: cityLoadID!,
            lat: coordsCarga!.lat,
            lng: coordsCarga!.lng
        }).select('id');
        if(ubicacionCargaError)throw new Error(ubicacionCargaError.message)
        
        const { data: ubicacionDescarga, error: ubicacionDescargaError } = await supabase.from('ubicaciones').insert({
            direccion: direccionDescarga!,
            provincia_id: provinceDownloadID!,
            ciudad_id: cityDownloadID!,
            lat: coordsDescarga!.lat,
            lng: coordsDescarga!.lng,
        }).select('id');

        if(ubicacionDescargaError)throw new Error(ubicacionDescargaError.message);
            //ID's  de las ubicaciones
        ubicacionInicial = ubicacionCarga[0].id;
        ubicacionFinal = ubicacionDescarga[0].id;

    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga')
        console.log(error);
    }

    //Creacion de Carga
    try {
        const loadPresentation = 
        tipoCarga === 'Granel Bulto' 
                ? 'GranelBulto' 
                : tipoCarga === 'Big Bag' 
                ? 'BigBag' 
                : tipoCarga;
        const material = MaterialEnum[tipo as keyof typeof MaterialEnum]
        const tipoCargaId = LoadUnitWithIdEnum[loadPresentation as keyof typeof LoadUnitWithIdEnum]
        const userID = (await getUserId()).toString();
        console.log({
            material,
            tipoCargaId,
            loadPresentation
        })
        if(!userID)return;
        const newLoadData: Database['public']['Tables']['cargas']['Insert'] = {
            dador_id: userID,
            peso: peso.toString(),
            ubicacionfinal_id: ubicacionFinal!,
            ubicacioninicial_id: ubicacionInicial!,
            telefonodador: telefono,
            puntoreferencia: puntoReferencia || null,
            material_id: material,
            presentacion_id: tipoCargaId,
            valorviaje: precio.toString(),
            pagopor: 'Otros',
            otropagopor: null,
            fechacarga: fechaCarga,
            fechadescarga: fechaDescarga,
            formadepago_id: 'c96c6cd8-8742-4a8c-9df6-18554a7c87af',
            email: correo,
            tipo_equipo: tipoEquipo 
          };
         const {data: newLoad, error: loadError} = await supabase.from('cargas').insert(newLoadData).select('id');
         
         console.timeEnd('a');
         
         if(loadError) throw loadError;
    } catch (error) {
        Alert.alert('Error', 'No se pudo crear la carga')
        console.log(error);
    }



}

