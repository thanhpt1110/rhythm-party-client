import React from 'react';
import Footer from '../components/Footer';
import {useRef, useState} from 'react';
import Header from '../components/Header';
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'mint', label: 'Mint' },
  { value: 'caramel', label: 'Caramel' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'other', label: 'Other' }
]
const Upload = ({user}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);
  const fileInputRef = useRef(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setShow(!show);
  };
  const handleCancelUpload = () => {
    setShow(false);
  }
  const handleFileSelection = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
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
    console.log("handleInputChange", inputValue, actionMeta);
  };
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleGenreChange = (selectedOption, actionMeta) => {
    setShowOtherInput(selectedOption.some(option => option.value === 'other'));
    if (selectedOption.length <= 3) {
      setSelectedOptions(selectedOption);
    }

};
  return (
    <div className='bg-black opacity-90 h-screen w-screen'>
      <Header user={user} type='upload' />
      <div className=' text-white bg-black '>
         <main className=' container py-24  mx-auto px-4 md:px-0 md:w-[60%] '>
        {
        !show ? (
          <form className='min-h-[400px] flex items-center justify-center flex-col gap-4 rounded-xl bg-[#181818] hover:bg-gray-800'
          >
            <i className='ri-upload-cloud-line text-5xl text-blue-400 '></i>
            <h1 className='text-2xl font-bold text-center'>
              Choose or drag and drop files to upload.
            </h1>
            <div>
              <input type='file'
                onChange={onFileChange}
                accept='*/*'
                style={
                  {display: 'none'}
                }
                ref={fileInputRef}/>
              <button className='bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-6 rounded hover:scale-105 duration-300 mt-2'
                onClick={handleFileSelection}>
                Choose File
              </button>
            </div>
          </form>
        ) : (
          <form className=' flex flex-col border border-gray-800 rounded shadow bg-[#181818] my-20 '>
            <div className='flex flex-row justify-between mt-14 md:px-16 gap-8'>
              <div className='flex items-end justify-center w-56 h-56 bg-gradient-to-r from-[#846170] to-[#70929c]'>
                <button className='mb-4 bg-slate-600 flex rounded-lg items-center px-2 gap-2 py-1'>
                  <i class="ri-camera-line"></i>
                  <p className='text-[14px]'>Upload image</p>
                </button>
              </div>
              <div className='w-3/4 flex flex-col'>
                <div className='flex flex-row gap-1 items-center '>
                  <p className='font-bold text-sm'>Title</p>
                  <span className='text-red-600'>*</span>
                </div>
                <input className='w-full border bg-[#181818] mt-2 px-2 rounded py-2 focus:border-slate-400'
                  placeholder={
                    selectedFile.name
                  }
                  required/>
                  <div className='my-2'>
                    <div className='flex flex-row gap-1 items-center '>
                      <p className='font-bold text-sm'>Artist</p>
                      <span className='text-red-600'>*</span>
                    </div>
                    <input type="text" className='border bg-[#181818] px-2 rounded mt-1 py-2 w-full' required/>
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
                            value={selectedOptions} maxValues={3}
                          />
                          {showOtherInput && <input className=' mt-4 border bg-[#181818] px-2 rounded py-2 w-full' type="text" placeholder="Please fill your other genre" />}
                        </div>
                  </div>
                <p className='font-bold text-sm '>Description</p>
                <textarea name="descriptionSong" id="descriptionSong" className=' resize-none h-28 border bg-[#181818] px-2 rounded mt-2 py-1' placeholder='Describe your track' cols="20" rows="10"></textarea>
                <p className='font-bold text-sm my-2 '>Lyrics</p>
                <textarea name="lyricSong" id="lyricSong" className=' h-60 border bg-[#181818] px-2 rounded py-2' cols="30" rows="10"></textarea>
                <p className='font-bold mt-2'>Privacy</p>
                <div className="flex mt-4 flex-col gap-1">
                  <div>
                    <input type="radio" name="visibility" id="Public"/>
                    <label htmlFor="Public" className="cursor-pointer py-2 px-4 rounded ">Public</label>
                  </div>
                  <div>
                    <input type="radio" name="visibility" id="Private"/>
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
                <button className=' bg-gradient-to-r from-indigo-600 to-purple-700 hover:scale-105 duration-300 px-6 rounded py-2 text-white'>Save</button>
              </div>
            </div>
          </form>

        )
      } </main>
      <Footer className='pt-40'/>
    </div>
      </div>
  );
};

export default Upload;
