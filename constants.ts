
import { RingColorConfig, BirdStatus, Sex } from './types.ts';

/**
 * CICLO OFICIAL DE CORES COM / FPO (Confederação Ornithologique Mondiale)
 * Nomenclatura 100% em Português conforme normas da Federação.
 */
export const FPO_RING_CYCLE: Omit<RingColorConfig, 'year'>[] = [
  { colorName: 'Verde', rgb: 'rgb(0, 153, 102)' },      // 2020, 2026...
  { colorName: 'Violeta', rgb: 'rgb(138, 43, 226)' },   // 2021, 2027...
  { colorName: 'Castanho', rgb: 'rgb(102, 51, 0)' },    // 2022, 2028...
  { colorName: 'Azul', rgb: 'rgb(0, 102, 204)' },       // 2023, 2029...
  { colorName: 'Vermelho', rgb: 'rgb(192, 0, 0)' },     // 2024, 2030...
  { colorName: 'Preto', rgb: 'rgb(24, 24, 27)', textColor: 'white' } // 2025, 2031...
];

export const getRingConfig = (year: number): RingColorConfig => {
  const baseYear = 2020;
  let index = (year - baseYear) % 6;
  if (index < 0) index = (index % 6) + 6;
  if (index === 6) index = 0;
  
  const config = FPO_RING_CYCLE[index];
  return {
    year,
    ...config
  };
};

export const STATUS_OPTIONS = Object.values(BirdStatus);
export const SEX_OPTIONS = Object.values(Sex);

export const TABLE_GROUPS = [
  { label: 'Identidade', color: 'bg-zinc-100' },
  { label: 'Biometria', color: 'bg-emerald-50' },
  { label: 'Genética', color: 'bg-indigo-50' },
  { label: 'Comercial', color: 'bg-zinc-900' }
];

export const TABLE_COLUMNS = [
  { id: 'numAnilha', label: 'Anilha FPO', group: 'Identidade' },
  { id: 'nome', label: 'Nome', group: 'Identidade' },
  { id: 'sexo', label: 'Sexo', group: 'Identidade' },
  { id: 'pesoAtual', label: 'Peso(g)', group: 'Biometria' },
  { id: 'taming', label: 'Maneio', group: 'Biometria' },
  { id: 'saude', label: 'Status Biológico', group: 'Biometria' },
  { id: 'mutacao', label: 'Fenótipo', group: 'Genética' },
  { id: 'portadorDe', label: 'Split Genético', group: 'Genética' },
  { id: 'idPai', label: 'Ancestral ♂', group: 'Genética' },
  { id: 'idMae', label: 'Ancestral ♀', group: 'Genética' },
  { id: 'estado', label: 'Estatuto', group: 'Comercial' },
  { id: 'valor', label: 'Avaliação (€)', group: 'Comercial' },
  { id: 'cliente', label: 'Detentor', group: 'Comercial' }
];