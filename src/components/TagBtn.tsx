
type TagBtn = {
  tagName: string
  icon: string
}
const TagBtn = (props: TagBtn) => {

  const {tagName, icon} = props;

  const closeTag = (): void => {
    alert('close')
  }

  return (
    <div className='flex items-center bg-[#f2f0e7] px-6 py-3 rounded-full uppercase text-black/40 text-[0.9vw]'>
      {tagName}
      <img className='cursor-pointer ml-2.5' src={icon} alt='tag' onClick={closeTag} />
    </div>
  );
};

export default TagBtn;