import React, {DetailedHTMLProps} from "react";
import Button from "./Button";

export interface IlistItem extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string,
  phone: string,
  name: string,
  city: string,
  address: string,
  website: string,
  image: string,
  advertiser: string
}
const ListItem = (props: IlistItem) => {

  const {id, phone, name, city, address, website, image}: IlistItem = props

  return (
    <div className='flex my-5' id={id}>
      <div className='w-[33vw] h-[350px]'
           style={{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPositionX: '50%',
             backgroundPositionY: '50%', backgroundRepeat: 'no-repeat'}}>
      </div>
      <div className='w-full flex items-start flex-col pl-[2vw]'>
        <p className="text-[#333333] text-[1vw]">{city}</p>
        <h2 className='text-[3vw] text-[#333333] leading-[3vw] font-semibold mt-5 mb-2.5'>{name}</h2>
        <div className='flex items-start text-[#474846] text-[1.2vw] leading-[1.8]'>
          <img className='mr-2' src="https://yellowstone-opal.vercel.app/assets/pin.svg" alt="address"/>
          <div>
            <p className=''>{address}</p>
            <p className=''>{city}</p>
          </div>
        </div>
        <div className='flex items-start text-[#474846] text-[1.2vw] leading-[1.8]'>
          <img className='mr-2' src="https://yellowstone-opal.vercel.app/assets/phone.svg" alt="phone"/>
            <a href={'tel:' + phone}>{phone}</a>
        </div>
        <div className='flex items-center text-[#474846] text-[1.2vw] leading-[1.8]'>
          <img className='ml-1 mr-3' src="https://yellowstone-opal.vercel.app/assets/earth.svg" alt="website"/>
          <a href={website}>{website}</a>
        </div>
        <div className='mt-4'>
          <Button title='Read More' fill='solid'/>
        </div>
      </div>
    </div>
  );
};

export default ListItem;