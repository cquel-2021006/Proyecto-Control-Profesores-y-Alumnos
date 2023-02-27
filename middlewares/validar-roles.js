const { response, request } = require('express');


const esProfesor = async( req = request, res= response,next ) => {
     const rol = req.usuario.rol;
    if(rol==="PROFESOR_ROLE"){
       
        next();
        
    }else{
        return res.status(500).json({
            msg: `El rol: ${rol} no tiene los permisos`
        })
    }
    

   
}

const esAlumno = async( req = request, res= response,next ) => {
    const rol = req.usuario.rol;
   if(rol==="ALUMNO_ROLE"){
      
       next();
       
   }else{
       return res.status(500).json({
           msg: `El rol: ${rol} no tiene los permisos`
       })
   }
   

  
}

module.exports = {
    esProfesor, 
    esAlumno
}
