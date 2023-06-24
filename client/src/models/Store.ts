import { SavedItem } from './SavedItem';
import { Note } from './Note';
import { Category } from './Category';

export type StoreCategory = Category & { items: SavedItem[] };
export type SystemCategory = {
  id: string,
  name: string,
  items : SavedItem[]
}

type ModalsOpen = {
  note: boolean,
  category: boolean,
  savedItem: boolean,
}
export type DataState ={
  status: 'idle' | 'loading' | 'failed',
  apps: SystemCategory,
  channels: SystemCategory, 
  categories: StoreCategory[],
  notes: Note[], 
  modalsOpen: Record<string, boolean>
}