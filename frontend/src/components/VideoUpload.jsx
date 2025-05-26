import axios from 'axios';
import React, { useState } from 'react';

function VideoUpload() {
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const uploadVideo = async () => {
    if (!video) return;

    try {
      setUploading(true);

      // 1. Get presigned URL from Django
      const response = await axios.post('/generate-presigned-url/', {
        file_name: video.name,
        file_type: video.type,
      });

      const { data, url } = response.data;

      // 2. Upload to S3 using the presigned POST data
      const formData = new FormData();
      Object.entries(data.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('file', video);

      await axios.post(data.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Upload successful!');
      console.log('File available at:', url);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={uploadVideo} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Video'}
      </button>
    </div>
  );
}

export default VideoUpload;