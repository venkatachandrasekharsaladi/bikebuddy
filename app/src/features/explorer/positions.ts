import { BikeComponent } from '../../types';

export type Point = { x: number; y: number };
export function getAnchor(index: number, total: number): Point {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1);
  return { x: 50 + Math.cos(angle) * 25, y: 50 + Math.sin(angle) * 18 };
}
export function getSpread(index: number, total: number): Point {
  const angle = (Math.PI * 2 * index) / Math.max(total, 1);
  const radius = 24 + (index % 4) * 8;
  return { x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius * 0.72 };
}
export function getPositions(components: BikeComponent[]) {
  return components.reduce<Record<string, { anchor: Point; spread: Point }>>((result, component, index) => {
    result[component.id] = { anchor: getAnchor(index, components.length), spread: getSpread(index, components.length) };
    return result;
  }, {});
}
