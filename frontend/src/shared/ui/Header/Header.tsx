import { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <header className="flex flex-row m-[0_auto_1rem_0] justify-start w-[100%]">
        <div className='font-["Bebas_Neue",_sans-serif] text-5xl text-blue-900'>
          KINOBASE
        </div>
      </header>
    );
  }
}
