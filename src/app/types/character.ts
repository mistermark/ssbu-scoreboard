export interface Character {
  name: string;
  image: string;
  _id?: string;
  styles?: CharacterStyles;
  roster?: number;
}

export interface CharacterStyles {
  'background-image': string;
}
