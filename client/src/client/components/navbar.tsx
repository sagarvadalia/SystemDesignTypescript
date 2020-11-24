import * as React from 'react';
import PersistentDrawerLeft from './appbar';


export interface IAppProps {
}

export default function Navbar(props: IAppProps) {
  return (
    <div>
      <PersistentDrawerLeft></PersistentDrawerLeft>
    </div>
  );
}
