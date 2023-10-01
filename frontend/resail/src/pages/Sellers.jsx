import '../assets/css/components/Sellers.css'
import pic from "../img/img_cpmny.png"
import beta_logo from "../img/logo_beta.png"
import msg_vector from "../img/Vector.png"
import bell_icon from "../img/Notification-bell 1.png"
const Sellers=()=>{
    return(
        <>
       <nav>
        <div className='navbar_div'>
             <img src={beta_logo}/>
             <ul className='list_1'>
                <li>Dashboards</li>
                <li>Inbox</li>
                <li>Payments</li>
                </ul> 
                <div className='list_2'>
                      <img src={msg_vector}/>
                      <img src={bell_icon}/>
                </div>
                </div>
       </nav>
       <div className="main_div">
         <div className="main_div_1">
            <div className="inbox_div">
                 <div className='inbox'>
                  
                 </div>
            </div>
            <div className="welcome_div">
                   <p>Welcome , jaybhanushali</p>
                   <div className="nego_div">
                        Something AI Negotiations set up
                   </div>
                   <div className="impression_div">

                   </div>
            </div>
         </div>
         <div className='main_div_2'>
           <p>My Ads</p> 
           <div className='active_div'>
               <img className='prod_img' src={pic}/>
               <div className='para_active_div'>
               <p>Product Title</p>
               <p>fliauewluihfldhalwihafl</p>
               </div>
                <p className='price_tag'>800-1100</p>
                <div className='button_div'>
                <p>Item status : </p>
               
               <button className='sold_button'>Mark as sold</button>
                </div>
                </div>
           <div className='prod_flex'>
                 <div className='products_lisgts'/>
                 <div className='products_lisgts'/>
                 <div className='products_lisgts'/>
                 <div className='products_lisgts'/>
           </div>
         </div>        
       </div>
        </>
    )
}
export default Sellers