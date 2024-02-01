export interface IKnight
  extends KnightId,
    IKnightIdentity,
    Weapons,
    Attributes {}

interface KnightId {
  _id?: string;
}

interface IKnightIdentity {
  name: string;
  nickname: string;
  birthday: string; //YYYY-MM-DD
}

interface Weapons {
  weapons: Weapon[];
}

interface Attributes {
  attributes: AttributesTree;
  keyAttribute: KeyAttribute;
}

export interface Weapon extends GeneratedId {
  name: string;
  mod: number;
  attr: string;
  equipped: boolean;
}

interface GeneratedId {
  id?: number;
}

export interface AttributesTree {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface IKnightStats extends KnightId {
  name: string;
  age: number;
  weapons_quantity: number;
  keyAttribute: KeyAttribute;
  attack: number;
  exp: number;
}

type KeyAttribute = keyof AttributesTree;
