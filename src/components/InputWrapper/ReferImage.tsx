import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';

function ReferImage() {
    const [imageURL, setImageURL] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (!event.target.files) {return}
        
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        if (imageURL) {
            URL.revokeObjectURL(imageURL)
        }
        setImageURL(url);
    };

    const handleChoose: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = (event) => {
        inputRef.current?.click();
    }

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        URL.revokeObjectURL(imageURL);
        setImageURL('');
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

            { imageURL?
                <div 
                    className='w-64 h-64 mb-4 bg-cover bg-center'
                    style={{backgroundImage: `url('${imageURL}')`}}
                /> :
                
                // No Image
                <div
                    onClick={handleChoose} 
                    className='w-64 h-64 mb-4 bg-slate-50 flex items-center justify-center cursor-pointer' >
                    Please Upload an Image
                </div>
            }

            <div className='flex justify-around' >
                <button onClick={handleChoose} > Choose </button>
                <button onClick={handleDelete} > Delete </button>
            </div>
        </div>
    )
}

export default ReferImage