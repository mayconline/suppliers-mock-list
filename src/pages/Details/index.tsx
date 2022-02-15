import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaUserTie,
  FaMobileAlt,
  FaIdCard,
  FaUserEdit,
  FaMailBulk,
  FaStreetView,
  FaCity,
} from 'react-icons/fa';
import Button from '../../components/button';
import Input from '../../components/input';
import { formatCNPJ, formatPhone, getRawValue } from '../../utils/format';
import styles from './details.module.scss';
import { SupplierDetailType } from '../../types';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { notify } from '../../utils/notification';

const Details = () => {
  const { token } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [stateForm, setStateForm] = useState<'LOADING' | 'ERROR' | null>(null);
  const [supplier, setSupplier] = useState<SupplierDetailType>();

  useEffect(() => {
    const handleFetchSupplier = async () => {
      setStateForm('LOADING');

      try {
        const response = await api.get<SupplierDetailType>(
          `/suppliers/${params?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response?.data) {
          setSupplier(response?.data);
        }

        setStateForm(null);
      } catch (err: any) {
        setStateForm('ERROR');
        notify('Failed to fetch supplier.', 'ERROR');
      }
    };

    !supplier && handleFetchSupplier();
  }, [supplier]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const hasMaskApplied =
      e.currentTarget.name === 'phoneNumber' ||
      e.currentTarget.name === 'ownerPhoneNumber';

    setSupplier({
      ...supplier,
      [e.currentTarget.name]: hasMaskApplied
        ? getRawValue(e.currentTarget.value)
        : e.currentTarget.value,
    });
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStateForm('LOADING');

    try {
      await api.put('/suppliers', supplier, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notify('Supplier updated successfully.', 'SUCCESS');
      navigate('/');
      setStateForm(null);
    } catch (err: any) {
      setStateForm('ERROR');
      notify('Failed to updated supplier, please verify your data.', 'ERROR');
      throw new Error('Failed to updated supplier');
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <header className={styles.header}>
          <h1>Supplier Details</h1>
          <Button icon={FaUserEdit} loading={stateForm === 'LOADING'}>
            Submit
          </Button>
        </header>

        <section className={styles.supplier}>
          <Input
            name="name"
            type="text"
            placeholder="name"
            value={supplier?.name}
            onChange={handleChange}
            icon={FaUserTie}
            loading={stateForm === 'LOADING'}
          />
          <Input
            name="cnpj"
            type="tel"
            placeholder="cnpj"
            value={formatCNPJ(supplier?.cnpj)}
            onChange={handleChange}
            icon={FaIdCard}
            loading={stateForm === 'LOADING'}
          />
          <Input
            name="phoneNumber"
            type="tel"
            placeholder="phoneNumber"
            value={formatPhone(supplier?.phoneNumber)}
            onChange={handleChange}
            icon={FaMobileAlt}
            loading={stateForm === 'LOADING'}
          />
        </section>
        <hr />
        <section className={styles.owner}>
          <header>
            <h2>Owner</h2>
          </header>
          <div>
            <Input
              name="ownerName"
              type="text"
              placeholder="owner name"
              value={supplier?.ownerName}
              onChange={handleChange}
              icon={FaUserTie}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="ownerEmail"
              type="email"
              placeholder="owner email"
              value={supplier?.ownerEmail}
              onChange={handleChange}
              icon={FaMailBulk}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="ownerPhoneNumber"
              type="tel"
              placeholder="owner phone number"
              value={formatPhone(supplier?.ownerPhoneNumber)}
              onChange={handleChange}
              icon={FaMobileAlt}
              loading={stateForm === 'LOADING'}
            />
          </div>
        </section>
        <hr />
        <section className={styles.address}>
          <header>
            <h3>Address</h3>
          </header>
          <div>
            <Input
              name="address"
              type="text"
              placeholder="address"
              value={supplier?.address}
              onChange={handleChange}
              icon={FaStreetView}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="number"
              type="tel"
              placeholder="number"
              value={supplier?.number}
              onChange={handleChange}
              icon={FaStreetView}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="complement"
              type="text"
              placeholder="complement"
              value={supplier?.complement}
              onChange={handleChange}
              icon={FaStreetView}
              loading={stateForm === 'LOADING'}
            />
          </div>
          <div>
            <Input
              name="neighborhood"
              type="text"
              placeholder="neighborhood"
              value={supplier?.neighborhood}
              onChange={handleChange}
              icon={FaCity}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="city"
              type="text"
              placeholder="city"
              value={supplier?.city}
              onChange={handleChange}
              icon={FaCity}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="state"
              type="text"
              placeholder="state"
              value={supplier?.state}
              onChange={handleChange}
              icon={FaCity}
              loading={stateForm === 'LOADING'}
            />
            <Input
              name="zipCode"
              type="tel"
              placeholder="zip code"
              value={supplier?.zipCode}
              onChange={handleChange}
              icon={FaCity}
              loading={stateForm === 'LOADING'}
            />
          </div>
        </section>
      </form>
    </main>
  );
};

export default Details;
