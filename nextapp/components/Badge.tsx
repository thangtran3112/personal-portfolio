"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { FaStar } from "react-icons/fa6";

const Badge = ({
  containerStyles,
  icon,
  endCountNum,
  endCountText,
  badgeText,
  reviewCount,
}) => {
  return (
    <div className={`${containerStyles} badge`}>
      {icon && (
        <div className="text-3xl text-primary dark:text-black">{icon}</div>
      )}
      {endCountNum && (
        <div className="flex flex-col">
          <div className="flexCenter gap-x-2">
            <div className="bold-36 leading-none text-primary dark:text-black">
              <CountUp end={endCountNum} duration={5} delay={1} />
              {endCountText}
            </div>
            <div className="max-w-[77px] leading-none medium-15 dark:text-black">
              {badgeText}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Badge;

// 'use client'

// import CountUp from "react-countup"

// const Badge = ({ containerStyles, icon, endCountNum, endCountText, badgeText }) => {
//   return (
//     <div className={`${containerStyles} badge`}>
//       <div className="text-3xl text-primary">{icon}</div>
//       <div className="flexCenter gap-x-2">
//         <div className="bold-36 leading-none text-primary">
//           {endCountNum && <CountUp end={endCountNum} duration={4} delay={1} />}
//           {endCountText && {endCountText}}
//         </div>
//         <div className="max-w-[77px] leading-none medium-15 dark:text-black">{badgeText}</div>
//       </div>
//     </div>
//   )
// }

// export default Badge
