/* eslint-disable no-unused-vars */
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { app } from '../firebase';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';

const CreatePost = () => {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();
    const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }], // superscript/subscript
          [{ indent: "-1" }, { indent: "+1" }], // indent
          [{ direction: "rtl" }], // text direction
          [{ size: ["small", false, "large", "huge"] }], // custom font sizes
          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"], // remove formatting button
        ],
      };
    
    const handleUploadImage = async ()=>{
        try {
            if(!file){
                return;
            }
            setImageUploadError(null)
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', (snapshot)=> {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },

                (error)=>{
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },

                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                        setImageUploadError(null);
                        setImageUploadProgress(null);
                        setFormData({...formData, image:  downloadURL});
                    });
                }
            );
            
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res = await fetch('/api/v1/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(formData),
            });

            const data = await res.json();
            if(!res.ok){
                setPublishError(data.msg);
                return;
            }

            if(res.ok){
                setPublishError(null);
                navigate(`/posts/${data.slug}`)
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    }
  return (
    <div className='p-3 max-w-6xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
        <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput 
                    type='text' 
                    placeholder='title' 
                    required id='title' 
                    className='flex-1'
                    onChange={(e)=>setFormData({...formData, title: e.target.value})}
                />
                <Select onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                    <option value="uncategorized">Select a category</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Health">Health</option>
                    <option value="technology">Technology</option>
                    <option value="space">space</option>
                    <option value="food & recipes">food & recipes</option>
                    <option value="lifestyle">lifestyle</option>
                </Select>
            </div>
            <div className='flex gap-4 item-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput 
                    type='file' 
                    accept='image/*'
                    onChange={(e) => setFile(e.target.files[0])}    
                />
                <Button 
                    type='button' 
                    gradientDuoTone='purpleToBlue' 
                    size='sm' outline className='mt-4'
                    onClick={handleUploadImage}
                    disabled={imageUploadProgress}
                >
                    {
                        imageUploadProgress ? 
                       ( 
                        <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )
                    } 
                </Button> 
                {imageUploadError &&
                    <Alert color='failur'>
                        {imageUploadError}
                    </Alert>
                }

            </div>
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 object-cover'
                    />
                )}
            <ReactQuill 
                theme="snow" 
                placeholder='Write something...' 
                className='h-72 mb-12' required
                modules={modules}
                onChange={(value)=>{
                    setFormData({...formData, content: value});
                }}
            />
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Publish
            </Button>

            {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
        </form>
    </div>
  )
}

export default CreatePost