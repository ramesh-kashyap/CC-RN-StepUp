import React, { createContext, useState, useContext } from 'react';

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [pickedImage, setPickedImage] = useState(null);

  return (
    <ImageContext.Provider value={{ pickedImage, setPickedImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => useContext(ImageContext);
