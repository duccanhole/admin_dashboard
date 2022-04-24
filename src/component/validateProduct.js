
export default function validateProduct(name, arrSize, arrColor, price, description, images, type){
    let message = '';
    switch(true){
        case name==='':
            message = 'name is required.';
            break;
        case images.length===0:
            message = 'image is required.';
            break;
        case arrSize.length===0:
            message = 'size is required.';
            break;
        case type==='':
            message = 'type is required.';
            break;
        case arrColor.length===0:
            message = 'color is required.';
            break;
        case price==='':
            message = 'price is required.';
            break;
        case !description:
            message = 'please type description.';
            break;
        default:
            message = '';
    }
    return message;
}