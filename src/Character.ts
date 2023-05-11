import Race, { Elf } from './Races';
import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import getRandomInt from './utils';
import Fighter from './Fighter';

export default class Character implements Fighter {
  private _race: Race;
  private _archetype: Archetype;
  private maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string) {   
    this._dexterity = getRandomInt(1, 10);
    this._race = new Elf(name, this._dexterity);
    this._archetype = new Mage(name);
    this.maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this.maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = { type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race() {
    return this._race;
  }

  get archetype() {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy() {
    return { ...this._energy };
  }

  receiveDamage(attackPoints: number): number {
    const demage = this._defense - attackPoints;
    this._defense -= demage;
    if (demage > 0) {
      return this.lifePoints - demage;
    }
    return this.lifePoints - 1;
    if (this.lifePoints <= 0) {
      this._lifePoints = -1;
      return -1;
    }
    return this.lifePoints;
  }

  levelUp(): void {
    this._energy.amount = 10;
    this._strength += getRandomInt(1, 10);
    this._dexterity += getRandomInt(1, 10);
    this._defense += getRandomInt(1, 10);
    this.maxLifePoints += getRandomInt(1, 10);
    
    if (this.maxLifePoints > this._race.maxLifePoints) {
      this.maxLifePoints = this._race.maxLifePoints;  
    }
    this._lifePoints = this.maxLifePoints;   
  }

  attack(enemy: Fighter): void {
    enemy.receiveDamage(this._strength);
  }
} 