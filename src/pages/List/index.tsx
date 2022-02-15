import styles from './list.module.scss';
import Supplier from '../../components/supplier';
import { SupplierType } from '../../types';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { notify } from '../../utils/notification';

const List = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [stateFetch, setStateFetch] = useState<'LOADING' | 'ERROR' | null>(
    null,
  );
  const [suppliersList, setSuppliersList] = useState<SupplierType[]>();

  useEffect(() => {
    const handleFetchSuppliersList = async () => {
      setStateFetch('LOADING');
      try {
        const response = await api.get<SupplierType[]>('/suppliers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data) {
          setSuppliersList(response?.data);
        }

        setStateFetch(null);
      } catch (err: any) {
        setStateFetch('ERROR');
        notify('Failed to fetch list.', 'ERROR');
      }
    };

    !suppliersList && handleFetchSuppliersList();
  }, [suppliersList]);

  const handleNavigate = (publicId?: string) => {
    if (!publicId) return;

    navigate(`/detail/${publicId}`);
  };

  return (
    <main className={styles.container}>
      <h1>Suppliers</h1>
      <section>
        <table>
          <thead>
            <tr className={styles['table-header']}>
              <th>Name</th>
              <th>CNPJ</th>
              <th>Phone Number</th>
              <th>Owner</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {stateFetch === 'LOADING'
              ? Array.from({ length: 5 }, (_, index) => (
                  <Supplier key={index} />
                ))
              : suppliersList?.map(item => (
                  <Supplier
                    key={item.publicId}
                    handleClick={handleNavigate}
                    loading={false}
                    {...item}
                  />
                ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default List;
