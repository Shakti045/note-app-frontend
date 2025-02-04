import {createSlice} from '@reduxjs/toolkit'

export interface Imedia{
    _id:string,
    createdby:string,
    note:string,
    url:string
}
export interface INote {
  _id:string;
  createdBy: String;
  title?: string;
  description?: string;
  createdat: number;
  createdfrom: "Text" | "Audio";
  images: Imedia[];
}


const initialState:{
    notes:INote[],
    favouritenotes:string[],
} = {
    notes:[],
    favouritenotes:localStorage.getItem("favnotes")?JSON.parse(localStorage.getItem("favnotes")!):[]
}

export const noteslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        set_notes:(state,action)=>{
            state.notes = action.payload;
        },
        add_note:(state,action)=>{
            state.notes = [action.payload,...state.notes];
        },
        remove_note:(state,action)=>{
            state.notes = state.notes.filter((note)=>note._id!=action.payload)
        },
        add_to_fav:(state,action)=>{
            state.favouritenotes = [action.payload,...state.favouritenotes];
            localStorage.setItem("favnotes",JSON.stringify(state.favouritenotes));
        },
        update_note:(state,action)=>{
            state.notes = state.notes.map((note)=>{
                if(note._id===action.payload._id) return action.payload;
                return note;
            })
        },
        remove_from_fav:(state,action)=>{
            state.favouritenotes = state.favouritenotes.filter((id)=>id!=action.payload);
            localStorage.setItem("favnotes",JSON.stringify(state.favouritenotes));
        },
        add_media:(state,action)=>{
            state.notes = state.notes.map((note)=>{
                if(note._id===action.payload.note) return {...note,images:[action.payload,...note.images]};
                return note;
            })
        }
    }
})

export const {set_notes,add_note,remove_note,add_to_fav,update_note,remove_from_fav,add_media}=noteslice.actions;
export default noteslice.reducer;