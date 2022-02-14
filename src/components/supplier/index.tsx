import styles from './supplier.module.scss';
import { FaUserEdit } from 'react-icons/fa';
import { SupplierType } from '../../types';
import { formatCNPJ, formatPhone } from '../../utils/format';
import Button from '../button';
import Skeleton from '../skeleton';
import { memo } from 'react';

const Supplier = ({
  publicId,
  name,
  cnpj,
  phoneNumber,
  ownerName,
  handleClick,
  loading = true,
}: SupplierType & {
  handleClick?: (publicId?: string) => void;
  loading?: boolean;
}) => {
  return (
    <tr className={styles['table-item']}>
      <td>{loading ? <Skeleton /> : name}</td>
      <td>{loading ? <Skeleton /> : formatCNPJ(cnpj)}</td>
      <td>{loading ? <Skeleton /> : formatPhone(phoneNumber)}</td>
      <td>{loading ? <Skeleton /> : ownerName}</td>
      <td>
        {loading ? (
          <Skeleton />
        ) : (
          <Button
            icon={FaUserEdit}
            onClick={() => handleClick && handleClick(publicId)}
          >
            Edit
          </Button>
        )}
      </td>
    </tr>
  );
};

export default memo(Supplier);
