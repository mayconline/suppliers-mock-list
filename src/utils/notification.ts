import { toast } from 'react-toastify';

export const notify = (
  description: string,
  type: 'INFO' | 'ERROR' | 'SUCCESS',
) => {
  switch (type) {
    case 'SUCCESS':
      toast.success(description);
      break;

    case 'ERROR':
      toast.error(description);
      break;

    default:
      toast.info(description);
      break;
  }
};
