import React from 'react'
import Header from '../components/Header'
import { useState, useRef, useEffect } from 'react';
import Select from 'react-select'
import { useMusicContext } from '../utils/MusicContext';
import api from '../api/Api';
import { storage } from '../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router';
import { getMusicByID } from '../api/MusicApi';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const IMAGE_COMPRESS_LINK = "https://imagecompressor.com/"
const EditUploadSong = () => {
  const  {id} = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [musicName, setMusicName] = useState('');
  const [description, setDesscription] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('Private');
  const [musicGerne, setMusicGerne] = useState([]);
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [isEnableUpload, SetIsEnableUpload] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isImageChange, setIsImageChange] = useState(false);
  const imageInputRef = useRef(null);
  const {setIsActive} = useMusicContext();
  const {authUser} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  setIsActive(false);
  useEffect(() =>{
        if(!authUser)
        {
          navigate('/')
          return;
        }
        const getGerne = async() =>{
            try{
            await api.get('/api/genre').then(
                response =>{
                  const data = []
                  response.data.data.map((gerne,index)=>{
                    data.push({label: gerne.musicGenre, value: gerne._id})
                  })
                  data.push({value: 'other', label: 'Other'})
                  setOptions(data)
                }
              )
            }
            catch(err){
                setIsError(true);
            }
        }
        if(!song)
        {
          getGerne();
        }
    },[])
    useEffect(()=>{
      const getMusic = async()=>
      {
        try{
      const respone = await getMusicByID(id);
      setSong(respone.data.data)
      if(authUser._id !==respone.data.data.musicPostOwnerID)
      {
        navigate('/')
        return;
      }
      const data = []
      respone.data.data.genre.map((genre,index)=>{
        const foundItem = options.find(item => item.label === genre);
        data.push({label: foundItem.label, value: foundItem.value})
      })
      setSelectedPrivacy(respone.data.data.musicPrivacyType);
      setMusicName(respone.data.data.musicName);
      setMusicGerne(data);
      setArtist(respone.data.data.author);
      setDesscription(respone.data.data.description);
      setLyrics(respone.data.data.lyrics);
      setIsLoading(false);
      }
      catch(e)
      {
        setIsError(true);
      }
    }
    if(options.length!==0 && !song)
      getMusic()
    },[options])
  const handleRadioChange = (event) => {
    setSelectedPrivacy(event.target.id);
  };
  const handleCancelUpload = (event) => {
     event.preventDefault();
     window.history.back();
  }
  const handleMusicSelection = (event) => {
    event.preventDefault();

  };
  const handleImageSelection = (event)=>{
    event.preventDefault();
    imageInputRef.current.click();
  }
  const onImageChange = (event) => {
    if(event.target.files.length>0 )
     {
      if(event.target.files.length>0 )
      {
        var selectedFile = event.target.files[0];
          
        // Kiểm tra dung lượng của file (đơn vị tính là byte)
        var fileSizeInBytes = selectedFile.size;
    
        // Kiểm tra dung lượng theo đơn vị MB
        var fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        if(fileSizeInMB > 5)
        {
          Swal.fire({
            title: "Image file upload failed!",
            text: `Your image exceeds the 5MB limit. Please use the image compressor tool at this link ${IMAGE_COMPRESS_LINK}`,
            icon: "error"
        });
            event.target.value = null;
        }
        else if (!selectedFile.type.startsWith('image/')) {
          Swal.fire({
            title: "Image upload failed!",
            text: "You have uploaded an incorrect file type. Please upload an image file.",
            icon: "error"
          });
          event.target.value = null;
          return; // Dừng việc thực hiện các hành động khác nếu có lỗi
        }
        else{
          setSelectedImage(event.target.files[0]);
          setIsImageChange(true);
        }
     }
    }
  };
  const uploadFile = (folder, file, id) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `${folder}/${`${id}.png`}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            alert(error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(`URL: ${downloadURL}`);
              resolve(downloadURL);
            });
          }
        );
      }
    });
  };

  const handleUploadMusic = async () => {
    if (!selectedImage && !song) {
      toast.warn("Please add your music Image!");
      return;
    }
    Swal.fire({
      title: "Update song information",
      text: "Are you sure you want to update?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
      }).then(async (result) => {
      if (result.isConfirmed) {
        SetIsEnableUpload(false);
        const gerne = [];
        musicGerne.map((music, index) => {
          gerne.push(music.label);
        });
      
        try {
          let imageURL = song.imgUrl;
          song.imgUrl = imageURL 
          song.description = description;
          song.author = artist;
          song.genre = gerne;
          song.musicPrivacyType = selectedPrivacy;
          song.musicName = musicName;
          if(isImageChange)
           imageURL = await uploadFile("music_avatar", selectedImage, song._id);
          await api.put(`/api/music/${song._id}`, song);
          Swal.fire({
            title: "Updated!",
            text: "Your song has been updated.",
            icon: "success"
            });  
          window.history.back();

        } catch (error) {
          toast.error("Upload Failed.");
        }
        SetIsEnableUpload(true);
      }
      });

  // if (!isEnableUpload) {
  //   console.log("Block");
  //   return;
  // }


};
  const colorStyles = {
    control: (styles) => {
      return {
        ...styles,
        backgroundColor: '#181818',
        paddingTop: '4px',
        paddingBottom: '4px',
        border: '1px solid', // Set the default border style
        borderColor: '#181818', // Set the default border color
        ':hover': {
          borderColor: 'white' // Set the border color to white on focus
        },
      };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: '#181818' };
    },
    multiValue: (styles) => {
      return {
        ...styles,
        backgroundColor: '#555555',
        color: "#fff",
      };
    },
    multiValueLabel: (styles) => {
      return {
        ...styles,
        color: "#fff",
      };
    },
    multiValueRemove: (styles) => {
      return {
        ...styles,
        color: "#fff",
        cursor: "pointer",
        ":hover": {
          color: "gray",
        },
      };
    },
  };

  const [showOtherInput, setShowOtherInput] = useState(false);
  const handleInputGenreChange = (inputValue, actionMeta) => {
    // Handle trc khi đưa vô
  };

  const handleGenreChange = (selectedOption, actionMeta) => {
    if (selectedOption.length <= 3 ) {
      setMusicGerne(selectedOption);
    }
    setShowOtherInput(selectedOption.some(option => option.value === 'other'));
};



  return (
    isLoading ? (
      <div className='text-center w-screen h-screen py-60'>
        <span className="loader h-20 w-20 "></span>
      </div> ):(
    <div className='py-16 bg-black opacity-90 text-white w-full h-full '>
       <Header />
       <div className='container py-24  mx-auto px-4 md:px-0 md:w-[60%]'>
        <form className='flex flex-col border border-gray-800 rounded shadow bg-[#181818] my-20 '>
            <div className='flex flex-row justify-between mt-14 md:px-16 gap-8'>
            <input type='file'
                onChange={onImageChange}
                accept='image/*'
                style={
                  {display: 'none'}
                }
                ref={imageInputRef}/>
            {!song ? <div className='flex items-end justify-center w-56 h-56 bg-gradient-to-r from-[#846170] to-[#70929c]'>
                <button className='mb-4 bg-slate-600 flex rounded-lg items-center px-2 gap-2 py-1 '
                type='button'
                onClick={handleImageSelection}>
                  <i class="ri-camera-line"></i>
                  <p className='text-[14px]'>Upload image</p>
                </button>
              </div>:
              <div className='relative w-56 h-56'>
                <img src={selectedImage? URL.createObjectURL(selectedImage) : song && song.imgUrl} alt="SongImage" className="rounded object-cover h-56 w-56" />
                <button className=' opacity-0 hover:opacity-100 absolute bottom-0 mb-4 bg-slate-600 ml-10 flex rounded-lg items-center px-2 gap-2 py-1'
                onClick={handleImageSelection}
                type = 'button'>
                  <i class="ri-camera-line"></i>
                  <p className='text-[14px]'>Upload image</p>
                </button>
              </div>}

              <div className='w-3/4 flex flex-col'>
                <div className='flex flex-row gap-1 items-center '>
                  <p className='font-bold text-sm'>Title</p>
                  <span className='text-red-600'>*</span>
                </div>
                <input className='w-full border bg-[#181818] mt-2 px-2 rounded py-2 focus:border-slate-400'
                  value={musicName}
                  onChange={e=>{setMusicName(e.target.value)}}
                  required/>
                  <div className='my-2'>
                    <div className='flex flex-row gap-1 items-center '>
                      <p className='font-bold text-sm'>Artist</p>
                      <span className='text-red-600'>*</span>
                    </div>
                    <input type="text" className='border bg-[#181818] px-2 rounded mt-1 py-2 w-full'
                    value={artist}
                    onChange={e=>{setArtist(e.target.value)}}
                    required/>
                  </div>
                  <div className='my-2'>
                    <div className='flex flex-row gap-1 items-center '>
                      <p className='font-bold text-sm'>Genre</p>
                      <span className='text-red-600'>*</span>
                    </div>
                      <div>
                          <Select
                            isMulti
                            options={options}
                            styles={colorStyles}

                            onInputChange={handleInputGenreChange}
                            onChange={handleGenreChange}
                            value={musicGerne} maxValues={3}
                          />
                          {showOtherInput && <input className=' mt-4 border bg-[#181818] px-2 rounded py-2 w-full' type="text" placeholder="Please fill your other genre" />}
                        </div>
                  </div>
                <p className='font-bold text-sm '>Description</p>
                <textarea
                value={description}
                onChange={e=>setDesscription(e.target.value)}
                name="descriptionSong" id="descriptionSong" className=' resize-none h-28 border bg-[#181818] px-2 rounded mt-2 py-1' placeholder='Describe your track' cols="20" rows="10"></textarea>
                <p className='font-bold text-sm my-2 '>Lyrics</p>
                <textarea
                value={lyrics}
                onChange={e=>setLyrics(e.target.value)}
                name="lyricSong" id="lyricSong" className=' h-60 border bg-[#181818] px-2 rounded py-2' cols="30" rows="10"></textarea>
                <p className='font-bold mt-2'>Privacy</p>
                <div className="flex mt-4 flex-col gap-1">
                  <div>
                    <input type="radio" name="visibility" id="Public"
                           checked={selectedPrivacy === 'Public'}
                           onChange={handleRadioChange}/>
                    <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded ">Public</label>
                  </div>
                  <div>
                  <input type="radio" name="visibility" id="Private"
                           checked={selectedPrivacy === 'Private'}
                           onChange={handleRadioChange}/>
                    <label htmlFor="Private" className="cursor-pointer py-2 px-4 rounded">Private</label>
                  </div>
                  <p className='ml-7 text-xs text-gray-400'>Only you and people share a secret link with will be able to listen to this track</p>
                </div>
              </div>
            </div>
            <div className='flex justify-between px-16 mt-4 py-4 items-center border-gray-800 border-t-[1px]'>
              <div className='flex items-center gap-1'>
                <span className='text-red-600'>*</span>
                <p className='text-xs font-bold'>Require field
                </p>
              </div>
              <div className='flex gap-4 text-sm'>
                <button className='hover:bg-slate-300 px-6 rounded py-2 hover:text-black'
                  onClick={handleCancelUpload}>Cancel</button>
                <button  onClick={handleUploadMusic} type='button'
                 className=' bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 px-6 rounded py-2 text-white'>Save</button>
              </div>
            </div>
          </form>
       </div>

    </div>
  ))
}

export default EditUploadSong
