import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, deletePost, updatePost } from '../../store/postsSlice'

import './posts.css'

function Posts() {
    const {items} = useSelector(state => state.posts);

    const dispatch = useDispatch()

    // to add Post
    const [Data, setData] = useState({
        title : '',
        description : '',
    })
    
    const handleChange = (e) => {
        switch(e.target.name) {
            case 'title':
              setData({...Data, title: e.target.value})
            break;

            case 'description':
              setData({...Data, description: e.target.value})
            break;
            
            default:
              break;
        }
    }
    
    const handleClick = () => {
        if(Data.title.length > 0 && Data.description.length > 0){
            dispatch(addPost({id: items.length+1 , ...Data}))
            setData({
                title : '',
                description : '',
            })
        }else{
            alert('Please fill all fields')
        }
    }
    // to add Post


    // for edit
    const[Id , setId] = useState(null);

    const [isEdit, setIsEdit] = useState(false)

    const [EditData, setEditData] = useState({
        title : '',
        description : '',
    })

    const handleChangeEdit = (e) => {
        switch(e.target.name) {
            case 'titleedit':
              setEditData({...EditData, title: e.target.value})
            break;

            case 'descriptionedit':
              setEditData({...EditData, description: e.target.value})
            break;
            
            default:
              break;
        }
    }
    
    // for edit

    return (
        <div>
            <div className='form' >
                <input type='text' placeholder='Enter Post Title' value={Data.title} onChange={handleChange} name='title'/>
                <input type='text' placeholder='Enter Post Description' value={Data.description} onChange={handleChange} name='description'/>
                <button onClick={handleClick}>Add POst</button>
            </div>
    
            <div className='posts'>
                   { items.length > 0 ? items.map((e)=>
                    <div className='post' key={e.id}>
                        <h2>{e.title}</h2>
                        <p>{e.description}</p>
                        <button onClick={()=> {
                            setIsEdit(!isEdit)
                            setId(e.id)
                        }}>Edit Post</button>
                        <button onClick={()=>dispatch(deletePost(e.id))}>Delete Post</button>

                        <br/>
                        
                        {isEdit === true && Id === e.id ? 
                        <>
                        <input type='text' placeholder='Update Title' value={EditData.title} onChange={handleChangeEdit} name='titleedit'/>
                        <input type='text' placeholder='Update description' value={EditData.description} onChange={handleChangeEdit} name='descriptionedit'/>
                        <button onClick={()=>{
                            if(EditData.title.length > 0 && EditData.description.length > 0){

                                dispatch(updatePost({id: e.id, ...EditData}))

                                setEditData({
                                    title : '',
                                    description : '',
                                })
                                setIsEdit(false)
                            }else{
                                alert('Please fill all fields')
                            }
                            // dispatch(updatePost({id: e.id, ...EditData}))

                            // setEditData({
                            //     title : '',
                            //     description : '',
                            // })
                            // setIsEdit(false)
                        }}>Update</button> 
                        </>
                        : ""
                        } 
                        

                   </div> 
                   ): <h3>'THERE ARE NO POSTS YET'</h3>}

            </div>
        </div>
    )
}

export default Posts


