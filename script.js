import ApiComponent from './ApiComponent.js';

(async () => {
  const api = new ApiComponent();

  const token = await api.getToken();
  console.log('✅ Token:', token);

  const acceso = await api.accesoDeuda('icgcommerce', '@Icgcommerce1', token);
  console.log('✅ Acceso Deuda:', acceso);

  const deuda = await api.getDeudaHiopos(token);
  console.log('✅ Deuda Hiopos:', deuda);

  const deudaCliente = await api.getDeudaClienteHIOPOS(token);
  console.log('✅ Deuda Cliente HIOPOS:', deudaCliente);
})();
