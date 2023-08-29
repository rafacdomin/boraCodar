import { useRef } from "react";

const ProgressBar = ({ value = 0, onClick }) => {
  const buttonRef = useRef(null);

  const handleClick = (clickEvent) => {
    const { offsetLeft, clientWidth } = buttonRef.current;

    const newValue = ((clickEvent.screenX - offsetLeft) / clientWidth) * 100;

    onClick(newValue);
  }

  return (
    <button ref={buttonRef} onClick={(e) => handleClick(e)} className='bg-gray-500 w-full h-2 rounded-3xl'>
      <div className='relative bg-gray-300 h-2 rounded-3xl flex items-center' style={{ width: `${value}%` }}>
        <div className="h-4 w-4 absolute rounded-full bg-gray-300" style={{ insetInlineEnd: '-8px' }}></div>
      </div>
    </button>
  )
}

export default ProgressBar;