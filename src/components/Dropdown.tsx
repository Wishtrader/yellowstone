import {ReactElement, useState} from "react";
import {useFilters} from '../store'

export interface IDropdown{
  title: string,
  icon?: string,
  iconAlt?: string,
  listItems: string[]
}

const Dropdown = (props: IDropdown): ReactElement => {
  const {title, icon, iconAlt, listItems} = props
  const [isExpanded, setExpanded] = useState(false)
  const addFilters = useFilters((state: any) => state.addFilter);

  const filterHandle = (e: React.MouseEvent<HTMLLIElement>): void => {
    const target: HTMLElement = e.target as HTMLLIElement;
    addFilters(target.innerText.toLowerCase());
  }


  return (
    <nav className='flex relative border-[#dfdfdf] border-[1px] px-6 py-2 rounded-full cursor-pointer mr-6'
         onClick={() => {setExpanded(!isExpanded)}}>
      <p className='text-[1vw] text-black/40 uppercase pr-2.5'>{title}</p>
      <img src={icon} alt={iconAlt} />
      {isExpanded &&
        <ul className='flex-col absolute top-14 left-0 min-w-[140px] w-auto bg-white'>
          {listItems.map(item => {
            return (
              <li key={item} className='text-[1vw] text-black/40 uppercase block break py-1 hover:bg-[#f2f0e7] px-4'
                   onClick={(event: React.MouseEvent<HTMLLIElement>) => filterHandle(event)}
              >{item}</li>
            )
          })}
        </ul>
      }
    </nav>
  );
};

export default Dropdown;