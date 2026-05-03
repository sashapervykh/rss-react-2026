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
      <button type={type} onClick={handleClick} className='p-[0.6rem] text-sky-800 cursor-pointer bg-slate-100 rounded-xl border-sky-950 border-1 w-fit m-[auto]'>
        {text}
      </button>
    );
  }
}

export default Button;
