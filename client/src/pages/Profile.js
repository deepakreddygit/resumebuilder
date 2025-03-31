import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserDetails, getUserProfile, uploadProfileImage, deleteProfileImage,changePassword } from '../api';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt, faCamera, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  



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

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.warn('Please fill in all fields.');
      return;
    }
  
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^(){}[\]\\/+<>=~|_.,:;"'-]).{8,}$/;
  
    if (!passwordRegex.test(newPassword)) {
      console.log("Invalid password entered:", newPassword); // ✅ For debugging
      toast.warn('New password must be at least 8 characters and include uppercase, lowercase, number & special character.');
      return;
    }
  
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match!');
      return;
    }
  
    try {
      const result = await changePassword(userId, currentPassword, newPassword, confirmNewPassword);
  
      if (result.message) {
        toast.success(result.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setShowPasswordModal(false);
      } else {
        toast.error(result.error || 'Failed to change password.');
      }
    } catch (err) {
      toast.error('Something went wrong!');
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

{/* chnage password */}
<div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
  <button
    className="btn change-password-btn"
    onClick={() => setShowPasswordModal(true)}
    style={{
      backgroundColor: "#333",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Change Password
  </button>
</div>

{/* 🔐 Change Password Modal */}
{showPasswordModal && (
  <div 
    className="modal-overlay"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div 
      className="modal-content"
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <h4 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "15px" }}>
        Change Password
      </h4>
      
    {/* 🔐 Current Password */}
<div style={{ position: "relative", marginBottom: "10px" }}>
<input
    type={showCurrentPassword ? "text" : "password"}
    placeholder="Current Password"
    value={currentPassword} // ✅ Correct value
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="form-input"
    style={{ width: "100%", padding: "8px", paddingRight: "40px" }}
  />
  <FontAwesomeIcon
    icon={showCurrentPassword ? faEyeSlash : faEye}
    onClick={() => setShowCurrentPassword((prev) => !prev)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#888"
    }}
  />
</div>

{/* 🔐 New Password */}
<div style={{ position: "relative", marginBottom: "10px" }}>
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="form-input"
    style={{ width: "100%", padding: "8px", paddingRight: "40px" }}
  />
  <FontAwesomeIcon
    icon={showNewPassword ? faEyeSlash : faEye}
    onClick={() => setShowNewPassword((prev) => !prev)}
    style={{
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#888"
    }}
  />
</div>

{/* 🔐 Confirm New Password */}
<input
  type="password"
  placeholder="Confirm New Password"
  value={confirmNewPassword}
  onChange={(e) => setConfirmNewPassword(e.target.value)}
  className="form-input"
  style={{ marginBottom: "20px", width: "100%", padding: "8px" }}
/>

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          className="btn confirm-btn"
          onClick={async () => {
            await handleChangePassword(); // show toast + reset
          }}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          className="btn cancel-btn"
          onClick={() => setShowPasswordModal(false)}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* change password  */}
        
      </div>
{/* Delete Confirmation Modal */}
{showConfirmDelete && (
  <div 
    className="modal-overlay"
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    }}
  >
    <div 
      className="modal-content"
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "350px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px", color: "#333" }}>
        Confirm Deletion
      </h4>
      <p 
        className="delete-warning"
        style={{
          fontSize: "16px",
          color: "#555",
          marginBottom: "15px",
        }}
      >
        Are you sure you want to delete your profile picture?
      </p>
      <div 
        className="modal-buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button 
          className="btn confirm-btn"
          onClick={handleDeleteImage}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Confirm
        </button>
        <button 
          className="btn cancel-btn"
          onClick={() => setShowConfirmDelete(false)}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

{/* Upload Confirmation Modal */}
{showSaveModal && (
  <div 
    className="modal-overlay"
    style={{
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    }}
  >
    <div 
      className="modal-content"
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "350px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
        animation: "fadeIn 0.3s ease-in-out",
      }}
    >
      <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px", color: "#333" }}>
        Confirm Image Upload
      </h4>
      <div 
        className="modal-image-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <img 
          src={previewURL} 
          alt="Preview" 
          className="modal-preview-img"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #ddd",
          }}
        />
      </div>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "15px" }}>
        Do you want to upload this image?
      </p>
      <div 
        className="modal-buttons"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button 
          className="btn confirm-btn"
          onClick={handleSaveImage}
          style={{
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          <FontAwesomeIcon icon={faSave} /> Confirm
        </button>
        <button 
          className="btn cancel-btn"
          onClick={() => setShowSaveModal(false)}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            fontWeight: "600",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
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


