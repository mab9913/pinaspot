class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Actualiza el estado para que el siguiente renderizado muestre la interfaz de respaldo
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // También podrías registrar el error en un servicio de reporte de errores
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Puedes renderizar cualquier interfaz de respaldo
        return <h1>Algo salió mal.</h1>;
      }
  
      return this.props.children; 
    }
  }
  