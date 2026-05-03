import { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <header className='flex flex-row m-[1rem_auto] justify-start w-[100%]'>
        <div className='font-["Bebas_Neue",_sans-serif] text-4xl text-blue-900'>KINOBASE</div>
      </header>
    );
  }
}
