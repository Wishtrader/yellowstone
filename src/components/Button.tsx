import cn from "classnames";
import {ReactElement} from "react";

export interface IButton{
  title: string,
  icon?: string,
  fill: 'solid' | 'outline' | 'ghost',
  onClick?: () => void
}

const buttonStyles = 'flex justify-center items-center text-[1vw] px-8 py-2 rounded-full uppercase hover:bg-[#f2f0e7]';
const Button = ({title, icon, fill}: IButton): ReactElement => {

  return (
    <button className={cn(buttonStyles, {
      ['bg-[#deb777]']: fill == 'solid',
      ['bg-none border-[#dfdfdf] border-[1px]']: fill == 'outline',
      ['bg-none text-[#474846]/50']: fill == 'ghost',
    })}>
      <img className={cn('mr-[0.5vw]', {['hidden']: icon == undefined})} src={icon} alt={title}/>
      {title}
    </button>
  );
};

export default Button;