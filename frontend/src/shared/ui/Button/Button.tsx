import { Component, type MouseEventHandler } from 'react';

type ButtonProps = {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleClick?: MouseEventHandler<HTMLButtonElement>;
};

class Button extends Component<ButtonProps> {
  render() {
    const { text, handleClick, type = 'button' } = this.props;

    return (
      <button type={type} onClick={handleClick} className='p-[0.6rem] cursor-pointer bg-slate-100 rounded-xl border-sky-700 outline'>
        {text}
      </button>
    );
  }
}

export default Button;
