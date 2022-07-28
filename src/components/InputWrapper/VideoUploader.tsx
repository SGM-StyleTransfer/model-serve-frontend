import React from "react";

type Props = {
    width: number;
    height: number;
}

export default function VideoInput(props: Props) {
  const { width, height } = props;

  const inputRef = React.useRef<HTMLInputElement>();

  const [source, setSource] = React.useState<string>();

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    if (source) {
      URL.revokeObjectURL(source)
    }
    setSource(url);
  };

  const handleChoose = (event: any) => {
    inputRef.current?.click();
  };

  return (
    <div className="VideoInput">
      <input
        ref={inputRef && null}
        className="VideoInput_input"
        type="file"
        onChange={handleFileChange}
        accept=".mov,.mp4"
      />
      {!source && <button onClick={handleChoose}>Choose</button>}
      {source && (
        <video
          className="VideoInput_video"
          width={width}
          height={height}
          controls
          src={source}
        />
      )}
      <div className="VideoInput_footer">{source || "Nothing selectd"}</div>
    </div>
  );
}
