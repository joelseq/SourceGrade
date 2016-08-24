import React from 'react';
import Nav from 'Nav';

export default function Main({children}) {
  return (
    <div>
      <Nav/>
      {children}
    </div>
  );
}