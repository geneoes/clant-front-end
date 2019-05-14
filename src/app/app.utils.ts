import { Person } from './services/person.service';

export const isValidName = (value: string) => !!value.trim();

export const saveLastName = (value: string) => localStorage.setItem('LAST_NAME', value);

export const reverseName = (value: string) => value.split('').reverse().join('');

export const toMayus = (value: string) => value.toUpperCase();

export const formatName = (value: string) => value.toUpperCase();

export const formatPerson = (person: Person) => {
  return `${person.name} ${person.lastname}`;
};
