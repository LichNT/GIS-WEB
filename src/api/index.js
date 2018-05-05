import { USE_MOCK_DATA } from '../config'
import FakeApi from './FakeApi'
import Api from './Api'

const debug = process.env.NODE_ENV !== 'production'

const useMock = USE_MOCK_DATA && debug

const api = useMock ? new FakeApi() : new Api()

export default api
