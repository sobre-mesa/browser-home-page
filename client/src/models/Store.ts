import { SavedItem } from './SavedItem';
import { Note } from './Note';
import { Category } from './Category';

export type StoreCategory = Category & { items: SavedItem[] };
export type DataState ={
  status: 'idle' | 'loading' | 'failed',
  apps: { 
    name: string,
    items : SavedItem[] 
  },
  channels: { 
    name: string,
    items : SavedItem[] 
  }, 
  categories: StoreCategory[],
  notes: Note[], 
  modalsOpen: {
    note: boolean,
    category: boolean,
    savedItem: boolean,
  }
}