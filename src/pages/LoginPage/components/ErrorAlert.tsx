interface ErrorAlertProps {
  errortext: string
}

const ErrorAlert = ({ errortext }: ErrorAlertProps) => {
  return (
    <div className="alert alert-error max-w-sm">
      <div className="flex w-full justify-between">
        <div className="flex flex-col">
          <div className="flex max-w-[300px] flex-wrap text-content2 text-sub-red-200">
            {errortext}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ErrorAlert
