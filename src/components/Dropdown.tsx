import {ReactElement, useState} from "react";
import Dlink from "./Dlink.tsx";

export interface IDropdown {
  title: string,
  icon?: string,
  iconAlt?: string,
  listItems: string[],
}

const Dropdown = (props: IDropdown): ReactElement => {

  const [isExpanded, setExpanded] = useState(false)

  const {title, icon, iconAlt, listItems} = props

  return (
    <div className='flex relative border-[#dfdfdf] border-[1px] px-6 py-2 rounded-full cursor-pointer mr-6'
         onClick={() => {setExpanded(!isExpanded)}}>
      <p className='text-[1vw] text-black/40 uppercase pr-2.5'>{title}</p>
      <img src={icon} alt={iconAlt} />
      {isExpanded &&
        <div className='flex-col absolute top-14 left-0 min-w-[140px] w-auto bg-white'>
          {listItems.map(e => {
            return (
              <Dlink key={e} name={e} url={e} />
            )
          })}
        </div>
      }
    </div>
  );
};

export default Dropdown;