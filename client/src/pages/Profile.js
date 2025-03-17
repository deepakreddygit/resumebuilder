import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserDetails, getUserProfile, uploadProfileImage, deleteProfileImage } from '../api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt, faCamera, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const menuRef = useRef(null);

  const defaultImage = '/assets/images/default_profile.jpg';

  const [userProfile, setUserProfile] = useState({
    phone: 'No Phone Provided',
    summary: 'No Summary Available',
    education: [],
    languages: [],
    profileImage: defaultImage,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(defaultImage);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    getUserDetails(userId)
      .then((userData) => {
        setUserProfile((prev) => ({ ...prev, name: userData.name, email: userData.email }));
      })
      .catch(() => toast.error('Failed to load user details.'));

    getUserProfile(userId)
      .then((profileData) => {
        if (profileData) {
          setUserProfile((prev) => ({
            ...prev,
            phone: profileData.phone || 'No Phone Provided',
            summary: profileData.summary || 'No Summary Available',
            education: profileData.education || [],
            languages: profileData.languages || [],
            profileImage: profileData.profileImage || defaultImage,
          }));
          setPreviewURL(profileData.profileImage || defaultImage);
        }
      })
      .catch(() => toast.error('Failed to load user profile.'));
  }, [userId, navigate]);

  // Close the menu if the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowDeleteMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setShowSaveModal(true); // Show confirmation modal before saving
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile) {
      toast.warn('Please select an image first!', { autoClose: 3000 });
      return;
    }
  
    const formData = new FormData();
    formData.append('profileImage', selectedFile);
  
    try {
      const response = await uploadProfileImage(userId, formData);
      setPreviewURL(response.profileImageUrl);
      setShowSaveModal(false);
      setSelectedFile(null);
      toast.success('Profile image uploaded successfully!', { autoClose: 3000 });
  
      // // Reload the page after a short delay to update the image
      // setTimeout(() => {
      //   window.location.reload();
      // }, 4000);
    } catch (err) {
      toast.error('Failed to upload image.', { autoClose: 3000 });
    }
  };
  
  

  const handleDeleteImage = async () => {
    try {
      await deleteProfileImage(userId);
      setPreviewURL(defaultImage);
      setShowConfirmDelete(false);
      setShowDeleteMenu(false);
      toast.success('Profile image deleted successfully!', { autoClose: 3000 });
    } catch (err) {
      toast.error('Failed to delete profile image.', { autoClose: 3000 });
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-image-container">
          <img src={previewURL} alt="Profile" className="profile-img" />
          <label className="custom-file-upload">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <FontAwesomeIcon icon={faCamera} className="camera-icon" />
          </label>
        </div>

        {/* Three-dot menu, only visible if there's an uploaded image */}
        {previewURL !== defaultImage && (
          <div className="three-dot-menu" ref={menuRef}>
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="ellipsis-icon"
              onClick={() => setShowDeleteMenu((prev) => !prev)}
            />
            {showDeleteMenu && (
              <div className="dropdown-menu">
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  disabled={previewURL === defaultImage} // Disable delete if it's the default image
                >
                  <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* Show delete confirmation */}
        {showConfirmDelete && (
          <div className="confirm-delete-text">
            <p>Are you sure you want to delete?</p>
            <button className="btn confirm-btn" onClick={handleDeleteImage}>
              Confirm
            </button>
            <button className="btn cancel-btn" onClick={() => setShowConfirmDelete(false)}>
              Cancel
            </button>
          </div>
        )}

        <h4 style={{fontWeight : "600"}}>{userProfile.name}</h4>
        <p><strong>Email:</strong> {userProfile.email}</p>
        {/* <p><strong>Phone:</strong> {userProfile.phone}</p> */}

        <button className="btn view-resumes-btn" onClick={() => navigate('/saved-resumes')}>
          View Saved Resumes
        </button>
      </div>
      {/* Delete Confirmation Modal */}
{showConfirmDelete && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Confirm Deletion</h4>
      <p className="delete-warning">Are you sure you want to delete your profile picture?</p>
      <div className="modal-buttons">
        <button className="btn confirm-btn" onClick={handleDeleteImage}>
          Confirm
        </button>
        <button className="btn cancel-btn" onClick={() => setShowConfirmDelete(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{/* Upload Confirmation Modal */}
{showSaveModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Confirm Image Upload</h4>
      <div className="modal-image-container">
        <img src={previewURL} alt="Preview" className="modal-preview-img" />
      </div>
      <p>Do you want to upload this image?</p>
      <div className="modal-buttons">
        <button className="btn confirm-btn" onClick={handleSaveImage}>
          <FontAwesomeIcon icon={faSave} /> Confirm
        </button>
        <button className="btn cancel-btn" onClick={() => setShowSaveModal(false)}>
          <FontAwesomeIcon icon={faTimes} /> Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;


