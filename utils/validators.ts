abstract class Validator {
  abstract validate(): boolean;
}

export class BillValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class BillItemValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class ConsumableValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class InventoryItemValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class RecipeValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class RecipeIngredientValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}

export class UserValidator implements Validator {
  constructor() {}
  validate(): boolean {
    throw new Error("Method not implemented.");
  }
}
