import { create } from "zustand"
import { immer } from "zustand/middleware/immer";

type TempUserInfoState = {
    name: string,
    set_name: (p_name: string) => void
}

export const useTempUserInfoStore = create<TempUserInfoState>()(
    immer((set) => ({
        name: '',
        set_name: (p_name: string) => set((state) => {state.name = p_name } ),        
    })),
)

