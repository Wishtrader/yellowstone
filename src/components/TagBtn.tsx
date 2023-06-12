import {ReactElement} from "react";

type TagBtn = {
  filterName: string,
  icon: string,
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void
}
const TagBtn = (props: TagBtn): ReactElement => {
  const {filterName, icon, onClick} = props;

  return (
    <div className='flex items-center bg-[#f2f0e7] px-6 py-3 mr-2 rounded-full uppercase text-black/40 text-[0.9vw]'>
      {filterName}
      <img className='cursor-pointer ml-2.5' onClick={onClick} data-value={filterName} src={icon} alt='close'/>
    </div>
  );
};

export default TagBtn;