import React from "react";
import "../assets/css/components/Footer.css";
import ContactLogo from "../img/Group.svg";
import Linked from "../img/Vectorlinkedin.svg";
import Phone from "../img/Vector.svg";

function Footer() {
  const d = new Date();
  const year = d.getFullYear();
  console.log(year)
  return (
    <div className="footerwrap">
      <div className="footer" >
        <div className="group_name">
          <div className="group_name_header">
            ReSa<span>i</span>l
          </div>
          <div className="group_name_text">a product of </div>
          <div className="group_name_company">Sellions Group</div>
          <div className="footer_address">
            820, Ramanujan, New Hostels,
            <div>IIT Hyderabad, Kandi</div>
          </div>
        </div>
        <div
          style={{ width: 0, height: "100%", border: "1px solid white" }}
        ></div>
        <div className="footer_contactus">
          <div className="footercontactus_text">
            Let's be
            <div className="footercontactus_text_text">friends ?</div>
          </div>

          <div className="contact_details_container">
            <div className="contact_details">
              <div className="contact_details_name">Jay Bhanushali </div>
              <div className="Contact_logo">
                <a
                  href="https://www.linkedin.com/in/jay-bhanushali-369a03228/"
                  className="linked"
                  target="_blank"
                >
                  {<img src={Linked} alt="Linked" className="linked" />}
                </a>
                <a
                  href="mailto:ms21btech11018@iith.ac.in"
                  className="gmail"
                  target="_blank"
                >
                  {<img src={ContactLogo} alt="Gmail" className="Gmail" />}
                </a>
                <a href="tel: +917892669254" className="phone" target="_blank">
                  {<img src={Phone} alt="Phone" className="Phone" />}
                </a>
              </div>
            </div>
            <div className="contact_details" id='contact'>
              <div className="contact_details_name">Pranadipan Sahoo</div>
              <div className="Contact_logo">
                <a
                  href="https://www.linkedin.com/in/pranadipan-sahoo-361946246/"
                  className="linked"
                  target="_blank"
                >
                  {<img src={Linked} alt="Linked" className="linked" />}
                </a>
                <a
                  href="mailto:ms21btech11021@iith.ac.in"
                  className="gmail"
                  target="_blank"
                >
                  {<img src={ContactLogo} alt="Gmail" className="Gmail" />}
                </a>
                <a href="tel: +918917602924" className="phone" target="_blank">
                  {<img src={Phone} alt="Phone" className="Phone" />}
                </a>
              </div>
            </div>
            <div className="contact_details">
              <div className="contact_details_name">Rushikesh Dehenkar</div>
              <div className="Contact_logo">
                <a
                  href="https://www.linkedin.com/in/rushikesh-dehankar-33a8a2226/"
                  className="linked"
                  target="_blank"
                >
                  {<img src={Linked} alt="Linked" className="linked" />}
                </a>
                <a
                  href="mailto:me21btech11044@iith.ac.in"
                  className="gmail"
                  target="_blank"
                >
                  {<img src={ContactLogo} alt="Gmail" className="Gmail" />}
                </a>
                <a href="tel: +919518321563" className="phone" target="_blank">
                  {<img src={Phone} alt="Phone" className="Phone" />}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyrightandweb">
        <p>Copyright© {year} Resail, All Rights Reserved.&nbsp;&nbsp;</p>
        <p style={{ color: '#fdd43e'}}> Website by <a href='mailto:adhith@duck.com' target="_blank">adhitht</a></p>
        </div>
    </div>
  );
}

export default Footer;