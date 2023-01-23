class MessageHelper{
 printLogErr(Msg, Err, Path){
    console.error(Msg, Err);
    window.location.href = Path;
 }
}

const mMessageHelper = new MessageHelper();
export default mMessageHelper;