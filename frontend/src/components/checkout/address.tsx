import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';
import Button from '@components/ui/button';

const AddressPage: React.FC<{ getAddress: Function }> = ({ getAddress }) => {
  let { data, isLoading } = useAddressQuery();
  const getAddressSelected = (item: any) => {
    if (item) {
      getAddress(item);
    }
  };
  return !isLoading ? (
    <div className="flex flex-col">
      <AddressGrid address={data?.data} callback={getAddressSelected} />

      <div className="flex items-center my-5">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-600">O retira por Pick Up</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <Button
        onClick={() => {
          getAddress({
            id: '6540686b8d745afa4f54ef5e',
            name: 'ALMACEN LOS GUAYOS',
            address: 'NO BORRAR, DIRECCIÓN DE LOS GUAYOS PARA PICK UP.',
            is_active: true,
            createdAt: '2023-10-31T02:37:31.750Z',
            updatedAt: '2023-10-31T02:37:31.750Z',
          });
        }}
      >
        San Diego, C.C Cidad Industrial la Unión
      </Button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;
