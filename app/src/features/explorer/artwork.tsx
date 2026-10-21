import React, { memo } from 'react';
import Svg, { Circle, G, Line, Path, Rect } from 'react-native-svg';
import { BikeComponent } from '../../types';

type ArtworkProps = { component: BikeComponent; selected?: boolean; size: number };

export const PartArtwork = memo(function PartArtwork({ component, selected = false, size }: ArtworkProps) {
  const fill = selected ? '#FF6B1A' : '#667080';
  const secondary = selected ? '#FF9A5C' : '#AAB2BF';
  const wheel = component.name.toLowerCase().includes('wheel') || component.name.toLowerCase().includes('tyre') || component.name.toLowerCase().includes('rim');
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" accessibilityLabel={component.name}>
      <G id={`part-${component.id}`} data-anchor-x="50" data-anchor-y="50">
        {wheel ? <><Circle cx="50" cy="50" r="34" fill="none" stroke={fill} strokeWidth="10" /><Circle cx="50" cy="50" r="25" fill="none" stroke={secondary} strokeWidth="2" /></> : component.category === 'Brakes' ? <><Circle cx="50" cy="50" r="28" fill="none" stroke={secondary} strokeWidth="7" /><Path d="M30 42h40v16H30z" fill={fill} /></> : component.category === 'Suspension' ? <Path d="M35 15L65 85M65 15L35 85" stroke={fill} strokeWidth="12" strokeLinecap="round" /> : component.category === 'Body & Frame' ? <Path d="M18 66L38 35h27l17 31M38 35l-8 31M65 35l5 31M18 66h64" fill="none" stroke={fill} strokeWidth="9" strokeLinejoin="round" /> : component.category === 'Electrical' ? <><Rect x="24" y="25" width="52" height="50" rx="8" fill={fill} /><Path d="M50 32v36M32 50h36" stroke={secondary} strokeWidth="5" /></> : <><Circle cx="50" cy="50" r="29" fill={fill} /><Path d="M23 50h54M50 23v54" stroke={secondary} strokeWidth="5" /></>}
      </G>
    </Svg>
  );
});

export const AssembledBikeArtwork = memo(function AssembledBikeArtwork({ components, selectedId }: { components: BikeComponent[]; selectedId?: string }) {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 1200 700" accessibilityLabel="Side view placeholder bike illustration">
      <G id="bike-assembled">
        <Circle cx="270" cy="500" r="125" fill="none" stroke="#667080" strokeWidth="20" />
        <Circle cx="930" cy="500" r="125" fill="none" stroke="#667080" strokeWidth="20" />
        <Path d="M270 500L460 290 650 500 930 500M460 290L560 500M460 290H700L930 500M650 500L700 290" fill="none" stroke="#AAB2BF" strokeWidth="18" strokeLinejoin="round" />
        <Path d="M430 270h130M670 270h120M685 245l-15 45M550 250l20 40" stroke="#FF6B1A" strokeWidth="14" strokeLinecap="round" />
        {components.map((component) => <G key={component.id} id={`part-${component.id}`} data-anchor-x="600" data-anchor-y="350"><Circle cx="600" cy="350" r={selectedId === component.id ? 18 : 7} fill={selectedId === component.id ? '#FF6B1A' : 'transparent'} /></G>)}
      </G>
    </Svg>
  );
});
