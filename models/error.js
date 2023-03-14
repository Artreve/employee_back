class HttpError extends Error{
    constructor(message, errorCode){
        super(message);//Agregamos una propiedad de mensaje
        this.code = errorCode; //Agregamos el codigo de estado del error
    }
}
module.exports = HttpError;