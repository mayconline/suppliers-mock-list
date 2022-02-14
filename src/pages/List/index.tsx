import styles from './list.module.scss';
import Supplier from '../../components/supplier';
import { SupplierType } from '../../types';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Loading from '../../components/loading';
import Skeleton from '../../components/skeleton';
import { notify } from '../../utils/notification';

// const MOCK_LIST: SupplierType[] = [
//   {
//     publicId: 'b8d548c6-a766-4364-b853-31019a4fc0ab',
//     name: 'Distribuidora Minnie Kutch',
//     cnpj: '50.418.736/0001-52',
//     phoneNumber: '5511985412512',
//     ownerName: 'Carl',
//   },
//   {
//     publicId: '6550fbbb-a51f-4d52-86ab-62b533c20678',
//     name: 'Distribuidora Debra Hagenes',
//     cnpj: '69.833.711/0001-43',
//     phoneNumber: '5511985412512',
//     ownerName: 'Carl',
//   },
//   {
//     publicId: '8a1ee71e-8cd9-42cc-9824-43bcf3fd7b7e',
//     name: 'Distribuidora Patti MacGyver',
//     cnpj: '94.818.075/0001-28',
//     phoneNumber: '5511985412512',
//     ownerName: 'Carl',
//   },
//   {
//     publicId: 'eec3a634-156b-4012-b9cd-746488321b44',
//     name: 'Distribuidora June Rath',
//     cnpj: '64.321.445/0001-56',
//     phoneNumber: '5511985412512',
//     ownerName: 'Carl',
//   },
//   {
//     publicId: 'ca27ccf7-c51d-4756-b430-cf230918d4aa',
//     name: 'Distribuidora Ernestine Crist',
//     cnpj: '49.492.781/0001-78',
//     phoneNumber: '5511985412512',
//     ownerName: 'Mark',
//   },
// ];

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
        throw new Error('Failed to fetch list');
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
