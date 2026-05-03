import { Component } from 'react';
import tmdbLogo from '../../../../public/tmdbLogo.svg';
import { TMBD_NOTICE } from '../../constants/tmdbNotice';

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div style={{ width: '100px' }}>
          <img src={tmdbLogo} alt="API Provider Logo" />
        </div>
        <span>{TMBD_NOTICE}</span>
      </footer>
    );
  }
}
