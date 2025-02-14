import React, { useEffect, useRef } from 'react'
import Input from '../Utils/Input'
import Dropdown from '../Utils/Dropdown'
import { CATEGORY } from '../Category';
import { get, post, put } from '../Axios/Axios';
import { useLocation, useNavigate } from 'react-router-dom';

function CreateNote() {

    const navigate=useNavigate();

    const location=useLocation();
    const prefillData=location.state;

    const DROPDOWN=useRef();
    const TITLE=useRef();
    const CONTENT=useRef();

    const handleSubmitNote=()=>{

        const category=DROPDOWN.current.getValue();
        const title=TITLE.current.getValue();
        const content=CONTENT.current.value;

        if(prefillData){

            put(`api/notes/${prefillData._id}`,{content,title,category},(r)=>{
                if(r){
                    navigate('/view-notes');
                    alert('Note Updated Successfully');
                    return ;
                }
            })
            return ;
        }

        if(!category){
            alert('Please select a category');
            return ;
        } 

        if(!title){
            alert('Please enter a title');
            return ;
        }

        if(!content){
            alert('Please enter a content');
            return ;
        }

        post(`api/notes`,{content,title,category},(r)=>{
            if(r){
                navigate('/view-notes');
                alert('Note Submitted Successfully');
                return ;
            }
        })
    }

    return (
        <div className='pd-10 border-1 margin-10' >
            <Input defaultValue={prefillData ? prefillData.title : ''} ref={TITLE} labelStyle={{marginBottom:'5px'}} placeholder="Enter Title" style={{display:'grid'}} label='Heading'  />
            <textarea
                defaultValue={prefillData ? prefillData.content : ''}
                ref={CONTENT}
                style={{display:'block',marginBottom:'15px'}}
                label='Notes'
                placeholder='Enter Notes...' 
                cols={100}
                rows={20}
            />
            <div className='mb-9'>
                <Dropdown setDefaultValue={prefillData ? prefillData.category : ''} label='Category' ref={DROPDOWN} options={CATEGORY} />
            </div>
            <button onClick={()=>handleSubmitNote()} className='button green' >
                Submit Note
            </button> 
        </div>
    )
}

export default CreateNote 