export interface Material {
  id: number;
  title: string;
  type: string;
  imageUrl: string;
  link: string;
}

export interface ResourceItemProps {
  material: Material;
}
