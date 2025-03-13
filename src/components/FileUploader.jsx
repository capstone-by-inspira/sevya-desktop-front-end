import { useState } from "react";
import { uploadImage } from "../services/api"; // Import API function

const ImageUploader = ({collectionName, id, documentData, token, refreshData,onImageUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    try {
      setUploading(true);
      const data = await uploadImage(selectedFile, collectionName, id, documentData, token );
      
      onImageUpload(data.imageUrl);

    } catch (error) {
      alert(error.message || "An error occurred while uploading.");
    } finally {
        refreshData()
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {/* {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )} */}
    </div>
  );
};

export default ImageUploader;
