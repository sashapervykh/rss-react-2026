import { Component } from 'react';
import tmdbLogo from '../../../../public/tmdbLogo.svg';
import { TMBD_NOTICE } from '../../constants/tmdbNotice';

export class Footer extends Component {
  render() {
    return (
      <footer className="flex fixed left-0 bottom-0 bg-[#F5F5F0] w-[100vw] p-[2rem 0] min-h-[50px] gap-[1rem] justify-center">
        <div className="flex w-[170px] m-[auto_0]">
          <img src={tmdbLogo} alt="API Provider Logo" />
        </div>
        <p className="flex text-sky-800 m-[auto_0] h-fit">{TMBD_NOTICE}</p>
      </footer>
    );
  }
}
