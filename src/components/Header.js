import React from 'react';

function Header({logout, loggedIn}){
  return (
    <header className="Header">
      <div className="Logo"> Exercise 5</div>
      <nav>
        {!loggedIn && (
          <>
            <a href="/"> login </a>
            <a href="/create"> Create User </a>
          </>
        )}
        {loggedIn && (
          <>
            <a href="/user/id"> User Profile </a>
            <button onClick={() => logout()}> Log Out </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
