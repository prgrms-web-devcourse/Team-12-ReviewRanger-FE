interface ErrorAlertProps {
  errortext: string
}

const ErrorAlert = ({ errortext }: ErrorAlertProps) => {
  return (
    <span className="text-fontSize-sm flex max-w-sm flex-wrap text-sub-red-200">
      {errortext}
    </span>
  )
}
export default ErrorAlert
