export default function SortingList() {
  return (
         <div className="flex justify-center items-center gap-3 m-3">
        <hr  className="border-gray-300 w-11/12"/>
        <div className="flex items-center gap-3">
          <select className="bg-transparent outline-none border-none">
            <option disabled selected>sort by : following</option>
            <option>sort by : Public</option>
            <option>sort by : Friends</option>
            <option>sort by : Only Me</option>
        </select>    
        </div>
      </div>
  )
}
