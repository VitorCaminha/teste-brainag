function validateCPF(cpf: string) {
  if (new Set(cpf).size === 1) return false;

  let sumOfProducts = 0;

  for (let i = 0; i < 9; i++) {
    sumOfProducts += Number(cpf.at(i)) * (10 - i);
  }

  let firstVerifyDigit = (sumOfProducts * 10) % 11;
  if (firstVerifyDigit === 10) firstVerifyDigit = 0;

  if (firstVerifyDigit !== Number(cpf.at(9))) return false;

  sumOfProducts = 0;

  for (let i = 0; i < 10; i++) {
    sumOfProducts += Number(cpf.at(i)) * (11 - i);
  }

  let secondVerifyDigit = (sumOfProducts * 10) % 11;
  if (secondVerifyDigit === 10) secondVerifyDigit = 0;

  if (secondVerifyDigit !== Number(cpf.at(10))) return false;

  return true;
}

function validateCNPJ(cnpj: string) {
  if (new Set(cnpj).size === 1) return false;

  let sumOfProducts = 0;
  let pos = 2;

  for (let i = 11; i >= 0; i--) {
    sumOfProducts += Number(cnpj.at(i)) * pos++;
    if (pos > 9) pos = 2;
  }

  let result = sumOfProducts % 11;

  const firstVerifyDigit = result < 2 ? 0 : (11 - result);

  if (firstVerifyDigit !== Number(cnpj.at(12))) return false;

  sumOfProducts = 0;
  pos = 2;

  for (let i = 12; i >= 0; i--) {
    sumOfProducts += Number(cnpj.at(i)) * pos++;
    if (pos > 9) pos = 2;
  }

  result = sumOfProducts % 11;

  const secondVerifyDigit = result < 2 ? 0 : (11 - result);

  if (secondVerifyDigit !== Number(cnpj.at(13))) return false;

  return true;
}

function validateDocument(document: string) {
  if (document.length === 11) {
    return validateCPF(document);
  } else if (document.length === 14) {
    return validateCNPJ(document);
  } else {
    return false;
  }
}

export { validateDocument };
