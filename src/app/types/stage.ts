export interface Stage {
  name: string;
  image: string;
  type: string;
  _id?: string;
  roster?: number;
  styles?: StageStyles;
}

export interface StageStyles {
  'background-image': string;
}
