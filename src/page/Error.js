import { BsClipboardX } from 'react-icons/bs';

export default function Error() {
    return(
        <div className="pt-5 pb-4 tab background">
            <div className='text-light text-center' style={{'marginTop':'15%'}}>
                <BsClipboardX size={150}/>
                <div className='mt-3'>
                    <h5 className='d-inline text-danger'>Opps ! </h5>
                    <h5 className='d-inline'>The page you are looking for seem doesn't exist.</h5>
                </div>
                <p className='text-warning'>ERROR CODE: 404</p>
            </div>
        </div>
    );
}