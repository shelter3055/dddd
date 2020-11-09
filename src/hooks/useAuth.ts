import {useRequest} from 'umi' 
import { checkAuthReq } from '@/service/index';
export default function useAuth () {
  const {loading,error,data} = useRequest(() => checkAuthReq())
  if (loading) {
    return 'loading';
  }
  if (error) {
    return 'error'
  }
  return data
}