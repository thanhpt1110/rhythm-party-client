import React from 'react';
import Footer from '../components/Footer';
import {useRef, useState,useEffect} from 'react';
import Header from '../components/Header';
import Select from 'react-select'
import { useMusicContext } from '../utils/MusicContext';
import api from '../api/Api';
import { storage } from '../utils/Firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';


const Upload = ({user}) => {
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);
  const [options, setOptions] = useState([]);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [musicName, setMusicName] = useState('');
  const [description, setDesscription] = useState('');
  const [selectedPrivacy, setSelectedPrivacy] = useState('Private');
  const [musicGerne, setMusicGerne] = useState([]);
  const [artist, setArtist] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [duration, setDuration] = useState(0);
  const [show, setShow] = useState(false);
  const [isEnableUpload, SetIsEnableUpload] = useState(true);
  const musicInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const AUDIO_COMPRESS_LINK = "https://products.aspose.app/audio/compress"
  const IMAGE_COMPRESS_LINK = "https://imagecompressor.com/"

  const onMusicChange = async(event) => {
    var selectedFile = event.target.files[0];
        
    // Kiểm tra dung lượng của file (đơn vị tính là byte)
    var fileSizeInBytes = selectedFile.size;

    // Kiểm tra dung lượng theo đơn vị MB
    var fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    // Hiển thị thông báo nếu dung lượng vượt quá 15MB
    if (fileSizeInMB > 15) {
      Swal.fire({
        title: "Audio file upload failed!",
        text: `Your audio exceeds the 15MB limit. Please use the audio compressor tool at this link '${AUDIO_COMPRESS_LINK}'`,
        icon: "error"
        });
        event.target.value = null;
        return;
    } else if (!selectedFile.type.startsWith('audio/')) {
      Swal.fire({
        title: "Audio upload failed!",
        text: "You have uploaded an incorrect file type. Please upload an audio file.",
        icon: "error"
      });
      event.target.value = null;
      return; // Dừng việc thực hiện các hành động khác nếu có lỗi
  }
    else {
      setSelectedMusic(selectedFile);
      setShow(!show);
    }
  };
  useEffect(()=>{
    if (selectedMusic) {
      console.log(selectedMusic)
        const audio = audioRef.current;
        const objectURL = URL.createObjectURL(selectedMusic);
        audio.src = objectURL;

        audio.onloadedmetadata = () => {
          // Thời lượng bài hát (trong giây)
          setDuration(audio.duration);

          URL.revokeObjectURL(objectURL);
        };
      }
    },[selectedMusic]);
  const handleRadioChange = (event) => {
    setSelectedPrivacy(event.target.id);
  };
  const handleCancelUpload = () => {
    setShow(false);
    console.log("Enter cancel")
  }
  const handleMusicSelection = (event) => {
    event.preventDefault();
    musicInputRef.current.click();
  };
  const handleImageSelection = (event)=>{
    event.preventDefault();
    imageInputRef.current.click();
  }
  const onImageChange = (event) => {
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
      }
    }
  };
  const uploadFile = (folder, file, id,type) => {
    return new Promise((resolve, reject) => {
      if (file) {
        const storageRef = ref(storage, `${folder}/${`${id}.${type}`}`);
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

  const handleUploadMusic = async (e) => {
  e.preventDefault();
  if (!isEnableUpload) {
    console.log("Block");
    return;
  }
  if (!selectedImage || !selectedMusic) {
    toast.warn("Please add your music Image!");
    return;
  }
  SetIsEnableUpload(false);
  console.log(musicGerne.label);
  const gerne = [];
  musicGerne.map((music, index) => {
    gerne.push(music.label);
  });
  const music = {
    musicName: musicName,
    genre: gerne,
    author: artist,
    lyrics: lyrics,
    duration: duration,
    description: description,
    releaseYear: new Date().getFullYear(),
    musicPrivacyType: selectedPrivacy,
  };
  console.log(music);
  setLoading(true); // Set loading to true when starting the upload process

  try {
    const response = await api.post("/api/music", music);
    const data = response.data.data;
    const musicURL = await uploadFile("music", selectedMusic, data._id,"mp3");
    const imageURL = await uploadFile("music_avatar", selectedImage, data._id,"png");
    data.imgUrl = imageURL;
    data.url = musicURL;
    console.log(data);
    await api.put(`/api/music/${data._id}`, data);
    setLoading(false);
    toast.success("Upload Success!");
    setShow(false);
    setDesscription("");
    setMusicName("");
    setArtist("");
    setSelectedPrivacy("Private");
    setMusicGerne([]);
  } catch (error) {
    toast.error("Upload Failed.");
  } finally {
    setLoading(false)
  }
  SetIsEnableUpload(true);
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
const {setIsActive} = useMusicContext();
useEffect(()=>{
  setIsActive(false);
  api.get('/api/genre').then(
    response =>{
      const data = []
      response.data.data.map((gerne,index)=>{
        data.push({label: gerne.musicGenre, value: gerne._id})
      })
      data.push({value: 'other', label: 'Other'})
      setOptions(data)
    }
  )
},[])
  return (
    <div className='h-full w-full'>
      <ToastContainer position="bottom-right"
                              autoClose={2000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              className=''
                              closeOnClick
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="dark" />
      <Header user={user} type='upload' />
      <audio ref={audioRef} controls />
      <div className=' text-white bg-black opacity-90 '>
        {loading ?
          <div className='text-center w-screen h-screen py-60'>
            <span className="loader h-20 w-20 "></span>
          </div> :<main className=' container py-24  mx-auto px-4 md:px-0 md:w-[60%] '>
        {
        !show ? (
          <form className='min-h-[400px] flex items-center justify-center flex-col gap-4 rounded-xl bg-[#181818] hover:bg-gray-800'
          >
            <i className='ri-upload-cloud-line text-5xl text-indigo-600 '></i>
            <h1 className='text-2xl font-bold text-center'>
              Choose or drag and drop files to upload.
            </h1>
            <div>
              <input type='file'
                onChange={onMusicChange}
                accept='audio/*'
                style={
                  {display: 'none'}
                }
                ref={musicInputRef}/>
              <button className='bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-2 px-6 rounded hover:scale-105 duration-300 mt-2'
                onClick={handleMusicSelection}>
                Choose File
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleUploadMusic} className=' flex flex-col border border-gray-800 rounded shadow bg-[#181818] my-20 '>
            <div className='flex flex-row justify-between mt-14 md:px-16 gap-8'>
            <input type='file'
                onChange={onImageChange}
                accept='image/*'
                style={
                  {display: 'none'}
                }
                ref={imageInputRef}/>
            {!selectedImage ? <div className='flex items-end justify-center w-56 h-56 bg-gradient-to-r from-[#846170] to-[#70929c]'>
                <button className='mb-4 bg-slate-600 flex rounded-lg items-center px-2 gap-2 py-1 '
                type='button'
                onClick={handleImageSelection}>
                  <i class="ri-camera-line"></i>
                  <p className='text-[14px]'>Upload image</p>
                </button>
              </div>:
              <div className='relative w-56 h-56'>
                <img src={URL.createObjectURL(selectedImage)} alt="SongImage" className="rounded object-cover h-56 w-56" />
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
                  placeholder={
                    selectedMusic.name
                  }
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
                            placeholder="Pick your genre"
                            onInputChange={handleInputGenreChange}
                            onChange={handleGenreChange}
                            value={musicGerne} maxValues={3}
                          />
                          {showOtherInput && <input className=' mt-4 border bg-[#181818] px-2 rounded py-2 w-full' type="text" placeholder="Please fill your other genre" />}
                        </div>
                  </div>
                  <div className='flex flex-row gap-1 items-center mt-2'>
                      <p className='font-bold text-sm'>Description</p>
                      <span className='text-red-600'>*</span>
                    </div>
                <textarea
                value={description}
                onChange={e=>setDesscription(e.target.value)}
                name="descriptionSong" id="descriptionSong" className=' resize-none h-28 border bg-[#181818] px-2 rounded mt-2 py-1' placeholder='Describe your track' cols="20" rows="10"></textarea>
                    <div className='flex flex-row gap-1 items-center mt-2'>
                      <p className='font-bold text-sm'>Lyrics</p>
                      <span className='text-red-600'>*</span>
                    </div>
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
                <button onClick={handleUploadMusic} type='submit'
                 className=' bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 px-6 rounded py-2 text-white'>Save</button>
                <button className='hover:bg-slate-300 px-6 rounded py-2 hover:text-black'
                  onClick={handleCancelUpload} type='button'>Cancel</button>
              </div>
            </div>
          </form>
        )
      } </main>
        }

      <Footer className='pt-40'/>
    </div>
    </div>
  );
};

export default Upload;
