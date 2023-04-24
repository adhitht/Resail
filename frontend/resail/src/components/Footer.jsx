import React from "react";
import '../assets/css/components/Footer.css'


function Footer() {
    return (
    <div className='footer'>
        <div className='group_name'>
            <div className='group_name_header'>ReSail</div>
            <div className='group_name_text'>a product of </div>
            <div className='group_name_company'>Sellions Group</div>
            <div className='footer_address'>820, Ramanujan, New Hostels, IIT Hyderabad, Kandi</div>
        </div>
        <div className='footer_contactus'>
            <div className='footercontactus_text'>Let's be friends</div>
            <div className='contact_details_container'>
                <div className='contact_details'>
                    <div className='contact_details_name'>Jay Bhanushali</div>
                    <div className='contact_details_action'>+918714081616</div>
                </div>
                <div className='contact_details'>
                    <div className='contact_details_name'>Pranadipan Sahoo</div>
                    <div className='contact_details_action'>+918714081616</div>
                </div>
                <div className='contact_details'>
                    <div className='contact_details_name'>Rushikesh Dehenkar</div>
                    <div className='contact_details_action'>+918714081616</div>
                </div>

            </div>
        </div>
    </div>
    )

}

export default Footer