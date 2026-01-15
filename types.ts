
export enum UserRole {
  Admin = 'ADMIN_MASTER',
  User = 'STANDARD_OPERATOR'
}

export enum LicenseType {
  Trial = '30_DAYS',
  NinetyDays = '90_DAYS',
  HalfYear = '180_DAYS',
  Yearly = '1_YEAR',
  Lifetime = 'LIFETIME'
}

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  customerName?: string; // Novo Campo
  role: UserRole;
  licenseType: LicenseType;
  createdAt: string;
  expiresAt: string | null;
  isActive: boolean;
  machineId?: string;
}

export interface RingColorConfig {
  year: number;
  colorName: string;
  rgb: string;
  textColor?: string;
}

export enum BirdStatus {
  Plantel = 'Plantel',
  Venda = 'Venda',
  Duvida = 'Dúvida',
  Fugiu = 'Fugiu',
  Morreu = 'Morreu',
  Nulo = 'Nulo'
}

export enum Sex {
  Macho = 'Macho',
  Femea = 'Fêmea',
  Desconhecido = 'Desconhecido'
}

export enum TamingStatus {
  Arisco = 'Arisco',
  SemiManso = 'Semi-Manso',
  Manso = 'Manso (Criado à mão)',
  Treinado = 'Treinado/Exposição'
}

export enum HabitatType {
  Viveiro = 'Viveiro (Colónia)',
  Gaiola = 'Gaiola Individual'
}

export interface Habitat {
  id: string;
  codigo: string;
  nome: string;
  tipo: HabitatType;
  nestCount: number;
  description: string;
}

export type FoodType = 
  | 'Sementes para Caturra' 
  | 'Papa Amarela / Nutrição' 
  | 'Extrusado' 
  | 'Vitaminas' 
  | 'Bloco de Cálcio / Osso Choco'
  | 'Medicamentos & Suplementos'
  | 'Anilhas Oficiais (FPO/Clubes)'
  | 'Higiene & Desinfecção'
  | 'Bebedouros & Comedouros'
  | 'Créditos de Sexagem (Laboratório)'
  | 'Veterinário (Consulta / Exames)'
  | 'Construção (Redes / Ferros / Estrutura)'
  | 'Consumíveis (Líquidos / Limpeza / Desinfecção)'
  | 'Utensílios (Vassouras / Pás / Espátulas)'
  | 'Artigo Personalizado (Manual)';

export interface FoodPurchase {
  id: string;
  data: string;
  dataRegisto: string;
  numFatura: string;
  tipo: FoodType;
  tipoManual?: string;
  unidade: string;
  local: string;
  precoUnitario: number; 
  quantidade: number;
  precoFinal: number;
  obs: string;
  anilhasCompradas?: string[];
  lote: string;
}

export interface BirdRecord {
  id: string;
  plantelVenda: 'Plantel' | 'Venda';
  origem: 'Própria' | 'Compra' | 'Doação';
  fornecedor: string;
  tipoHabitat: HabitatType;
  idHabitat: string; 
  ninho: string; 
  localizacao: string;
  numAnilha: string;
  corAnilha: string;
  nome: string;
  anoNasc: number;
  sequencialTemporada: string; 
  temporada: string;
  dataRegisto: string;
  dataCompra: string;
  valorCompra: string;
  nascimentoOvo: string;
  nascimentoCria: string;
  sexo: Sex;
  numExame: string;
  lab: string;
  mutacao: string;
  portadorDe: string; 
  estirpe: string;
  face: string;
  corpo: string;
  rabo: string;
  penas: string;
  crista: string;
  idPai: string;
  mutacaoPai: string;
  idMae: string;
  mutacaoMae: string;
  estado: BirdStatus;
  dataVenda: string;
  dataMorte: string;
  valor: string;
  cliente: string;
  freguesia: string;
  tipoCliente: string;
  obs: string;
  comportamentos: string;
  foto: string | null;
  docSexagem: string | null;
  saude: string;
  pesoAtual: string;
  pesoDesmame: string;
  taming: TamingStatus;
  ultimaDesparasitacao: string;
  ultimaVacinacao: string;
  premios: string;
  pontuacaoConcurso: string;
  juiz: string;
  dataUltimoConcurso: string;
  consanguinidade: number;
  laudoTecnicoIA?: string;
}

export interface EggRecord {
  id: string;
  dataPostura: string;
  dataRegisto: string;
  ninho: string;
  tipoHabitat: HabitatType;
  idHabitat: string;
  idAnilhaPai: string;
  idAnilhaMae: string;
  ama: string;
  pesoOvo: string;
  estado: 'Em Choco' | 'Galo' | 'Claro' | 'Eclodiu' | 'Partiu' | 'Deitado Fora';
  obs: string;
  numPosturaAno: string;
}

export interface BreedingPair {
  id: string;
  idAnilhaMacho: string;
  idAnilhaFemea: string;
  tipoHabitat: HabitatType;
  idHabitat: string;
  ninho: string;
  dataInicio: string;
  dataRegisto: string;
  epoca: string;
  ativo: boolean;
  obs: string;
}

export interface SmartInsight {
  id: string;
  type: 'warning' | 'info' | 'success' | 'quarantine';
  title: string;
  message: string;
  date: string;
}
