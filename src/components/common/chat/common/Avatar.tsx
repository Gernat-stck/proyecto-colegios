// components/common/Avatar.tsx
import React from "react";

interface AvatarProps {
  name: string;
  src?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, src }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return src ? (
    <img src={src} alt={name} className="w-10 h-10 rounded-full object-cover" />
  ) : (
    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
      <span className="text-lg font-bold text-white">{initials}</span>
    </div>
  );
};

export default Avatar;
