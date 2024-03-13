export const format = ({
  value,
  currency = 'CZK',
}: {
  value: string | number;
  currency?: string;
}) => {
  return (typeof value === 'string' ? Number(value) : value).toLocaleString(
    'en-US',
    {
      style: 'currency',
      currency,
    },
  );
};
