export type continentsItem = {
  id: number,
  name: string
}
export type continentsType = Array<continentsItem>;

export type characterItem = {
  id: number,
  firstName: string,
  lastName: string,
  fullName: string,
  title: string,
  family: string,
  image: string,
  imageUrl: URL,
}

export type charactersType = Array<characterItem>;

export type characterContinentItem = {
  id: number,
  firstName: string,
  lastName: string,
  fullName: string,
  title: string,
  family: string,
  image: string,
  imageUrl: URL,
  continentName: string
}

export type charactersContinentType = Array<characterContinentItem>

export type paginationType = {
  page: number,
  size: number
}

export type filtersType = {
  [key: string] : string
}