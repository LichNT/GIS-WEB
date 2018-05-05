import axios from 'axios'
import FakeApi from './FakeApi'

class Api extends FakeApi {
  END_POINT = 'http://localhost:8000/api'

  login (req) {
    req = {
      'email': req.email,
      'password': req.password
    }

    return this._submit('post', '/login', req)
  }

  logout (req) {
    req = {
      'token': req.token
    }

    return this._submit('post', '/logout', req)
  }

  register (req) {
    req = {
      'name': req.name,
      'email': req.email,
      'password': req.password,
      'password_confirmation': req.passwordConfirmation
    }

    return this._submit('post', '/register', req)
  }

  _handleError (error) {
    let formatError = {
      /*
        "message": "422 Unprocessable Entity", // required
        "status_code": 422, // required
        "code": "unprocessable_entity",
        "errors": { // option
          "source": [
            "The source field is required."
          ],
          "from_date": [
            "The from date field is required."
          ],
          "to_date": [
            "The to date field is required."
          ]
        }
      */
    }

    // const req = error.config
    // console.log('Request', req)

    if (error.response) {
      // const status = error.response.status
      const res = error.response
      formatError = res.data
    } else {
      formatError = {
        'message': error.message,
        'status_code': 404
      }
    }

    return formatError
  }

  _submit (method, url, data) {
    url = this.END_POINT + url

    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: url,
        params: method === 'get' ? data : {},
        data: method !== 'get' ? data : {},
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(this._handleError(error))
      })
    })
  }
}

export default Api
