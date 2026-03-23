import { createSlice } from "@reduxjs/toolkit";
import { FaSun, FaMoon } from "react-icons/fa";

const initialState = {
    state: 'light',
    icon: FaSun
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            if (state.state === 'light') {
                state.state = 'dark';
                state.icon = FaMoon;
            } else {
                state.state = 'light';
                state.icon = FaSun;
            }
        },
        setTheme: (state, action) => {
            state.state = action.payload;
            state.icon = action.payload === 'dark' ? FaMoon : FaSun;
        }
    }
})

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;