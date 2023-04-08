import React from 'react'

function Profile() {
  return (
    <>

      <div class="container">
        <div class="header">
          <i class="fa fa-bars"></i>
          <a href="https://myaccount.google.com/?utm_source=chrome-profile-chooser" target='_blank'> <i class="fa fa-cog"></i></a>
        </div>
        <div class="middle">
          <img src={sessionStorage.getItem("url")} alt="" class="user-pic" />
          <h4 class="name">{sessionStorage.getItem("email")}</h4>
          <h4 class="work">{sessionStorage.getItem("name")}</h4>
          <h4 class="social"><a href="https://mail.google.com/mail/u/0/#inbox" target='_blank' style={{ "textDecoration": "none", "color": "white" }}><i class="fa-solid fa-envelope fa-xl"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en" target='_blank' style={{ "textDecoration": "none", "color": "white" }}> <i class="fa-regular fa-newspaper fa-xl"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.youtube.com/" target='_blank' style={{ "textDecoration": "none", "color": "white" }}><i class="fa-brands fa-youtube fa-xl"></i></a></h4>
        </div>

      </div>
      <div className='ext_last'>
        <img src="gif2.gif" alt="" style={{ "width": "500px", "objectFit": "contain" }} />
      </div>
    </>
  )
}

export default Profile