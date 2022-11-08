import { useStateContext } from '../context/stateContext';

export const useCart = () => {
   
    const context = useStateContext()

    return {
        ...context
    }
}