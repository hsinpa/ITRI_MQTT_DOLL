import { produce } from "immer";
import {create} from 'zustand';

type ValidationZusStore = {
    state: string,
    set_state: (state: string) => void
}

export const useUserInfoStore = create<ValidationZusStore>( (set, get) => ({
    state: '',

    set_state(state: string) {
        set( produce( (s : ValidationZusStore) => {
            s.state = state;
        }));
    },
}));

