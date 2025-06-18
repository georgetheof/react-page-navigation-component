import { lazy, Suspense, useMemo } from 'react';
import type { IconType } from 'react-icons';
import type { IconPack } from '../../../types';

// Helper to load a single icon dynamically
const loadIcon = (pack: string, iconName: string) => {
  const importer = {
    fa: () => import('react-icons/fa'),
    bs: () => import('react-icons/bs'),
    ci: () => import('react-icons/ci'),
    io: () => import('react-icons/io'),
    cg: () => import('react-icons/cg'),
    lu: () => import('react-icons/lu'),
    pi: () => import('react-icons/pi'),
  }[pack];

  if (!importer) {
    throw new Error(`Unknown icon pack: ${pack}`);
  }

  return lazy(async () => {
    const mod = await importer();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icons = mod as any;

    const Icon = icons[iconName] as IconType;

    if (!Icon) {
      throw new Error(`Icon "${iconName}" not found in pack "${pack}"`);
    }

    return { default: Icon };
  });
};

type DynamicIconProps = {
  pack: IconPack;
  iconName: string;
  size?: number;
  color?: string;
  iconClick?: () => void;
};

export function DynamicIcon({ pack, iconName, size = 24, color, iconClick }: DynamicIconProps) {
  const Icon = useMemo(() => loadIcon(pack, iconName), [pack, iconName]);

  return (
    <Suspense fallback={<span></span>}>
      <Icon size={size} color={color} onClick={iconClick} />
    </Suspense>
  );
}
