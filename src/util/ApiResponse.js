class ApiResponse{
    constructor(success=true,statusCode,message,data=null,meta=null){
        this.success=success
        this.statusCode=statusCode
        this.message=message
        this.data=data
        this.meta=meta

    }
}
export {ApiResponse}