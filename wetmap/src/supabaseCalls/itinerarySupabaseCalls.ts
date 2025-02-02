import { supabase } from '../supabase';
import { ItineraryItem } from '../entities/itineraryItem';

export const itineraries = async (IdNo: number) => {
  const { data, error } = await supabase
    .from('itineraries')
    .select()
    .eq('shopID', IdNo);

  if (error) {
    console.log('couldn\'t do it 34,', error);
    return ([]);
  }

  if (data) {
    return data as ItineraryItem[];
  }
};

export const insertItineraryRequest = async (values: ItineraryItem, reqType: string) => {
  const { data, error } = await supabase.from('itineraryRequests').insert([
    {
      shopID:      values.shopID,
      tripName:    values.tripName,
      startDate:   values.startDate,
      endDate:     values.endDate,
      price:       values.price,
      description: values.description,
      siteList:    values.siteList,
      BookingPage: values.BookingPage,
      requestType: reqType,
    },
  ]);

  if (error) {
    console.log('couldn\'t do it: itinerary edit/delete request,', error);
  }
  return { data, error };
};
