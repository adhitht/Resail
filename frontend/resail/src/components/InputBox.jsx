import React from "react";
import '../assets/css/components/InputBox.css'


function InputBox({ title, value, setValue, type, disabled }) {
    return (
        <div className="generic_container">
            <p className='generic_title'>{title}:</p>
            {
                disabled ?
                    (<input type="text" className='generic_input' value={value} disabled />) :
                    type == 'textarea' ? 
                    (<textarea type={type ? type : 'text'} className='generic_textarea' value={value} onChange={(e) => { setValue(e.target.value) }} />):
                        (<input type={type ? type : 'text'} className='generic_input' value={value} onChange={(e) => { setValue(e.target.value) }} />)
            }
        </div>
    );
}

export default InputBox