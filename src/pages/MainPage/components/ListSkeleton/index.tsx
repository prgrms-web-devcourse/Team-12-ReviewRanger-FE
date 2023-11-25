const ListSkeleton = () => {
  return (
    <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 md:gap-10">
      <li className="skeleton h-36 rounded-md md:h-40"></li>
      <li className="skeleton h-36 rounded-md md:h-40"></li>
      <li className="skeleton h-36 rounded-md md:h-40"></li>
      <li className="skeleton h-36 rounded-md md:h-40"></li>
    </ul>
  )
}

export default ListSkeleton
