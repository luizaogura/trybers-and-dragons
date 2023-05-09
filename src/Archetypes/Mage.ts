import Archetype from './Archetype';
import { EnergyType } from '../Energy';

export default class Mage extends Archetype {
  private _energyType: EnergyType = 'mana';
  static _createdArchetypeInstances = 0;

  constructor(name: string) {
    super(name);
    Mage._createdArchetypeInstances += 1;
  }

  static createdArchetypeInstances() {
    return this._createdArchetypeInstances;
  }

  get energyType(): EnergyType {
    return this._energyType;
  }
}