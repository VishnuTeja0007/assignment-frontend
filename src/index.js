let clients = [];
let isShortlistClicked

// API URL configuration
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5001' 
  : 'https://assingment-backend-production-ae64.up.railway.app/'; // Replace with your actual deployed backend URL

document.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_URL}/listings`)
    .then((response) => response.json())
    .then((data) => {
      clients = data;
      isShortlistClicked=false;
      renderListings(clients);
      bindShortlistNav();
      bindShortlistButtons();
    });
});
function bindShortlistButtons(){
   const shortlistBtns = document.getElementsByClassName('shortlist-btn');
  Array.from(shortlistBtns).forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute('data-id');
      setShortlist(id);
    });
  });
}
function setShortlist(id){
  shortlistedFill=`<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1.92436e-07 20.3438C-9.11286e-05 20.4577 0.0323215 20.5697 0.0940478 20.6688C0.155774 20.7678 0.244686 20.8505 0.352032 20.9086C0.459377 20.9668 0.581456 20.9984 0.706251 21.0004C0.831046 21.0024 0.954255 20.9746 1.06375 20.9199L8.625 17.1531L16.1863 20.9199C16.2957 20.9746 16.419 21.0024 16.5437 21.0004C16.6685 20.9984 16.7906 20.9668 16.898 20.9086C17.0053 20.8505 17.0942 20.7678 17.156 20.6688C17.2177 20.5697 17.2501 20.4577 17.25 20.3438V2.625C17.25 1.92881 16.9471 1.26113 16.4079 0.768845C15.8688 0.276562 15.1375 0 14.375 0L2.875 0C2.1125 0 1.38124 0.276562 0.842068 0.768845C0.302901 1.26113 1.92436e-07 1.92881 1.92436e-07 2.625V20.3438ZM8.625 5.78813C10.6188 3.91781 15.6026 7.1925 8.625 11.4017C1.64738 7.1925 6.63119 3.91913 8.625 5.79075V5.78813Z" fill="#8D4337"/>
                 </svg>                 <p>Shortlist</p>`
    shortlistedLine=`<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 5.78817C13.4938 3.91786 18.4776 7.19255 11.5 11.4017C4.52237 7.19255 9.50618 3.91917 11.5 5.7908V5.78817Z" fill="#8D4337"/>
<path d="M2.875 2.625C2.875 1.92881 3.1779 1.26113 3.71707 0.768845C4.25623 0.276562 4.9875 0 5.75 0L17.25 0C18.0125 0 18.7438 0.276562 19.2829 0.768845C19.8221 1.26113 20.125 1.92881 20.125 2.625V20.3438C20.1249 20.4625 20.0896 20.5789 20.0228 20.6807C19.9559 20.7826 19.8601 20.8659 19.7455 20.922C19.6309 20.978 19.5018 21.0046 19.3719 20.9989C19.242 20.9932 19.1163 20.9555 19.0081 20.8898L11.5 17.1951L3.99194 20.8898C3.8837 20.9555 3.75796 20.9932 3.62809 20.9989C3.49823 21.0046 3.36912 20.978 3.2545 20.922C3.13988 20.8659 3.04406 20.7826 2.97723 20.6807C2.9104 20.5789 2.87507 20.4625 2.875 20.3438V2.625ZM5.75 1.3125C5.36875 1.3125 5.00312 1.45078 4.73353 1.69692C4.46395 1.94306 4.3125 2.2769 4.3125 2.625V19.1179L11.1018 15.8602C11.2198 15.7886 11.3583 15.7503 11.5 15.7503C11.6417 15.7503 11.7802 15.7886 11.8982 15.8602L18.6875 19.1179V2.625C18.6875 2.2769 18.536 1.94306 18.2665 1.69692C17.9969 1.45078 17.6312 1.3125 17.25 1.3125H5.75Z" fill="#8D4337"/>
</svg>
<p>Shortlist</p>`
   clients.forEach((client)=>{
      if(client.id==id){
        client.isShortlisted = !client.isShortlisted;
        trg=document.getElementById( `id-${id}`)
        trg.innerHTML=''
        client.isShortlisted?trg.innerHTML=shortlistedFill : trg.innerHTML=shortlistedLine 
        console.log(client.title,client.isShortlisted)
      }
    })
    renderListings(clients);
 
}
    
function bindShortlistNav(){
  
  const shortlistNav=document.getElementById('shortlist-btn-nav')
  shortlistNav.addEventListener('click',()=>{
    
    console.log(isShortlistClicked)
    showShortListedItems();
  })
}
function showShortListedItems(){
  shortListedClients=[];
    const shortlistNav=document.getElementById('shortlist-btn-nav')
  
 
    clients.forEach(client=>{
      if (client.isShortlisted){
        shortListedClients.push(client)
      }
    })
    const section=document.getElementById("main")
    section.innerHTML=''
     isShortlistClicked=!isShortlistClicked  
    if(isShortlistClicked){
      if(shortListedClients.length === 0){
        section.innerHTML = '<p style="text-align:center; margin-top: 20px;">please add clients to the shortlist to show</p>';
      } else {
        renderListings(shortListedClients)  
      }
    }
    else{
    renderListings(clients)
    bindShortlistButtons()
  }
    
    console.log(shortListedClients)
}
function render_stars(rating){
    let starSvg = ""
    let totalStars = 5;
    
    for(let i = 1; i <= totalStars; i++) {
        
        if (rating >= i) {
            starSvg+= `<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12_505)">
