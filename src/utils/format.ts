export const formatMask = (value?: string, mask?: string) => {
  if (!value || !mask) {
    return value;
  }

  let index = 0;

  const rawValue = getRawValue(value);
  const maskValue = mask.replace(/9/g, () => rawValue[index++] || '');

  return maskValue;
};

export const formatCNPJ = (cnpj?: string) => {
  if (!cnpj) return;

  return formatMask(cnpj, '99.999.999/9999-99');
};

export const formatPhone = (phone?: string) => {
  if (!phone) return;

  const rawValue = getRawValue(phone);

  const mask =
    rawValue.length <= 12 ? '+99 (99) 9999-9999' : '+99 (99) 9 9999-9999';

  return formatMask(phone, mask);
};

export const getRawValue = (value: string) => {
  return value.replace(/\D/g, '').trim();
};
