import { SelectBox } from '@components/commons';
import { useMedia } from '@hooks/useMedia';
import React, { ChangeEventHandler, MouseEventHandler, useRef } from 'react';

function ReferImage() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { refImgUrl, setRefImg } = useMedia();

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) {return}
        
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        if (refImgUrl) {
            URL.revokeObjectURL(refImgUrl)
        }
        setRefImg({
            refImgUrl: url,
            refImgFile: file,
        });
    };

    const handleChoose: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
        inputRef.current?.click();
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        URL.revokeObjectURL(refImgUrl);
        setRefImg({
            refImgUrl: '',
            refImgFile: null,
        });
    }

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.png,.jpeg"
                className='hidden'
            />

            { refImgUrl?
                <div 
                    className='w-64 h-64 mb-4 bg-cover bg-center'
                    style={{backgroundImage: `url('${refImgUrl}')`}}
                /> :
                
                // No Image
                <SelectBox onClick={handleChoose} >
                    Please Upload an Image
                </SelectBox>
            }

            <div className='flex justify-around' >
                <button onClick={handleChoose} > Choose </button>
                <button onClick={handleDelete} > Delete </button>
            </div>
        </div>
    )
}

export default ReferImage