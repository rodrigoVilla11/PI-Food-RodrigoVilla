const Form = () =>{
    return(
        <div>
          <div>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" /*value={}*//>
          </div>

          <div>
            <label htmlFor="Resumen del plato">Resumen del plato: </label>
            <input type="text" name="Resumen del plato" /*value={}*//>
          </div>

          <div>
            <label htmlFor="health score">health score: </label>
            <input type="text" name="health score" /*value={}*//>
          </div>
          
          <div>
            <label htmlFor="Paso a paso">Paso a paso: </label>
            <input type="text" name="Paso a paso" /*value={}*//>
          </div>

          <div>
            <label htmlFor="img">Img: </label>
            <input type="text" name="img" /*value={}*//>
          </div>
          <div>
            <label htmlFor="Varios">Varias Dietas?: (BUSCAR FORMA) </label>
            <input type="text" name="Varios" /*value={}*//>
          </div>
          <button type="submit">Crear Receta</button>
        </div>
    )
    }
    export default Form;