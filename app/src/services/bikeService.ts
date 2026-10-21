import { Bike, BikeComponent } from '../types';
import motorcycleComponents from '../data/motorcycleComponents.json';
import bicycleComponents from '../data/bicycleComponents.json';
import bikes from '../data/bikes.json';

export async function getBikes(): Promise<Bike[]> { return bikes as Bike[]; }
export async function getBikeById(id: string): Promise<Bike | undefined> { return (await getBikes()).find((bike) => bike.id === id); }
export async function getComponents(bikeType: Bike['bikeType']): Promise<BikeComponent[]> { return (bikeType === 'motorcycle' ? motorcycleComponents : bicycleComponents) as BikeComponent[]; }
export async function getComponentById(bikeType: Bike['bikeType'], id: string): Promise<BikeComponent | undefined> { return (await getComponents(bikeType)).find((component) => component.id === id); }
export async function saveBike(bike: Bike): Promise<Bike> { return bike; }