<path d="M3.612 14.4778C3.226 14.6634 2.788 14.3381 2.866 13.9228L3.696 9.48842L0.172996 6.34217C-0.156004 6.04779 0.0149962 5.50967 0.455996 5.45154L5.354 4.79904L7.538 0.74248C7.735 0.376855 8.268 0.376855 8.465 0.74248L10.649 4.79904L15.547 5.45154C15.988 5.50967 16.159 6.04779 15.829 6.34217L12.307 9.48842L13.137 13.9228C13.215 14.3381 12.777 14.6634 12.391 14.4778L8 12.3628L3.612 14.4778Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_12_505">
<rect width="16" height="15" fill="white"/>
</clipPath>
</defs>
</svg>`
        } else if (rating >= i - 0.5) {
            starSvg+=`<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" >
<path d="M5.35301 4.619L7.53701 0.292C7.57896 0.204954 7.6445 0.131433 7.72618 0.0798096C7.80785 0.0281859 7.90239 0.000533281 7.99901 0C8.18201 0 8.36501 0.097 8.46401 0.292L10.648 4.619L15.546 5.315C15.6681 5.33419 15.7798 5.39491 15.8624 5.48691C15.9449 5.57891 15.9931 5.69655 15.999 5.82C16.006 5.90219 15.9943 5.98489 15.9649 6.06194C15.9355 6.13899 15.889 6.2084 15.829 6.265L12.306 9.621L13.136 14.351C13.214 14.794 12.776 15.141 12.39 14.943L7.99901 12.687L3.61001 14.943C3.5641 14.9668 3.51489 14.9837 3.46401 14.993C3.12201 15.053 2.79601 14.739 2.86401 14.351L3.69401 9.621L0.172011 6.265C0.117257 6.2132 0.0737344 6.15069 0.0441462 6.08137C0.014558 6.01204 -0.000464597 5.93737 1.0947e-05 5.862C6.29599e-05 5.75544 0.0294723 5.65095 0.085011 5.56C0.12441 5.49407 0.17811 5.43783 0.242149 5.39542C0.306188 5.35302 0.378931 5.32553 0.455011 5.315L5.35301 4.619ZM7.99901 11.527C8.07973 11.5267 8.15933 11.5459 8.23101 11.583L11.917 13.477L11.223 9.52C11.2066 9.429 11.2128 9.33536 11.2411 9.24731C11.2693 9.15926 11.3187 9.07949 11.385 9.015L14.292 6.245L10.24 5.669C10.1561 5.65633 10.0765 5.62351 10.0081 5.57335C9.93963 5.52319 9.88437 5.45719 9.84701 5.381L8.00001 1.723L7.99901 1.726V11.526V11.527Z" fill="black"/>
</svg>
`
        } else {
          starSvg+=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_7_235)">
<path d="M2.866 14.8499C2.788 15.2939 3.226 15.6409 3.612 15.4429L8.002 13.1869L12.391 15.4429C12.777 15.6409 13.215 15.2939 13.137 14.8509L12.307 10.1209L15.829 6.76492C16.159 6.45092 15.989 5.87692 15.547 5.81492L10.649 5.11892L8.465 0.791923C8.42339 0.704212 8.35775 0.630106 8.27571 0.578215C8.19366 0.526325 8.09857 0.498779 8.0015 0.498779C7.90442 0.498779 7.80933 0.526325 7.72729 0.578215C7.64524 0.630106 7.5796 0.704212 7.538 0.791923L5.354 5.11992L0.455996 5.81592C0.0149962 5.87792 -0.156004 6.45192 0.172996 6.76592L3.696 10.1219L2.866 14.8519V14.8499ZM7.771 12.0829L4.085 13.9769L4.779 10.0199C4.79525 9.92884 4.78889 9.83515 4.76047 9.7471C4.73205 9.65904 4.68244 9.57932 4.616 9.51492L1.71 6.74492L5.762 6.16892C5.8459 6.15625 5.92548 6.12343 5.99393 6.07327C6.06237 6.02312 6.11764 5.95711 6.155 5.88092L8 2.22292L9.847 5.88092C9.88435 5.95711 9.93962 6.02312 10.0081 6.07327C10.0765 6.12343 10.1561 6.15625 10.24 6.16892L14.292 6.74392L11.386 9.51392C11.3194 9.57842 11.2697 9.65831 11.2413 9.74655C11.2128 9.8348 11.2066 9.92868 11.223 10.0199L11.917 13.9769L8.231 12.0829C8.15972 12.0462 8.08069 12.027 8.0005 12.027C7.9203 12.027 7.84227 12.0462 7.771 12.0829Z" fill="black"/>
</g>
<defs>
<clipPath id="clip0_7_235">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`
        }

    }
    return starSvg
  }

  function renderListings(clients) {
    const section = document.getElementById("main");

    clients.forEach(client => {
        const card = document.createElement("div");
        card.className = "cards";

        const info = document.createElement("div");
        info.className = "info";

        // Title
        const title = document.createElement("h3");
        title.textContent = client.title;

        // Stars
        const starsDiv = document.createElement("div");
        starsDiv.className = "starsRating";
        starsDiv.innerHTML=(render_stars(client.rating));

        // Description
        const descDiv = document.createElement("div");
        descDiv.className = "description";
        const desc = document.createElement("p");
        desc.textContent = client.description;
        descDiv.appendChild(desc);

        // Experience Section
        const expDiv = document.createElement("div");
        expDiv.className = "experience";

        const projects = document.createElement("div");
        projects.innerHTML = `<h1>${client.projects}</h1><p>projects</p>`;

        const years = document.createElement("div");
        years.innerHTML = `<h1>${client.experience}</h1><p>years</p>`;

        const price = document.createElement("div");
        price.innerHTML = `<h1>${client.price}</h1><p>price</p>`;

        expDiv.append(projects, years, price);

        // Contact Info
        const contact = document.createElement("div");
        contact.className = "contact";
        contact.innerHTML = `<h3>${client.contact1}</h3><h3>${client.contact2}</h3>`;

        // Append all parts to info
        info.append(title, starsDiv, descDiv, expDiv, contact);

        // Action Buttons (if any)
        const sidebar = document.createElement("div");
        sidebar.className = "sidebar";
        // sidebar.innerHTML = "..."; // Add buttons here if needed
        const icongroup1=document.createElement("div")
        icongroup1.className='icon-group'
        icongroup1.innerHTML=`<svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.75 10.9999C5.75 10.8176 5.82573 10.6427 5.96052 10.5138C6.09531 10.3848 6.27813 10.3124 6.46875 10.3124H14.7962L11.7099 7.36164C11.5749 7.23255 11.4991 7.05746 11.4991 6.87489C11.4991 6.69233 11.5749 6.51724 11.7099 6.38814C11.8448 6.25905 12.0279 6.18652 12.2188 6.18652C12.4096 6.18652 12.5927 6.25905 12.7276 6.38814L17.0401 10.5131C17.1071 10.577 17.1602 10.6529 17.1964 10.7364C17.2326 10.8199 17.2513 10.9095 17.2513 10.9999C17.2513 11.0903 17.2326 11.1799 17.1964 11.2634C17.1602 11.3469 17.1071 11.4228 17.0401 11.4866L12.7276 15.6116C12.5927 15.7407 12.4096 15.8133 12.2188 15.8133C12.0279 15.8133 11.8448 15.7407 11.7099 15.6116C11.5749 15.4825 11.4991 15.3075 11.4991 15.1249C11.4991 14.9423 11.5749 14.7672 11.7099 14.6381L14.7962 11.6874H6.46875C6.27813 11.6874 6.09531 11.615 5.96052 11.486C5.82573 11.3571 5.75 11.1822 5.75 10.9999Z" fill="#8D4337"/>
</svg>
                <p>Details</p>`
        const icongroup2=document.createElement("div")
        icongroup2.className='icon-group'
        icongroup2.innerHTML=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_12_497)">
<path d="M16.6988 14.0475C18.825 12.15 20 10 20 10C20 10 16.25 3.125 10 3.125C8.7995 3.12913 7.61258 3.37928 6.51251 3.86L7.47501 4.82375C8.28431 4.52894 9.1387 4.3771 10 4.375C12.65 4.375 14.8488 5.835 16.46 7.44625C17.2355 8.22586 17.9306 9.08141 18.535 10C18.4625 10.1087 18.3825 10.2288 18.2913 10.36C17.8725 10.96 17.2538 11.76 16.46 12.5538C16.2538 12.76 16.0388 12.9637 15.8138 13.1613L16.6988 14.0475Z" fill="#8D4337"/>
<path d="M14.1212 11.47C14.4002 10.6898 14.4518 9.84639 14.2702 9.03798C14.0886 8.22957 13.6811 7.48936 13.0952 6.90348C12.5093 6.3176 11.7691 5.91013 10.9607 5.72849C10.1523 5.54685 9.30893 5.59851 8.52874 5.87745L9.55749 6.9062C10.0379 6.83745 10.5277 6.88151 10.9881 7.03491C11.4485 7.18831 11.8668 7.44682 12.21 7.78997C12.5531 8.13312 12.8116 8.55147 12.965 9.01187C13.1184 9.47227 13.1625 9.96207 13.0937 10.4425L14.1212 11.47ZM10.4425 13.0937L11.47 14.1212C10.6898 14.4001 9.84642 14.4518 9.03801 14.2702C8.2296 14.0885 7.48939 13.6811 6.90351 13.0952C6.31763 12.5093 5.91016 11.7691 5.72852 10.9607C5.54688 10.1523 5.59854 9.3089 5.87749 8.5287L6.90624 9.55745C6.83748 10.0378 6.88154 10.5276 7.03494 10.988C7.18834 11.4484 7.44685 11.8668 7.79 12.2099C8.13315 12.5531 8.5515 12.8116 9.0119 12.965C9.4723 13.1184 9.9621 13.1625 10.4425 13.0937Z" fill="#8D4337"/>
<path d="M4.1875 6.83762C3.9625 7.03762 3.74625 7.24012 3.54 7.44637C2.76456 8.22598 2.0694 9.08153 1.465 10.0001L1.70875 10.3601C2.1275 10.9601 2.74625 11.7601 3.54 12.5539C5.15125 14.1651 7.35125 15.6251 10 15.6251C10.895 15.6251 11.7375 15.4589 12.525 15.1751L13.4875 16.1401C12.3874 16.6208 11.2005 16.8709 10 16.8751C3.75 16.8751 0 10.0001 0 10.0001C0 10.0001 1.17375 7.84887 3.30125 5.95262L4.18625 6.83887L4.1875 6.83762ZM17.0575 17.9426L2.0575 2.94262L2.9425 2.05762L17.9425 17.0576L17.0575 17.9426Z" fill="#8D4337"/>
</g>
<defs>
<clipPath id="clip0_12_497">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

                
                <p>Hide</p>`;
//         
// `
        const icongroup3=document.createElement("div")
icongroup3.className='icon-group shortlist-btn' 
icongroup3.setAttribute('data-tooltip',"Click to add to shortlist")
icongroup3.id=`id-${client.id}`
icongroup3.setAttribute('data-id',client.id)

// Update the inner HTML based on the shortlisted state
if (client.isShortlisted) {
    icongroup3.innerHTML = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.92436e-07 20.3438C-9.11286e-05 20.4577 0.0323215 20.5697 0.0940478 20.6688C0.155774 20.7678 0.244686 20.8505 0.352032 20.9086C0.459377 20.9668 0.581456 20.9984 0.706251 21.0004C0.831046 21.0024 0.954255 20.9746 1.06375 20.9199L8.625 17.1531L16.1863 20.9199C16.2957 20.9746 16.419 21.0024 16.5437 21.0004C16.6685 20.9984 16.7906 20.9668 16.898 20.9086C17.0053 20.8505 17.0942 20.7678 17.156 20.6688C17.2177 20.5697 17.2501 20.4577 17.25 20.3438V2.625C17.25 1.92881 16.9471 1.26113 16.4079 0.768845C15.8688 0.276562 15.1375 0 14.375 0L2.875 0C2.1125 0 1.38124 0.276562 0.842068 0.768845C0.302901 1.26113 1.92436e-07 1.92881 1.92436e-07 2.625V20.3438ZM8.625 5.78813C10.6188 3.91781 15.6026 7.1925 8.625 11.4017C1.64738 7.1925 6.63119 3.91913 8.625 5.79075V5.78813Z" fill="#8D4337"/>
                </svg>
                <p>Shortlist</p>`;
} else {
    icongroup3.innerHTML = `<svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 5.78817C13.4938 3.91786 18.4776 7.19255 11.5 11.4017C4.52237 7.19255 9.50618 3.91917 11.5 5.7908V5.78817Z" fill="#8D4337"/>
<path d="M2.875 2.625C2.875 1.92881 3.1779 1.26113 3.71707 0.768845C4.25623 0.276562 4.9875 0 5.75 0L17.25 0C18.0125 0 18.7438 0.276562 19.2829 0.768845C19.8221 1.26113 20.125 1.92881 20.125 2.625V20.3438C20.1249 20.4625 20.0896 20.5789 20.0228 20.6807C19.9559 20.7826 19.8601 20.8659 19.7455 20.922C19.6309 20.978 19.5018 21.0046 19.3719 20.9989C19.242 20.9932 19.1163 20.9555 19.0081 20.8898L11.5 17.1951L3.99194 20.8898C3.8837 20.9555 3.75796 20.9932 3.62809 20.9989C3.49823 21.0046 3.36912 20.978 3.2545 20.922C3.13988 20.8659 3.04406 20.7826 2.97723 20.6807C2.9104 20.5789 2.87507 20.4625 2.875 20.3438V2.625ZM5.75 1.3125C5.36875 1.3125 5.00312 1.45078 4.73353 1.69692C4.46395 1.94306 4.3125 2.2769 4.3125 2.625V19.1179L11.1018 15.8602C11.2198 15.7886 11.3583 15.7503 11.5 15.7503C11.6417 15.7503 11.7802 15.7886 11.8982 15.8602L18.6875 19.1179V2.625C18.6875 2.2769 18.536 1.94306 18.2665 1.69692C17.9969 1.45078 17.6312 1.3125 17.25 1.3125H5.75Z" fill="#8D4337"/>
</svg>
<p>Shortlist</p>`;
} 
        const icongroup4 =document.createElement("div")
        icongroup4.className='icon-group'
        icongroup4.innerHTML=`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_12_371)">
                    <path d="M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z" fill="#8D4337"/>
                    <path d="M7.00201 11C7.00201 10.8687 7.02788 10.7386 7.07813 10.6173C7.12839 10.496 7.20205 10.3857 7.29491 10.2929C7.38777 10.2 7.49801 10.1264 7.61933 10.0761C7.74066 10.0259 7.87069 10 8.00201 10C8.13334 10 8.26337 10.0259 8.3847 10.0761C8.50602 10.1264 8.61626 10.2 8.70912 10.2929C8.80198 10.3857 8.87564 10.496 8.92589 10.6173C8.97615 10.7386 9.00201 10.8687 9.00201 11C9.00201 11.2652 8.89666 11.5196 8.70912 11.7071C8.52158 11.8946 8.26723 12 8.00201 12C7.7368 12 7.48244 11.8946 7.29491 11.7071C7.10737 11.5196 7.00201 11.2652 7.00201 11ZM7.10001 4.995C7.0867 4.86884 7.10005 4.74129 7.13921 4.62062C7.17838 4.49996 7.24247 4.38888 7.32733 4.29458C7.4122 4.20029 7.51594 4.12489 7.63183 4.07328C7.74771 4.02167 7.87315 3.995 8.00001 3.995C8.12687 3.995 8.25232 4.02167 8.3682 4.07328C8.48409 4.12489 8.58783 4.20029 8.6727 4.29458C8.75756 4.38888 8.82165 4.49996 8.86081 4.62062C8.89998 4.74129 8.91333 4.86884 8.90001 4.995L8.55001 8.502C8.53825 8.63977 8.47522 8.76811 8.37337 8.86163C8.27152 8.95515 8.13829 9.00705 8.00001 9.00705C7.86174 9.00705 7.7285 8.95515 7.62666 8.86163C7.52481 8.76811 7.46177 8.63977 7.45001 8.502L7.10001 4.995Z" fill="#8D4337"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_12_371">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>

                <p>Report</p>`
        // Final card append
        sidebar.append(icongroup1,icongroup2,icongroup3,icongroup4)
        card.append(info, sidebar);
        section.appendChild(card);
    });
}


    