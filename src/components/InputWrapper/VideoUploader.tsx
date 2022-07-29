import React, { ChangeEventHandler, MouseEventHandler, useRef, useState } from "react";

export default function VideoInput() {

  const inputRef = useRef<HTMLInputElement>(null);
  const [source, setSource] = useState<string>();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) { return; }

    const file = event.target.files[0]  
    const url = URL.createObjectURL(file);
    if (source) {
      URL.revokeObjectURL(source)
    }
    setSource(url);
  };

  const handleChoose: 
    MouseEventHandler<HTMLButtonElement | HTMLDivElement> 
  = (event) => {
    inputRef.current?.click();
  };

  const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSource('');
  }

  return (
    <div>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {source ? 
        // Video Component
        <video
          className="mb-4 w-64 h-64"
          controls
          src={source}
        /> :
        // Video doesn't exist
        <div 
          onClick={handleChoose}
          className="w-64 h-64 bg-slate-50 flex items-center justify-center mb-4 cursor-pointer"
        >
          Video Not Selected
        </div>
      }

      {/* Button Container */}
      <div className="flex justify-around" >
        <button onClick={handleChoose}>Choose</button>
        <button onClick={handleDelete} >Delete</button>
      </div>
    </div>
  );
}
