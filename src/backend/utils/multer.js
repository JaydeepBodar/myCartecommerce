import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getDate() + "_" + file.originalname);
  },
});
const fileFilter=(req,file,cb)=>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png"){
        cb(null,true)
    }else{
        cb({'error':"Unspported document Upload valid documents like JPEG JPG and PNG"})
    }
}
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter
});
export default upload;
