import { Mod } from '../types';
import mods from '../data/mods.json';
export async function getMods(): Promise<Mod[]> { return mods as Mod[]; }
export async function getModsForBikeType(bikeType: Mod['compatibleBikeTypes'][number]): Promise<Mod[]> { return (await getMods()).filter((mod) => mod.compatibleBikeTypes.includes(bikeType)); }
