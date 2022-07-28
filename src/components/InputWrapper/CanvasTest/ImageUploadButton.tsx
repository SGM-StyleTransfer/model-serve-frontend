import React from 'react';

type Props = {
    imageURL: string;
    setImageURL: React.Dispatch<React.SetStateAction<string>>;
}

function ImageUploadButton({imageURL, setImageURL}: Props) {

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        if (imageURL) {
            URL.revokeObjectURL(imageURL)
        }
        setImageURL(url);
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
