
type Props =  {
    index: number,
    onClick(event: any): void;
    player?: string;
};

export default function Square({index, onClick, player}: Props) {
  const scale = player ? "scale-100" : "scale-0";
  const textColor = player === "X" ? "text-yellow-200" : "text-red-200";
  const hoverStyle = "transition duration-500 hover:scale-105 transform";


  return (
      <div 
        data-cell-index={index}
        className={`h-36 border-x-4 border-y-4  p-5 border-slate-200 font-display text-8xl text-center flex justify-center cursor-pointer ${hoverStyle}`}
        {...{ onClick }}>
        <span className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}>{player}</span>

      </div>
  )
}
