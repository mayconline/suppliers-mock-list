import api from '../../services/api';
import { SupplierDetailType } from '../../types';
import { render, screen, userEvent, waitFor } from '../../utils/testProvider';
import Details from './index';

describe('Details', () => {
  it('should display supplier', async () => {
    api.get = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ data: MOCK_SUPPLIER_DETAIL }),
      );

    render(<Details />, {
      routePath: 'detail/:id',
      initialRoute: ['/detail/01'],
    });

    screen.getByRole('heading', { name: 'Supplier Details' });

    const nameInput = (await screen.findByPlaceholderText(
      'name',
    )) as HTMLInputElement;
    const cnpjInput = screen.getByPlaceholderText('cnpj') as HTMLInputElement;
    const phoneInput = screen.getByPlaceholderText(
      'phoneNumber',
    ) as HTMLInputElement;
    const ownerNameInput = screen.getByPlaceholderText(
      'owner name',
    ) as HTMLInputElement;
    const ownerEmailInput = screen.getByPlaceholderText(
      'owner email',
    ) as HTMLInputElement;
    const ownerPhoneInput = screen.getByPlaceholderText(
      'owner phone number',
    ) as HTMLInputElement;
    const addressInput = screen.getByPlaceholderText(
      'address',
    ) as HTMLInputElement;
    const numberInput = screen.getByPlaceholderText(
      'number',
    ) as HTMLInputElement;
    const complementInput = screen.getByPlaceholderText(
      'complement',
    ) as HTMLInputElement;
    const neighborhoodInput = screen.getByPlaceholderText(
      'neighborhood',
    ) as HTMLInputElement;
    const cityInput = screen.getByPlaceholderText('city') as HTMLInputElement;
    const stateInput = screen.getByPlaceholderText('state') as HTMLInputElement;
    const zipCodeInput = screen.getByPlaceholderText(
      'zip code',
    ) as HTMLInputElement;

    expect(nameInput.value).toBe('Distribuidora Minnie Kutch');
    expect(cnpjInput.value).toBe('50.418.736/0001-52');
    expect(phoneInput.value).toBe('+55 (11) 9 8541-2512');
    expect(ownerNameInput.value).toBe('Carl');
    expect(ownerEmailInput.value).toBe('ca@email.com');
    expect(ownerPhoneInput.value).toBe('+55 (11) 9 1236-5474');
    expect(addressInput.value).toBe('Avenida República do Líbano');
    expect(numberInput.value).toBe('74');
    expect(complementInput.value).toBe('Cj 74');
    expect(neighborhoodInput.value).toBe('Mirandópolis');
    expect(cityInput.value).toBe('São Paulo');
    expect(stateInput.value).toBe('SP');
    expect(zipCodeInput.value).toBe('128457112');
  });

  it('should updated supplier', async () => {
    api.get = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({ data: MOCK_SUPPLIER_DETAIL }),
      );

    api.put = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ success: true }));

    const { mockedNavigate, notify } = render(<Details />, {
      routePath: 'detail/:id',
      initialRoute: ['/detail/01'],
    });

    const nameInput = (await screen.findByPlaceholderText(
      'name',
    )) as HTMLInputElement;
    const cnpjInput = screen.getByPlaceholderText('cnpj') as HTMLInputElement;

    expect(nameInput.value).toBe('Distribuidora Minnie Kutch');
    expect(cnpjInput.value).toBe('50.418.736/0001-52');

    userEvent.clear(nameInput);
    userEvent.clear(cnpjInput);

    userEvent.type(nameInput, 'Maria Joaquina');
    userEvent.type(cnpjInput, '213332129999100');

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    userEvent.click(submitButton);

    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith(
        'Supplier updated successfully.',
        'SUCCESS',
      ),
    );

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});

const MOCK_SUPPLIER_DETAIL: SupplierDetailType = {
  publicId: '01',
  name: 'Distribuidora Minnie Kutch',
  cnpj: '50.418.736/0001-52',
  phoneNumber: '5511985412512',
  zipCode: '128457112',
  address: 'Avenida República do Líbano',
  number: '74',
  complement: 'Cj 74',
  neighborhood: 'Mirandópolis',
  city: 'São Paulo',
  state: 'SP',
  ownerName: 'Carl',
  ownerEmail: 'ca@email.com',
  ownerPhoneNumber: '5511912365474',
  createdAt: '2021-10-14T13:20:35',
  updatedAt: '2021-10-14T13:20:48',
};
