import React from "react";
import "../assets/css/components/Footer.css";
import ContactLogo from "../img/Group.svg";
import Linked from "../img/Vectorlinkedin.svg";
import Phone from "../img/Vector.svg";

function Footer() {
  return (
    <div className="footer">
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
                href="mailto: Sarthaksaw111@gmail.com?subject=Hello"
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
          <div className="contact_details">
            <div className="contact_details_name">Pranadipan Sahoo</div>
            <div className="Contact_logo">
              <a
                href="https://www.linkedin.com/in/jay-bhanushali-369a03228/"
                className="linked"
                target="_blank"
              >
                {<img src={Linked} alt="Linked" className="linked" />}
              </a>
              <a
                href="mailto: Sarthaksaw111@gmail.com?subject=Hello"
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
          <div className="contact_details">
            <div className="contact_details_name">Rushikesh Dehenkar</div>
            <div className="Contact_logo">
              <a
                href="https://www.linkedin.com/in/jay-bhanushali-369a03228/"
                className="linked"
                target="_blank"
              >
                {<img src={Linked} alt="Linked" className="linked" />}
              </a>
              <a
                href="mailto: Sarthaksaw111@gmail.com?subject=Hello"
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
        </div>
      </div>
    </div>
  );
}

export default Footer;