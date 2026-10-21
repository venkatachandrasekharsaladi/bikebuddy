import { ServiceRecord } from '../types';
import records from '../data/serviceRecords.json';
export async function getServiceRecords(bikeId: string): Promise<ServiceRecord[]> { return (records as ServiceRecord[]).filter((record) => record.bikeId === bikeId); }
export async function saveServiceRecord(record: ServiceRecord): Promise<ServiceRecord> { return record; }
