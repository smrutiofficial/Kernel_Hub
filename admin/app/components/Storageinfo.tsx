/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Hardsisk from "@/app/image/harddisk.png";
import Image from 'next/image';

interface StorageInfoProps {
  name: string;
  available: number; 
  total: number;
}

const StorageInfo: React.FC<StorageInfoProps> = ({ name, available, total }) => {
  const usedPercentage = ((total - available) / total) * 100;

  return (
    <div className="mt-6 bg-gray-800 rounded-lg w-[80%]">
      <div className="flex items-center mb-4">
        <Image
          src={Hardsisk} 
          alt="Hard Drive Icon"
          width={200}
          height={200}
          className="w-8 h-8 mr-2 object-cover"
        />
        <span className="text-white font-medium">{name}</span>
      </div>
      <div className="bg-gray-600 h-3 rounded-sm">
        <div
          className="bg-[#AAFFA9] h-3 rounded-sm"
          style={{ width: `${usedPercentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>{available} GB Available</span>
        <span>{total} GB Total</span>
      </div>
    </div>
  );
};

export default StorageInfo;
