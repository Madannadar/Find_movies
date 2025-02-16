import React from 'react'
import ResourceAllocation from './Pages/ResourseAllocation'
// import BudgetAllocation from './Pages/BudgetAllocation'

// import Search from './components/Search'
// import Search from './Pages/Search'
// import { useState } from 'react'
// import Step3 from './Pages/Step3'
// import DepartmentForm from './Pages/DepartmentForm'
const App = () => {
  // const [searchTerm, setSearchTerm] = useState('')
  return (
    <main>
    <div  className='pattern'/>
      <div className='wrapper'>
        <header>
          {/* <img src="./hero.png" alt="Hero Banner" /> */}
          
        </header>
        {/* <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
        {/* <Step3 /> */}
        {/* <Search /> */}
        {/* <DepartmentForm /> */}
        {/* <BudgetAllocation /> */}
        <ResourceAllocation />
      </div>
    </main>
    
  )
}

export default App