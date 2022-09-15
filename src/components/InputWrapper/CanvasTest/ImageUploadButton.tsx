import React from 'react';
import { useMedia } from '@hooks/useMedia';

function ImageUploadButton() {

    const { refImgUrl, setRefImg } = useMedia();

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        if (refImgUrl) {
            URL.revokeObjectURL(refImgUrl)
        }
        setRefImg({
            refImgUrl: url,
            refImgFile: file,
        })
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.png,.jpeg"
            />
        </div>
    )
}

export default ImageUploadButton;
