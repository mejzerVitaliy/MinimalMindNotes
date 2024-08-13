import { useNavigate } from "react-router-dom";
const useBackTo = (to: string) => {
    const navTo = useNavigate()
    return () => navTo(to)
}
export default useBackTo