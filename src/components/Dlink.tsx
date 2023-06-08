import {DetailedHTMLProps, LinkHTMLAttributes, ReactElement} from 'react';
import {nanoid} from "nanoid";

export interface IDlink extends DetailedHTMLProps<LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement> {
  id: string,
  name: string,
  url: string
}
const Dlink = (props): ReactElement => {

  const {name, url} = props

  return (
      <a className='text-[1vw] text-black/40 uppercase block break py-1 hover:bg-[#f2f0e7] px-4' id={nanoid()} href={url}>{name}</a>
  );
};

export default Dlink;