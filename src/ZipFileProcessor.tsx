import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import JSZip from "jszip";
import axios from "axios";

function ZipFileProcessor() {
    const [file, setFile] = useState<File | null>();
  const [files, setFiles] = useState<File[]>([]);
  const [destinationFolder, setDestinationFolder] = useState<string>("");
  const [fileNames, setFileNames] = useState<string[]>([]);
  // const destinationFolder = useRef(null);

  const unzip = useCallback(async () => {
    if (!file) return;
    const zip = new JSZip();
    zip.loadAsync(file)
      .then((zip) => {
        const { files: filesObj } = zip;
        // console.log({fileNames: Object.keys(filesObj)})
        // setFileNames(Object.keys(filesObj));
        // console.log({filesObj})
        // // setFiles(filesObj);
        Object.keys(zip.files).forEach((filename) => {
          zip.files[filename].async('string').then((fileData) => {
            console.log({fileData}) // These are your file contents
          })
        });
      });
    // const dirHandle = await window.showDirectoryPicker();
    // console.log(dirHandle)
  }, [file]);

  useEffect(() => {
    const callApi = async() => {
      const formData = new FormData();
      files.forEach((item, i) => {
        formData.append(`file-${i}`, item, item.name);
      });
      console.log(formData.entries());
      axios
        .post('http://localhost:3000/process-zip', formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res));
    }
    console.log({files})
    if (files.length) callApi();
  }, [files]);

  const processZipFile = useCallback(() => {
    if (!file) {
      console.log("No file uploaded");
      return;
    }
    unzip();
    // var path = dialog.showOpenDialog({
    //   properties: ['openDirectory']
    // });
    // console.log({path})
    
    // window.showDirectoryPicker();
  }, [file, unzip]);

  // useEffect(() => {
  //   console.log({destinationFolder: destinationFolder?.current})
  // }, [destinationFolder?.current]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files = [] } = e.target;
    if (files?.length && files?.[0]) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleDestinationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    if (value) {
      setDestinationFolder(value);
    } else {
      setDestinationFolder('');
    }
  };

  return (
    <div className="App">
      <div>
        <div className='div-zip-file-select'>
          <label htmlFor="file" className="choose-file-text">
            Choose a zipped file
          </label>
          <input
            id="file"
            name="zipfile"
            type="file"
            accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
            onChange={handleFileChange}
          />
        </div>
        <div className='div-destination-select'>
          <label htmlFor="file" className="choose-destination-text">
            Input destination folder
          </label>
          <input
            id="destination"
            name="destination"
            className="destination"
            type="text"
            onChange={handleDestinationChange}
          />
        </div>
        <button type='submit' onClick={processZipFile}>Submit</button>
      </div>
      {!!fileNames.length && (
        <div className='div-file-names'>
          <div><strong>Files:</strong></div>
          {fileNames.map(name => (
            <div>{name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    directory?: string;
    webkitdirectory?: string;
  }
}

export default ZipFileProcessor;
