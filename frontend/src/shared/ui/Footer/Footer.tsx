import { Component, type ReactNode } from 'react';
import tmdbLogo from '../../../../public/tmdbLogo.svg';
import { TMBD_NOTICE } from '../../constants/tmdbNotice';

interface Props {
  children: ReactNode;
}

export class Footer extends Component<Props, object> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <div style={{ width: '100px' }}>
          <img src={tmdbLogo} alt="API Provider Logo" />
        </div>
        <span>{TMBD_NOTICE}</span>
        {this.props.children}
      </footer>
    );
  }
}
