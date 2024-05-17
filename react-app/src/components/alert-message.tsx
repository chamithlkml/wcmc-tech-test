import { Alert } from 'react-bootstrap'

type AlertProps = {
  variant: string,
  message: string
}
const AlertMessage = ({ variant, message }: AlertProps) => {
  return (
    <Alert variant={variant}>
      {message}
    </Alert>
  );
}

export default AlertMessage;