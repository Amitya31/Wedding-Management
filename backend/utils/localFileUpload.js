// Local file upload utility (replaces Cloudinary)
export const saveLocalFile = (buffer, filename) => {
    // For now, return a mock URL - in production you'd save to local storage
    return `http://localhost:3000/uploads/${filename}`;
};

export const deleteLocalFile = (filename) => {
    // For now, just log - in production you'd delete from local storage
    console.log(`Deleting file: ${filename}`);
};
