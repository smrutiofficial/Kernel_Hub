import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface RadialChartProps {
  value: number;
  percentageChange: number;
  period: string;
}

const Activeuser: React.FC<RadialChartProps> = ({
  value,
  period,
}) => {
  return (
    <div className="text-center text-white w-full p-2 flex flex-col items-center gap-2 justify-center rounded-md">
      <h3 className="text-md font-medium">Active User</h3>
      <p className="text-sm text-gray-400 -mt-2 mb-2">{period}</p>

      <div className="w-[45%] text-sm mb-2">
        <CircularProgressbar
          value={value}
          maxValue={250}
          text={ `${value} Visitors`  }
          styles={buildStyles({
            pathColor: "#AAFFA9",
            trailColor: "#2D2D2D",
            textColor: "#FFFFFF",
            textSize: "10px",
          })}
        />
      </div>
    </div>
  );
};

export default Activeuser;
