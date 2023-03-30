import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
       items:[]
    },
    reducers: {
      addPost: (state, action) => {
        state.items.push(action.payload);
        // console.log(action.payload);
      },
      deletePost: (state, action) => {
        state.items = state.items.filter((e) => e.id!== action.payload)
      },
      updatePost: (state, action) => {
        // eslint-disable-next-line array-callback-return
        state.items.map((e)=>{
            if(e.id === action.payload.id){
                e.title = action.payload.title;
                e.description = action.payload.description;
            }
        })
      }
    }
})
export const { addPost , deletePost , updatePost} = postsSlice.actions;

export default postsSlice.reducer
