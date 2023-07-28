import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secert: process.env.CLOUDINARY_SECERT_KEY,
});

const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      (res) => {
        resolve({
          public_id: res.public_id,
          url: res.url,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
export {uploads,cloudinary}
 