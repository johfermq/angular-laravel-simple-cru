export class Errors
{
  errors: any;

  constructor ()
  {
    this.errors = {};
  }

  /**
   * Asignar los errores
   */
  record (errors: any)
  {
    this.errors = errors;
  }

  /**
   * Limpiar los errores
   */
  clear () {
    this.errors = {};
  }

  /**
   * Verificar si existe un error
   */
  exists (field: string)
  {
     return (this.errors[field]) ? true : false;
  }

  /**
   * Obtener el valor del errror
   */
  get (field: string)
  {
     if (this.errors[field])
     {
        return this.errors[field][0];
     }
  }
}
