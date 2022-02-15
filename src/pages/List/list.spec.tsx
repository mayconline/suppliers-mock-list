import api from '../../services/api';
import { SupplierType } from '../../types';
import {
  render,
  screen,
  getByText,
  getByRole,
  userEvent,
} from '../../utils/testProvider';
import List from './index';

describe('List', () => {
  it('should display list', async () => {
    api.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: MOCK_LIST }));

    render(<List />, {
      routePath: '/',
      initialRoute: ['/'],
    });

    screen.getByRole('heading', { name: 'Suppliers' });

    screen.getByText(/Name/i);
    screen.getByText(/CNPJ/i);
    screen.getByText(/Phone Number/i);
    screen.getByText(/Owner/i);
    screen.getByText(/Edit/i);

    const row1 = await screen.findByTestId('row-01');
    getByText(row1, /Distribuidora Minnie Kutch/i);
    getByText(row1, /50\.418\.736\/0001-52/i);
    getByText(row1, /\+55 \(11\) 9 8541-2512/i);
    getByText(row1, /Carl/i);
  });

  it('should navigate to detail list', async () => {
    api.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data: MOCK_LIST }));

    const { mockedNavigate } = render(<List />, {
      routePath: '/',
      initialRoute: ['/'],
    });

    const row2 = await screen.findByTestId('row-02');
    getByText(row2, /Distribuidora Debra Hagenes/i);
    getByText(row2, /69\.833\.711\/0001-43/i);
    getByText(row2, /\+55 \(11\) 9 8541-2512/i);
    getByText(row2, /Gui Junior/i);

    const detailsButton = getByRole(row2, 'button', { name: 'Edit' });
    userEvent.click(detailsButton);

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith('/detail/02');
  });
});

const MOCK_LIST: SupplierType[] = [
  {
    publicId: '01',
    name: 'Distribuidora Minnie Kutch',
    cnpj: '50.418.736/0001-52',
    phoneNumber: '5511985412512',
    ownerName: 'Carl',
  },
  {
    publicId: '02',
    name: 'Distribuidora Debra Hagenes',
    cnpj: '69.833.711/0001-43',
    phoneNumber: '5511985412512',
    ownerName: 'Gui Junior',
  },
  {
    publicId: '03',
    name: 'Distribuidora Patti MacGyver',
    cnpj: '94.818.075/0001-28',
    phoneNumber: '5511985412512',
    ownerName: 'Carl',
  },
  {
    publicId: '04',
    name: 'Distribuidora June Rath',
    cnpj: '64.321.445/0001-56',
    phoneNumber: '5511985412512',
    ownerName: 'Carl',
  },
  {
    publicId: '05',
    name: 'Distribuidora Ernestine Crist',
    cnpj: '49.492.781/0001-78',
    phoneNumber: '5511985412512',
    ownerName: 'Mark',
  },
];
