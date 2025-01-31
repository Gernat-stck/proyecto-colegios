// ResourcesComponent.tsx
import React, { useState } from "react";
import ResourceItem from "./ResourceItem";
import { Material } from "@/types/MaterialType.d";

const ResourcesComponent: React.FC = () => {
  const [materials] = useState<Material[]>([]);
  const [subject, setSubject] = useState<string>("all");
  console.log(subject);
  return (
    <>
      <div className="flex justify-between items-center mb-4 lg:mb-2">
        <span className="px-2 text-lg font-semibold">Material Reciente</span>
        <label className="text-sm">
          <span className="mr-2">Materia: </span>
          <select
            name="subject"
            id="subject"
            className="py-1 px-2"
            onChange={(e) => setSubject(e.target.value)}
          >
            {/*SubjectOptionsMock.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))*/}
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:grid-flow-row lg:[grid-auto-rows:48%] overflow-auto custom-h-index-material-grid custom-scroll px-4 lg:px-1">
        {materials.map((material) => (
          <ResourceItem key={material.id} material={material} />
        ))}
      </div>
    </>
  );
};

export default ResourcesComponent;
