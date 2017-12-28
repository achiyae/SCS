export class Domain {
  constructor(public name: string, public requirements: Requiremnet) {}
}

export class Requiremnet {
  constructor(public id: number, public description: string) {}
}
