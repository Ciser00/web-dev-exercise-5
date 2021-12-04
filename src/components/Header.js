import React from 'react';

function Header(){
  return (
    <header className="Header">
      <div className="Logo"> Exercise 5</div>
      <nav>
        <a href="/"> login </a>
        <a href="/create"> Create User </a>
        <a href="/user/id"> User Profile </a>
      </nav>
    </header>
);}

export default Header;
