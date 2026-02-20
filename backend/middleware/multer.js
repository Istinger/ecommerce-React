import multer from 'multer';
// Configuración del almacenamiento
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        // Aquí decides el nombre con el que se guardará el archivo
        callback(null,file.originalname)
    }
})

//upload middleware
const upload = multer({storage})

export default upload;