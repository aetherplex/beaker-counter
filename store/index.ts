import { atom } from 'jotai';
import { CounterApp } from '../beaker/counterapp_client';

interface IAppInfo {
    id?: number;
    address?: string;
}

export const accountsAtom = atom<any[]>([]);

export const counterAtom = atom(0);

export const appInfoAtom = atom<IAppInfo>({});

export const appClientAtom = atom<CounterApp | undefined>(undefined);
