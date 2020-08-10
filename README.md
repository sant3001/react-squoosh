# React Squoosh

React Squoosh is a library that allows you to resize and compress your images using [WebAssembly](https://webassembly.org/) in your React project. It was based on the amazing work done for [Squoosh App](https://squoosh.app/).

## Install
```
npm i react-squoosh
```

## Hosting the wasm files

Download these two files and place them in your public folder:
* [squoosh_resize_bg.wasm](https://github.com/sant3001/react-squoosh/raw/master/public/wasm/squoosh_resize_bg.wasm)
* [mozjpeg_enc.wasm](https://github.com/sant3001/react-squoosh/raw/master/public/wasm/mozjpeg_enc.wasm)

## The Gist

If you are using Create React App you can reference the wasm files using your public folder URL: `process.env.PUBLIC_URL`


```jsx
import React, { useRef } from 'react';
import { useSquoosh, FitMethod } from 'react-squoosh';

const resizeWasmUrl = `${process.env.PUBLIC_URL}/squoosh_resize_bg.wasm`;
const optimizeWasmUrl = `${process.env.PUBLIC_URL}/mozjpeg_enc.wasm`;

const App = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const opts = {
    wasmFileUrls: { resizeWasmUrl, optimizeWasmUrl },
    resizeOpts: { width: 300, height: 300, fitMethod: FitMethod.Contain },
  };
  
  const { squooshFile, loading, imgSrcPreview, file } = useSquoosh(opts);
  
  const onChangeImage = () => {
    const files = inputRef.current?.files || [];
    if (files[0]) {
      squooshFile(files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      // Do something with the compressed file
    }
  }, [file]);

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