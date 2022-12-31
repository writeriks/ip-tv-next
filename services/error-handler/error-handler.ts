import { ErrorObject, setError } from '../../store/reducers/error-reducer/error-slice'
import { setIsLoading } from '../../store/reducers/ui-reducer/ui-slice'
import store from '../../store/redux-store'

class ErrorHandler {
  constructor() {
    this.errorDecorator = this.errorDecorator.bind(this)
  }

  errorDecorator(target: any, _propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethodValue = descriptor.value

    descriptor.value = async (...args: any[]) => {
      try {
        return await originalMethodValue.apply(target, args)
      } catch (error) {
        this.handleError(error)
      }
    }
    return descriptor
  }

  handleError(error: any) {
    const errorObject: ErrorObject = {
      title: 'Error on Getting Channels',
      message: error.message,
    }
    store.dispatch(setError(errorObject))
    store.dispatch(setIsLoading(false))
  }
}

const errorHandler = new ErrorHandler()
export default errorHandler
