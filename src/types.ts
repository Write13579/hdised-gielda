export interface Query {
  operacja: string;
  parametry: {
    wybranySektor: string;
    cenaMniejszaNiz: number;
  };
}
