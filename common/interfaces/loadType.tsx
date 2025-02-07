
//Truck types
export type LoadType = 'Tolva' | 'Camioneta' | 'Furgon' | 'Chasis' | 'Acloplado' | 'Carreton' | 'CamionJaula';
export const LoadTypeArray: LoadType[] = ['Tolva', 'Camioneta', 'Furgon', 'Chasis', 'Acloplado', 'Carreton', 'CamionJaula'];
export enum LoadTypeEnum {
    Tolva = 'Tolva',
    Camioneta = 'Camioneta',
    Furgon = 'Furgon',
    Chasis = 'Chasis',
    Acloplado = 'Acloplado',
    Carreton = 'Carreton',
    CamionJaula = 'CamionJaula',
}
export enum EnumTruckTypes {
    Tolva = "5939b8d1-71d7-4e37-851b-db388856945e",
    Camioneta = "8fa614ad-af82-4909-b0ff-b1d288ea97a3",
    Furgon = "9eb2b303-5c92-45ae-8120-4cc40dd3fa49",
    Chasis = "a16bdd90-df15-4adf-8cc4-7a74ad375ffd",
    Acloplado = "e1c0cc7d-27fb-4206-9fe3-280ffc40d742",
    Carreton = "779ba2a1-f4e3-4121-be59-3e1cdd2c6da8",
    CamionJaula = "1933f25d-eb8e-43cf-b2e8-5224ab6a4ef2"
  }
//Unit Types
export type LoadUnit = 'Bolsa' | 'Big Bag' | 'Pallet' | 'Granel Bulto' | 'Otros';
export const LoadUnitArray: LoadUnit[] = ['Bolsa', 'Big Bag', 'Pallet', 'Granel Bulto', 'Otros'];
export enum LoadUnitEnum {
    Bolsa = 'Bolsa',
    BigBag = 'Big Bag',
    Pallet = 'Pallet',
    GranelBulto = 'Granel Bulto',
    Otros = 'Otros',
}



//Transaction Types
export type PaymentMethod = 'Efectivo' | 'Transferencia' | 'Cheque' | 'E-check' | 'Otros';
export const PaymentMethodArray: PaymentMethod[] = ['Efectivo', 'Transferencia', 'Cheque', 'E-check', 'Otros'];
export enum PaymentMethodEnum {
    Efectivo = 'Efectivo',
    Transferencia = 'Transferencia',
    Cheque = 'Cheque',
    Echeck = 'E-check',
    Otros = 'Otros',
}
export enum LoadUnitWithIdEnum {
    Bolsa = 'e676ca36-8a96-4338-9a41-2692c18664f5',
    BigBag = 'ca7cf082-837c-4c14-b2ad-c85f0821d86c',
    Pallet = '234a739b-6666-4595-a8df-51e840c09599',
    GranelBulto = '3923f3da-eb7d-4438-8fcd-74d53891c392',
    Otros = '510db5c8-eb5f-4ef1-b23a-96d4e4869f2d'
}
export enum PaymentMethodWithId {
    Efectivo = 'c96c6cd8-8742-4a8c-9df6-18554a7c87af',
    Transferencia = '7b998228-2121-465b-9721-679a320e50ae', 
    Cheque = '48c0c41f-ed88-4b3a-b06d-9a1f03131fe8', 
    Echeck = '692684a5-9103-4257-a3e3-6486f907177a', 
    Otros = 'e0f74bf6-2886-44da-9469-c68ffaf53e4f',  
}

//Tipado Cargas (respuestas y caso de uso)
export interface LoadSupabaseUnit {
    dador_id:            string;
    fechacarga:          string;
    fechadescarga:       string;
    formadepago_id:      string;
    id?:                  string;
    material_id:         string;
    otropagopor:         null;
    pagopor:             string;
    peso:                string;
    presentacion_id:     string;
    puntoreferencia:     string;
    telefonodador:       string;
    ubicacionfinal_id:    string;
    ubicacioninicial_id: string;
    valorviaje:          string;
    tipo_equipo: string
}
export interface LoadSupabaseResponse{
    data: LoadSupabaseUnit[];
    error?: any;
}

//Load:

export interface Load{
    id: string;
    dador: string;
    material: string;
    peso: string;
    presentacion: string;
    ubicacionInicial: string;
    ubicacionFinal: string;
    fechaCarga: string;
    fechaDescarga: string;
    valorViaje: string;
    pagoPor: string;
    formadepago: string 
    otroPagoPor: string | null;
    telefonoDador: string;
    puntoReferencia: string;
    tipoEquipo: string;
}