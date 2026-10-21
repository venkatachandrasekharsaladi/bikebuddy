import { BillAnalysis, BillItem } from '../types';

const mockedItems: BillItem[] = [
  { id: 'bill-oil', name: 'Engine oil', explanation: 'Fresh oil helps the engine move smoothly.', priceInr: 1450, flag: 'normal' },
  { id: 'bill-pads', name: 'Brake pads', explanation: 'These rubbing blocks help your bike stop.', priceInr: 2200, flag: 'check', reason: 'The price is a little higher than the usual range.' },
  { id: 'bill-cleaning', name: 'Engine flush', explanation: 'A cleaner is added before new oil.', priceInr: 900, flag: 'unnecessary', reason: 'Often not needed at every routine service.' },
];
export async function analyzeBill(_photoUri: string): Promise<BillAnalysis> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const totalInr = mockedItems.reduce((total, item) => total + item.priceInr, 0);
  return { items: mockedItems, totalInr, fairPriceMinInr: 3500, fairPriceMaxInr: 5000 };
}
