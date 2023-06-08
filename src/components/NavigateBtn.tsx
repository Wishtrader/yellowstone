import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import cn from "classnames";

export interface INavigateBtn extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode,
  page?: number,
  onClick?: () => void,
}

const buttonStyles = 'flex mx-4 min-w-[100px] p-2 items-center justify-center bg-gray-200 hover:bg-[#deb777]'
const NavigateBtn = ({...props}: INavigateBtn) => {
  const {children, onClick, page} = props

  return (
    <button className={cn(buttonStyles, {
      ['hidden']: page == 1,
    })} onClick={onClick}>
      {children}
    </button>
  );
};

export default NavigateBtn;