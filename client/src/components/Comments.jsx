/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {  Button, Avatar,Fieldset, Divider, Rating, Dialog,InputTextarea } from 'primereact';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useEffect, useState,useContext } from 'react';
import {UserContext} from './UserContext'
const CommentList = ({locId}) => {
    const [rating, setRating] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const {userInfo}=useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const token = localStorage.getItem('token');
    const [loading,setLoading]=useState(false)
    const fetchComments = async () => {
      setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`);
            const comment = await response.json();
             const filter=comment.filter((comments)=>comments.location===locId)
            setComments(filter);
        } catch (error) {
            console.error('Error fetching comments details:', error);
        }
        setLoading(false);
    };

    const handleComment = () => {
        setVisible(true); 
    };

    const handleDialogSubmit = async () => {
        if (rating === null) {
            alert('Please provide a rating.');
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/comments`, {
            method: 'POST',
            body: JSON.stringify({ text, rating,locId }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `${token}`
            }
        });
        if (response.ok) {
            console.log('Comment posted successfully');
            setText('');
            setRating(null);
            setVisible(false);
            fetchComments(); 
        }
    };

    const handleDialogHide = () => {
        setVisible(false);
    };

    useEffect(() => {
        fetchComments();
    }, [locId]);
    const handleDelete=async(id)=>{
        const response=await fetch(`${import.meta.env.VITE_API_URL}/comments`,{
            method:'DELETE',
            body:JSON.stringify({id}),
            headers:{
                'content-type':'application/json',
                'Authorization':`${token}`
            }
        })
        if(response.ok){
            fetchComments();
        }
    }
    return (
        <>
            <div className='flex justify-content-center flex-column align-items-center' style={{ marginTop: '20px' }}>
                <div>
                <InputTextarea value={text} onChange={(e) => setText(e.target.value)} rows={5} cols={30} placeholder="Enter your comments"/>
                </div>
                <div>
                    <Button onClick={handleComment} style={{marginBottom:'10px'}}>Post Comment</Button>
                </div>
            </div>

            <Dialog
                header="Rate Your Comment"
                visible={visible}
                onHide={handleDialogHide}
                footer={
                    <div>
                        <Button label="Submit" icon="pi pi-check" onClick={handleDialogSubmit} />
                        <Button label="Cancel" icon="pi pi-times" onClick={handleDialogHide} className="p-button-secondary" />
                    </div>
                }
                style={{ width: '50vw' }}
            >
                <div className="p-d-flex p-jc-center p-ai-center">
                    <Rating value={rating} onChange={(ev) => setRating(ev.value)} cancel={false} />
                </div>
            </Dialog>

            <div className="p-m-4">
            {!loading && comments.length > 0 ? (
                    comments.map((comment,index) => (
                        <>
                        <div key={index} className='flex justify-content-center '>
                       
                        <Fieldset legend={
                        <div className="flex align-items-center gap-2 px-2">
                            <Avatar image={comment.user.imageData} shape="circle" />
                            <span className="font-bold">{comment.user.name}</span>
                        </div>
                    } key={index}  style={{width:'400px'}}>
                        <p className="m-0">
                            {comment.text}
                        </p>
                        <div className='flex justify-content-between'>
                        <Rating value={comment.rating} cancel={false} readOnly></Rating>
                        {
                            userInfo._id===comment.user._id && <Button severity="danger" outlined onClick={()=>handleDelete(comment._id)}>Delete</Button>
                            
                        }
                        </div>
                        
                    </Fieldset>
                    
                    </div>
                    <Divider layout="vertical" type="solid" />
                    </>
                    ))
                ) : (
                    <div className='flex justify-content-center'>

                    <p>No comments available</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CommentList;
