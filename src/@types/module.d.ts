import {Cargo, Routes, Sexo} from '../constants/Enum';

declare global {
  namespace Modules {
    export {Routes, Cargo, Sexo};
  }
}
