# React Squoosh

React Squoosh is a library that allows you to resize and compress your images using [WebAssembly](https://webassembly.org/) in your React project. It was based on the amazing work done for [Squoosh App](https://squoosh.app/).

## The Gist

```jsx
import React, { useRef } from 'react';
import { useSquoosh, FitMethod } from 'react-squoosh';


const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { loading, imgSrcPreview, squooshFile } = useSquoosh(opts);
  
  const onChangeImage = () => {
    const files = inputRef.current?.files || [];
    if (files[0]) {
      squooshFile(files[0]);
    }
  };

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : (
        <>
          <input
            ref={inputRef}
            accept="image/*"
            type="file"
            onChange={onChangeImage}
          />
          {imgSrcPreview && (
            <img src={imgSrcPreview}  alt="Preview" />
          )}
        </>
      )}
    </div>
  );
}
```