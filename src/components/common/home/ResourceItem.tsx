// ResourceItem.tsx
import { ResourceItemProps } from "@/types/MaterialType.d";
import React from "react";

const ResourceItem: React.FC<ResourceItemProps> = ({ material }) => {
  return (
    <article className="rounded-xl border border-gray-100 shadow relative aspect-square lg:aspect-auto">
      {/* <button className="p-0.5 bg-red-500 flex w-5 aspect-square absolute top-0 right-0 rounded-full translate-x-1/2 -translate-y-1/2 hover:bg-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-x m-auto"
        >
          <path d="M18 6L6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
      <button
        className="p-0.5 bg-amber-500 flex w-5 aspect-square absolute top-0 right-0 rounded-full -translate-x-2/3 -translate-y-1/2 hover:bg-amber-400"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f3f4f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-settings ml-px"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1-1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>
      */}
      <img
        className="w-full h-3/4 object-cover rounded-t-xl"
        src={material.imageUrl}
        alt={material.title}
        loading="lazy"
      />
      <div className="w-full h-1/4 text-sm text-slate-900 px-2 flex flex-col">
        <p className="ubuntu whitespace-nowrap overflow-hidden text-ellipsis">
          {material.title}{" "}
          <span className="font-semibold">[{material.type.toUpperCase()}]</span>
        </p>
        <button className="underline ml-auto mt-auto text-xs" type="button">
          <span>Ir al {material.type.toUpperCase()}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0f172a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-move-right inline ml-1"
          >
            <path d="M18 8L22 12L18 16"></path>
            <path d="M2 12H22"></path>
          </svg>
        </button>
      </div>
    </article>
  );
};

export default ResourceItem;
