class ApiComponent {
    constructor() {
      this.cacheDataCliente = null;
    }
  
    async getToken() {
      const url = 'https://pay-hioposcr.com:444/api/Users/Login';
      const requestBody = {
        UserName: 'icgcommerce',
        Password: '@Icgcommerce1'
      };
  
      try {
        const response = await axios.post(url, requestBody, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response.data.token;
      } catch (error) {
        console.error('Error fetching token:', error);
        return '';
      }
    }
  
    async accesoDeuda(username, password, token) {
      const url = 'https://pay-hioposcr.com:444/Api/AccessDeuda';
      const requestBody = {
        Username: username,
        Password: password
      };
  
      try {
        const response = await axios.post(url, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data === 'OK';
      } catch (error) {
        console.error('Error in accesoDeuda:', error);
        return false;
      }
    }
  
    async getDeudaHiopos(token) {
      const url = 'https://pay-hioposcr.com:444/Api/DeudaClient';
  
      try {
        const response = await axios.post(url, null, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const rawData = response.data.data;
  
        const formattedData = rawData.map(item => ({
          CodigoCliente: item["*CODIGO DEL CLIENTE"],
          CodigoEstablecimiento: item["CODIGO DEL ESTABLECIMIENTO"],
          CodigoMDG: item["*CODIGO DE MDG"],
          CedulaCliente: item["CEDULA DEL CLIENTE"],
          NombreCliente: item["NOMBRE DEL CLIENTE"],
          NombreComercial: item["NOMBRE COMERCIAL"],
          FacturacionRecurrente: item["*FACTURACION RECURRENTE"],
          FacturaElectronica: item["*FACTURA ELECTRONICA"],
          Otros: item["*OTROS"],
          MontoTotal: item["MONTO TOTAL"],
          Vendedor: item["*VENDEDOR"]
        }));
  
        return formattedData;
      } catch (error) {
        console.error('Error in getDeudaHiopos:', error);
        return null;
      }
    }
  
    async getDeudaClienteHIOPOS(token) {
      if (this.cacheDataCliente != null) {
        return this.cacheDataCliente;
      }
  
      const url = 'https://pay-hioposcr.com:444/Api/ConsultaClienteDeuda';
      try {
        const response = await axios.post(url, null, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const jsonResponse = response.data;
        this.cacheDataCliente = jsonResponse.data.map(item => ({
          CodigoCliente: item["CODIGO DEL CLIENTE"],
          CedulaCliente: item["CEDULA DEL CLIENTE"],
          NombreCliente: item["NOMBRE DEL CLIENTE"],
          NombreComercial: item["NOMBRE COMERCIAL"],
          Vendedor: item["VENDEDOR"],
          TipoCliente: item["TIPO DE CLIENTE"],
          NombreContactos: item["NOMBRE CONTACTOS"]
        }));
        return this.cacheDataCliente;
      } catch (error) {
        console.error('Error in getDeudaClienteHIOPOS:', error);
        return null;
      }
    }
  }
  
  // 🚀 Ejecutar flujo completo
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
  