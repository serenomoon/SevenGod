import { useState } from "react";

//toma un valor inicial
export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    //resetea al valor inicial
    const reset = () => {
        setValues(initialState);
    }
    
    //toma los valores anteriores si es que habia (las letras que vamos agregando x ej), 
    //y agrega el nuevo valor del input basandose en su name le va cambiando el value.
    const handleInputChange = ({target}) => {

        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return [ values, handleInputChange, reset ];

}