const LATENCY = 1

class FakeApi {
  constructor (localStorage = window.localStorage) {
    this.localStorage = localStorage
  }

  login (req) {
    const success = this._rawResponse({
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2xvZ2luIiwiaWF0IjoxNDkzMTA3MzI4LCJleHAiOjE0OTMxMTA5MjgsIm5iZiI6MTQ5MzEwNzMyOCwianRpIjoiVE9PZ1NBamNzQlQ3eXlUcCJ9.zVvWCFgVAP8jArLTIUix05-lj69_Ga6pG3OnJNr7ezc'
    })

    const error = this._rawResponse({
      'code': 'invalid_credentials',
      'status_code': 401,
      'message': 'Invalid Credentials'
    }, 401)

    // const error = this._rawResponse({
    //   'status_code': 422,
    //   'message': 'Unprocessable Entity',
    //   'errors': {
    //     'email': ['Email is invalid format'],
    //     'password': ['Password length need larger than 6']
    //   }
    // })

    if (req.email === 'admin@gmail.com' && req.password === 'secret') {
      return this._makePromise(req, success)
    } else {
      return this._makePromise(req, success, error)
    }
  }

  register (req) {
    const success = this._rawResponse({
      'message': 'Your account have been created'
    })

    const error = this._rawResponse({
      'status_code': 422,
      'message': 'Unprocessable Entity',
      'errors': {
        'name': ['Field name is required'],
        'email': ['The email has already been taken.'],
        'password': ['Password length need larger than 6'],
        'password_confirmation': ['Password confirmation not match']
      }
    })

    if (req.email !== 'admin@gmail.com') {
      return this._makePromise(req, success)
    } else {
      return this._makePromise(req, success, error)
    }
  }

  logout (req) {
    return this._makePromise(req, this._rawResponse({}))
  }

  _getFakeError (status) { // eslint-disable-line no-unused-vars
    switch (status) {
      case 422:
        return {
          'message': '422 Unprocessable Entity',
          'status_code': 422,
          'errors': {
            'source': [
              'The source field is required.'
            ],
            'from_date': [
              'The from date field is required.'
            ],
            'to_date': [
              'The to date field is required.'
            ]
          }
        }
      default:
        return {
          'message': 'Fetch data fail',
          'status_code': status
        }
    }
  }

  _makePromise (req, res, error) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (error) {
          reject(error.data)
        } else {
          resolve(res)
        }
      }, LATENCY)
    })
  }

  _response (data = {}, status = 200, headers = {}, meta = {}) {
    return this._rawResponse({ data: data, meta: meta }, status, headers)
  }

  _rawResponse (data = {}, status = 200, headers = {}) {
    return {
      // `data` is the response that was provided by the server
      data: data,

      // `status` is the HTTP status code from the server response
      status: status,

      // `statusText` is the HTTP status message from the server response
      statusText: 'OK',

      // `headers` the headers that the server responded with
      headers: headers,

      // `config` is the config that was provided to `axios` for the request
      config: {}
    }
  }
}

export default FakeApi
