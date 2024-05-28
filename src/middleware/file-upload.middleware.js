import multer from "multer";
const storageConfig = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/images/");
    },
    filename: (req, file, cb) => {  
        const name = Date.now()+"-"+file.originalname;  //Appending timestamp to the original file name.
        cb(null,name);
    },
})
export const fileUpload = multer({storage:storageConfig});