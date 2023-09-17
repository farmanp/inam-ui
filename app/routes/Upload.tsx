// src/routes/Upload.tsx
import { Link } from 'remix';
import { useRef } from 'react';

export default function Upload() {
  const fileRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', fileRef.current.files[0]);

    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData,
    });    

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h2>Upload a Manual</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileRef} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
