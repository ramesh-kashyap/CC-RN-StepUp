import React, { createContext, useState, useContext } from 'react';
import { Text } from 'react-native'; // Ensure you are importing Text component

const ImageContext = createContext();

// ImageProvider component to provide image state globally
export const ImageProvider = ({ children }) => {
  const [pickedImage, setPickedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ pickedImage, setPickedImage }}>
      {/* Ensure children are wrapped properly */}
      {typeof children === "string" ? <Text>{children}</Text> : children}

    </ImageContext.Provider>
  );
};

// Custom hook to use image context in any component
export const useImage = () => useContext(ImageContext);
