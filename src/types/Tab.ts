import type { IconPack } from "./Icon";

export type TabType = 'add-fab' | 'add-page';

export interface Tab {
  id: string;
  label: string;
  iconPack?: IconPack;
  iconName?: string;
  type?: TabType | undefined;
}
